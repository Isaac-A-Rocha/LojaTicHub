<template>
  <div class="reports-container">
    <Breadcrumb :model="breadcrumbItems" class="mb-6">
      <template #item="{ item }">
        <router-link v-if="item.route" :to="item.route">
          {{ item.label }}
        </router-link>
        <span v-else>{{ item.label }}</span>
      </template>
    </Breadcrumb>

    <header class="header">
      <h1>Relatórios de Vendas</h1>
      <p>Análise de desempenho e métricas de vendas</p>
    </header>

    <!-- CARDS STATS -->
    <div class="stats-grid">
      <Card class="stat-card">
        <template #title>
          <div class="flex items-center gap-2">
            <i class="pi pi-chart-bar text-2xl text-blue-600"></i>
            Vendas Totais
          </div>
        </template>
        <template #content>
          <p class="text-3xl font-bold text-gray-900">R$ 45.230</p>
          <p class="text-sm text-green-600 mt-2">↑ 12% este mês</p>
        </template>
      </Card>

      <Card class="stat-card">
        <template #title>
          <div class="flex items-center gap-2">
            <i class="pi pi-shopping-bag text-2xl text-purple-600"></i>
            Pedidos
          </div>
        </template>
        <template #content>
          <p class="text-3xl font-bold text-gray-900">284</p>
          <p class="text-sm text-green-600 mt-2">↑ 8% este mês</p>
        </template>
      </Card>

      <Card class="stat-card">
        <template #title>
          <div class="flex items-center gap-2">
            <i class="pi pi-users text-2xl text-green-600"></i>
            Clientes Ativos
          </div>
        </template>
        <template #content>
          <p class="text-3xl font-bold text-gray-900">156</p>
          <p class="text-sm text-green-600 mt-2">↑ 5% este mês</p>
        </template>
      </Card>
    </div>

    <Card class="mt-6">
      <template #title>
        Gráfico de Vendas (Últimos 30 dias)
      </template>
      <template #content>
        <div class="analytics-placeholder">
          <i class="pi pi-chart-line"></i>
          <p>Integre com Chart.js ou ApexCharts para visualizações avançadas</p>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Breadcrumb from 'primevue/breadcrumb'
import Card from 'primevue/card'

const breadcrumbItems = computed(() => [
  { label: 'Admin', route: '/admin/dashboard' },
  { label: 'Análise', route: '/admin/reports' },
])
</script>

<style scoped>
.reports-container {
  padding: 24px;
  background: #f9fafb;
  min-height: 100vh;
}

.header h1 {
  font-size: 28px;
  font-weight: 800;
  color: #111827;
}

.header p {
  color: #6b7280;
  margin-top: 4px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  margin-top: 20px;
}

.stat-card {
  border: 1px solid #e5e7eb;
  background: white;
}

.analytics-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  color: #9ca3af;
}

.analytics-placeholder i {
  font-size: 48px;
  margin-bottom: 16px;
  color: #d1d5db;
}
</style>
