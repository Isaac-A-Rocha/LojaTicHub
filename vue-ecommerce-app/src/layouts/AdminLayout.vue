<template>
  <div class="admin-layout">

    <aside class="sidebar">
      <div class="logo">
        <span> Admin</span>
      </div>

      <Menubar :model="menuItems" class="admin-menu">
        <template #item="{ item }">
          <router-link v-if="item.route" :to="item.route" class="menu-link">
            <i :class="item.icon"></i>
            <span>{{ item.label }}</span>
          </router-link>
          <div v-else class="menu-link">
            <i :class="item.icon"></i>
            <span>{{ item.label }}</span>
          </div>
        </template>
      </Menubar>
    </aside>

    <div class="content-area">

      <header class="topbar">
        <h1 class="page-title">Painel Administrativo</h1>

        <div class="user-box">
          <i class="pi pi-user"></i>
          <span>{{ userRole }}</span>
        </div>
      </header>


      <main class="page-content">
        <router-view />
      </main>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import Menubar from 'primevue/menubar'

const userStore = useUserStore()

const userRole = computed(() => userStore.user?.name || 'Admin')

const menuItems = [
  {
    label: 'Dashboard',
    icon: 'pi pi-home',
    route: '/admin/dashboard',
  },
  {
    label: 'Produtos',
    icon: 'pi pi-box',
    route: '/admin/products',
  },
  {
    label: 'Usuários',
    icon: 'pi pi-users',
    route: '/admin/users',
  },
  {
    label: 'Relatórios',
    icon: 'pi pi-chart-bar',
    route: '/admin/reports',
  },
]
</script>

<style scoped>

.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f9fafb;
}

.sidebar {
  width: 240px;
  background: #111827;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}


.logo {
  font-size: 18px;
  font-weight: bold;
  padding: 0 20px;
  margin-bottom: 30px;
}


.admin-menu {
  border: none;
  background: transparent;
  padding: 0;
}

:deep(.p-menubar-root-list) {
  flex-direction: column;
  gap: 6px;
}

:deep(.p-menubar-item-link) {
  padding: 10px 20px !important;
  color: #9ca3af !important;
  border: none !important;
  border-radius: 0 !important;
  transition: 0.2s;
}

:deep(.p-menubar-item-link:hover) {
  background: #1f2937 !important;
  color: white !important;
}

:deep(.p-menubar-item.p-router-link-active .p-menubar-item-link) {
  background: #2563eb !important;
  color: white !important;
  font-weight: 600;
  border-left: 4px solid #60a5fa !important;
}

.menu-link {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: inherit;
}

.content-area {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 24px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
}

.page-title {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
}

.user-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f3f4f6;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 13px;
  color: #374151;
}

.page-content {
  padding: 24px;
}

</style>