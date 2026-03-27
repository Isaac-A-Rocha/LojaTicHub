<template>
  <div class="products-wrapper">
    
    <div v-if="products.length" class="products-grid">
      
      <div 
        v-for="product in products" 
        :key="product.id" 
        class="product-card"
      >

        
        <router-link 
          :to="`/products/${product.id}`"
          class="link-reset"
        >
          <div class="product-image">
            <div class="icon">
              <i class="pi pi-box"></i>
            </div>
          </div>
        </router-link>

        <span class="badge">
          {{ product.category || 'Construção' }}
        </span>

        <div class="content">
          
          <router-link 
            :to="`/products/${product.id}`"
            class="link-reset"
          >
            <h3 class="title">
              {{ product.name }}
            </h3>
          </router-link>

          <p class="description">
            {{ product.description }}
          </p>
        </div>

        <div class="footer">
          <div class="price">
            <span class="old">
              {{ formatCurrency(product.price * 1.2) }}
            </span>

            <span class="current">
              {{ formatCurrency(product.price) }}
            </span>

            <span class="discount">
              17% OFF
            </span>
          </div>

          <Button 
            @click="addToCart(product)"
            class="add-btn"
          >
            <i class="pi pi-plus"></i>
            Adicionar
          </Button>
        </div>
      </div>

    </div>

    <div v-else class="empty-state">
      <i class="pi pi-inbox"></i>
      <p>Nenhum produto disponível</p>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useProductsStore } from '@/stores/products';
import { useCartStore } from '@/stores/cart';
import Button from '@/components/ui/Button.vue';

const productsStore = useProductsStore();
const cartStore = useCartStore();

onMounted(() => {
  productsStore.fetchProducts();
});

const products = computed(() => productsStore.products);

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

const addToCart = (product: any) => {
  cartStore.addItem({ ...product, quantity: 1 });
};
</script>

<style scoped>
.products-wrapper {
  width: 100%;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
  width: 100%;
}

.product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 18px;
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid #f1f1f1;
  transition: all 0.25s ease;
  min-height: 340px;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.06);
}

.link-reset {
  text-decoration: none;
  color: inherit;
}

.product-image {
  height: 140px;
  border-radius: 14px;
  background: #f6f8ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
  cursor: pointer;
  transition: 0.2s;
}

.product-image:hover {
  opacity: 0.9;
}

.icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: linear-gradient(135deg, #3b82f6, #7c3aed);
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon i {
  color: white;
  font-size: 20px;
}

.badge {
  background: #eef4ff;
  color: #2563eb;
  font-size: 11px;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 999px;
  width: fit-content;
  margin-bottom: 8px;
}

.content {
  flex-grow: 1;
}

.title {
  font-size: 16px;
  font-weight: 700;
  color: #111;
  margin-bottom: 4px;
  cursor: pointer;
  transition: 0.2s;
}

.title:hover {
  color: #2563eb;
}

.description {
  font-size: 13px;
  color: #6b7280;
  line-height: 1.4;
  height: 36px;
  overflow: hidden;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 12px;
}

.price .old {
  font-size: 12px;
  color: #9ca3af;
  text-decoration: line-through;
}

.price .current {
  display: block;
  font-size: 20px;
  font-weight: 800;
  color: #10b981;
}

.price .discount {
  font-size: 10px;
  font-weight: bold;
  color: #10b981;
}

.add-btn {
  background: #10b981;
  color: white;
  border-radius: 10px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: 0.2s;
}

.add-btn:hover {
  background: #059669;
}

.empty-state {
  text-align: center;
  padding: 80px 0;
  color: #9ca3af;
}

.empty-state i {
  font-size: 40px;
  margin-bottom: 10px;
}
</style>