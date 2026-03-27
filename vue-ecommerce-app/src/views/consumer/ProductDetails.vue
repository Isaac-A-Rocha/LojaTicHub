<template>
  <div class="product-details">

    <div class="container">

      <div class="image-box">
        <div class="icon">
          <i class="pi pi-box"></i>
        </div>
      </div>

      <div class="info">

        <span class="badge">Produto</span>

        <h1 class="title">
          Produto #{{ id }}
        </h1>

        <p class="description">
          Aqui você pode exibir os detalhes completos do produto, descrição longa,
          especificações, etc.
        </p>

        <div class="price">
          R$ 199,90
        </div>

        <button class="buy-btn">
          Comprar agora
        </button>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;
</script>

<style scoped>
.product-details {
  padding: 40px 20px;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.image-box {
  background: #f6f8ff;
  border-radius: 20px;
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: linear-gradient(135deg, #3b82f6, #7c3aed);
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon i {
  color: white;
  font-size: 30px;
}


.badge {
  background: #eef4ff;
  color: #2563eb;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.title {
  font-size: 28px;
  font-weight: 800;
  margin: 12px 0;
}

.description {
  color: #6b7280;
  margin-bottom: 20px;
}

.price {
  font-size: 24px;
  font-weight: bold;
  color: #10b981;
  margin-bottom: 20px;
}

.buy-btn {
  background: #111827;
  color: white;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: 600;
  transition: 0.2s;
}

.buy-btn:hover {
  background: #2563eb;
}
</style>