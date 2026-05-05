<template>
  <div class="checkout-wrapper">

    <div class="checkout-container">

      <h1 class="title">Finalizar Compra</h1>

      <div class="card">

        <p class="subtitle">
          Revise suas informações antes de concluir o pedido.
        </p>

        <div class="summary">
          <div class="row">
            <span>Subtotal</span>
            <span>R$ {{ formatPrice(subtotal) }}</span>
          </div>

          <div class="row">
            <span>Frete</span>
            <span class="free">Grátis</span>
          </div>

          <div class="divider"></div>

          <div class="row total">
            <span>Total</span>
            <span>R$ {{ formatPrice(subtotal) }}</span>
          </div>
        </div>

        <button class="checkout-btn" @click="confirmOrder">
          Confirmar Pedido
        </button>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const toast = useToast()
const cartStore = useCartStore()

const subtotal = computed(() => cartStore.totalAmount)

const formatPrice = (value: number) => {
  return value.toFixed(2)
}

const confirmOrder = () => {
  // Simulate order confirmation
  toast.add({ severity: 'success', summary: 'Pedido', detail: 'Pedido confirmado!', life: 3000 })
  cartStore.clearCart()
  router.push({ name: 'Home' })
}
</script>

<style scoped>
.checkout-wrapper {
  padding: 40px 20px;
}

.checkout-container {
  max-width: 600px;
  margin: 0 auto;
}

.title {
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 20px;
  text-align: center;
}

.card {
  background: #ffffff;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #f1f1f1;
  box-shadow: 0 10px 25px rgba(0,0,0,0.04);
}

.subtitle {
  color: #6b7280;
  margin-bottom: 20px;
  text-align: center;
}

.summary {
  margin-bottom: 24px;
}

.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
}

.free {
  color: #10b981;
  font-weight: 600;
}

.divider {
  height: 1px;
  background: #eee;
  margin: 10px 0;
}

.total {
  font-weight: bold;
  font-size: 16px;
}

.checkout-btn {
  width: 100%;
  background: #111827;
  color: white;
  padding: 12px;
  border-radius: 12px;
  font-weight: 600;
  transition: 0.2s;
}

.checkout-btn:hover {
  background: #2563eb;
}
</style>