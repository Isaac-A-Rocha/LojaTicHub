<template>
  <header class="header">
    <div class="container">
      
      <!-- LOGO -->
      <div class="logo">
        <router-link to="/">
          <span class="brand">E-Commerce</span>
        </router-link>
      </div>

      <!-- NAV -->
      <nav class="nav">
        <router-link to="/" class="nav-link">Home</router-link>

        <router-link to="/cart" class="nav-link cart-link">
          <i class="pi pi-shopping-cart"></i>
          Carrinho
          <span v-if="cartCount > 0" class="cart-badge">
            {{ cartCount }}
          </span>
        </router-link>
      </nav>

      <!-- ACTIONS -->
      <div class="actions">

        <!-- ADMIN (só se for admin) -->
        <router-link 
          v-if="userStore.isAdmin"
          to="/admin/dashboard" 
          class="admin-btn"
        >
          <i class="pi pi-cog"></i>
        </router-link>

        <!-- LOGIN -->
        <button 
          v-if="!userStore.isAuthenticated"
          @click="loginAsAdmin"
          class="login-btn"
        >
          Entrar
        </button>

        <!-- LOGOUT -->
        <button 
          v-else
          @click="logout"
          class="logout-btn"
        >
          Sair
        </button>

      </div>

    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'

const cartStore = useCartStore()
const userStore = useUserStore()
const router = useRouter()

const cartCount = computed(() =>
  cartStore.cartItems.reduce((sum, item) => sum + item.quantity, 0)
)

const loginAsAdmin = () => {
  userStore.login({
    id: '1',
    name: 'Admin',
    role: 'admin'
  })

  router.push('/admin/dashboard')
}

const logout = () => {
  userStore.logout()

  router.push('/')
}
</script>

<style scoped>

.header {
  position: sticky;
  top: 0;
  z-index: 50;

  background: rgba(17, 24, 39, 0.9);
  backdrop-filter: blur(10px);

  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 14px 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  font-size: 18px;
  font-weight: 800;
  color: white;
}

.nav {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-link {
  color: #d1d5db;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: 0.2s;
}

.nav-link:hover {
  color: white;
}

.cart-link {
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
}

.cart-badge {
  position: absolute;
  top: -6px;
  right: -10px;

  background: #10b981;
  color: white;

  font-size: 10px;
  font-weight: 700;

  padding: 2px 6px;
  border-radius: 999px;
}

.actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.admin-btn {
  width: 36px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;
  background: #374151;

  color: white;

  transition: 0.2s;
}

.admin-btn:hover {
  background: #2563eb;
}

.login-btn {
  background: #2563eb;
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  transition: 0.2s;
}

.login-btn:hover {
  background: #1d4ed8;
}

.logout-btn {
  background: #ef4444;
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  transition: 0.2s;
}

.logout-btn:hover {
  background: #dc2626;
}

.router-link-active {
  color: white;
  font-weight: 600;
}

</style>