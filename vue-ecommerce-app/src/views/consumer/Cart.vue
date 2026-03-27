<template>
  <div class="max-w-5xl mx-auto p-6">

    <h1 class="text-2xl font-bold mb-6 text-gray-900">
      Carrinho de compras
    </h1>

    <div v-if="cartItems.length === 0" class="empty-state">
      <i class="pi pi-shopping-cart"></i>
      <p>Seu carrinho está vazio.</p>
    </div>

    <div v-else>

      <DataTable :value="cartItems" class="mb-6">

        <Column field="name" header="Produto" />

        <Column header="Preço">
          <template #body="slotProps">
            <span class="price">
              R$ {{ formatPrice(slotProps.data.price) }}
            </span>
          </template>
        </Column>

        <Column header="Qtd" headerClass="text-center" bodyClass="text-center">
          <template #body="slotProps">
            <div class="qty-wrapper">
              <div class="qty-control">
                <button 
                  @click="decrease(slotProps.data)" 
                  class="btn-qty btn-minus"
                  aria-label="Diminuir quantidade"
                >
                  <i class="pi pi-minus"></i>
                </button>
                
                <span class="qty-number">{{ slotProps.data.quantity }}</span>
                
                <button 
                  @click="increase(slotProps.data)" 
                  class="btn-qty btn-plus"
                  aria-label="Aumentar quantidade"
                >
                  <i class="pi pi-plus"></i>
                </button>
              </div>
            </div>
          </template>
        </Column>

        <Column header="Subtotal">
          <template #body="slotProps">
            <span class="price">
              R$ {{ formatPrice(slotProps.data.price * slotProps.data.quantity) }}
            </span>
          </template>
        </Column>

        <Column header="">
          <template #body="slotProps">
            <button 
              class="delete-btn"
              @click="removeFromCart(slotProps.data.id)"
            >
              <i class="pi pi-trash"></i>
            </button>
          </template>
        </Column>

      </DataTable>

      <div class="cart-total-box">
        <div>
          <p class="text-sm text-gray-500">Total</p>
          <p class="text-2xl font-extrabold text-gray-900">
            R$ {{ formatPrice(totalAmount) }}
          </p>
        </div>

        <Button
          label="Finalizar compra"
          icon="pi pi-credit-card"
          class="cart-checkout-btn"
          @click="checkout"
        />
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'

export default defineComponent({
  components: {
    DataTable,
    Column,
    Button
  },

  setup() {
    const router = useRouter()
    const cartStore = useCartStore()


    const cartItems = computed(() => cartStore.cartItems)
    const totalAmount = computed(() => cartStore.totalAmount)

    const formatPrice = (value: number) => {
      return value.toFixed(2)
    }

    const removeFromCart = (id: number) => {
      cartStore.removeItem(id)
    }

    const increase = (item: any) => {
      cartStore.addItem(item)
    }

    const decrease = (item: any) => {
      cartStore.decreaseItem(item.id)
    }

    const checkout = () => {
      router.push({ name: 'Checkout' })
    }

    return {
      cartItems,
      totalAmount,
      removeFromCart,
      increase,
      decrease,
      checkout,
      formatPrice
    }
  }
})
</script>

<style scoped>

.empty-state {
  text-align: center;
  padding: 80px 0;
  background: #f9fafb;
  border-radius: 16px;
  border: 1px dashed #e5e7eb;
  color: #9ca3af;
}

.empty-state i {
  font-size: 40px;
  margin-bottom: 10px;
}

:deep(.p-datatable) {
  border: none;
  background: transparent;
}

:deep(.p-datatable-wrapper) {
  border-radius: 16px;
  overflow: hidden;
}

:deep(.p-datatable-thead > tr > th) {
  background: transparent;
  border: none;
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
}

:deep(.p-datatable-tbody > tr > td) {
  padding: 16px 8px;
  border: none;
}

.price {
  font-weight: 700;
  color: #10b981;
}

.qty-wrapper {
  display: flex;
  justify-content: center;
}

.qty-control {
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: #f3f4f6; 
  padding: 4px;
  border-radius: 12px;
  border: 1px solid #e5e7eb; 
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
}

.btn-qty {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: white;
  color: #4b5563; 
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.btn-qty i {
  font-size: 0.75rem;
  font-weight: bold;
}

.btn-minus:hover {
  background-color: #fef2f2; 
  color: #dc2626; 
}

.btn-plus:hover {
  background-color: #f0fdf4; 
  color: #16a34a; 
}

.btn-qty:active {
  transform: scale(0.9);
}

.qty-number {
  min-width: 32px;
  text-align: center;
  font-weight: 700;
  color: #111827;
  font-size: 0.9rem;
  font-variant-numeric: tabular-nums; 
}

.delete-btn {
  width: 36px;
  height: 36px;
  background: #fee2e2;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.delete-btn i {
  color: #dc2626;
}

.cart-total-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 22px;
  border-radius: 16px;
  background: #f9fafb;
  border: 1px solid #f1f1f1;
}

.cart-checkout-btn {
  background: #111827 !important;
  color: white !important;
  border-radius: 12px !important;
  font-weight: 600;
}

.cart-checkout-btn:hover {
  background: #2563eb !important;
}

</style>