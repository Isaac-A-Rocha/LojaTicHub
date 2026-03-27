<template>
  <div class="dashboard">

    <!-- 🔥 BREADCRUMB DO PRIMEVUE -->
    <Breadcrumb :model="breadcrumbItems" class="mb-6">
      <template #item="{ item }">
        <router-link v-if="item.route" :to="item.route">
          {{ item.label }}
        </router-link>
        <span v-else>{{ item.label }}</span>
      </template>
    </Breadcrumb>

    <!-- HEADER -->
    <header class="header">
      <h1>Dashboard</h1>
      <p>Gerencie sua plataforma de forma simples e rápida.</p>
    </header>

    <!-- STATS COM CARD DO PRIMEVUE -->
    <div class="stats-grid">

      <Card class="stat-card-wrapper">
        <template #content>
          <div class="stat-card blue">
            <div class="icon">
              <i class="pi pi-box"></i>
            </div>
            <div>
              <span class="label">Produtos</span>
              <span class="value">124</span>
            </div>
          </div>
        </template>
      </Card>

      <Card class="stat-card-wrapper">
        <template #content>
          <div class="stat-card green">
            <div class="icon">
              <i class="pi pi-chart-line"></i>
            </div>
            <div>
              <span class="label">Vendas (Mês)</span>
              <span class="value">R$ 12.450</span>
            </div>
          </div>
        </template>
      </Card>

      <Card class="stat-card-wrapper">
        <template #content>
          <div class="stat-card purple">
            <div class="icon">
              <i class="pi pi-users"></i>
            </div>
            <div>
              <span class="label">Usuários</span>
              <span class="value">48</span>
            </div>
          </div>
        </template>
      </Card>

    </div>

    <!-- PLACEHOLDER GRÁFICOS -->
    <Card class="mt-6">
      <template #title>
        Gráficos e Análises
      </template>
      <template #content>
        <div class="analytics-box">
          <i class="pi pi-chart-bar"></i>
          <p>Gráficos e análises aparecerão aqui</p>
        </div>
      </template>
    </Card>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Breadcrumb from 'primevue/breadcrumb'
import Card from 'primevue/card'

defineOptions({
  name: 'AdminDashboard'
})

const breadcrumbItems = computed(() => [
  { label: 'Admin', route: '/admin/dashboard' },
  { label: 'Dashboard' },
])
</script>

<style scoped>

/* ===== BASE ===== */
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* ===== BREADCRUMB (PRIMEVUE) ===== */
:deep(.p-breadcrumb) {
  background: transparent;
  border: none;
  padding: 0;
  margin-bottom: 16px;
}

:deep(.p-breadcrumb-list) {
  gap: 0;
}

:deep(.p-breadcrumb-item-content) {
  height: auto;
  padding: 0;
}

:deep(.p-breadcrumb-item a) {
  color: #2563eb;
  text-decoration: none;
  font-size: 13px;
  transition: 0.2s;
}

:deep(.p-breadcrumb-item a:hover) {
  color: #1d4ed8;
  text-decoration: underline;
}

/* ===== HEADER ===== */
.header h1 {
  font-size: 28px;
  font-weight: 800;
  color: #111827;
}

.header p {
  color: #6b7280;
  margin-top: 4px;
}

/* ===== GRID ===== */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

/* STAT CARD WRAPPER (PRIMEVUE CARD) */
:deep(.stat-card-wrapper .p-card) {
  border: 1px solid #f1f1f1;
  background: white;
  padding: 0;
}

:deep(.stat-card-wrapper .p-card-content) {
  padding: 0;
}

/* ===== CARD ===== */
.stat-card {
  display: flex;
  align-items: center;
  gap: 14px;

  padding: 18px;
  border-radius: 16px;

  background: white;

  transition: 0.25s;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.06);
}

/* ICON */
.icon {
  width: 44px;
  height: 44px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 12px;
}

/* COLORS */
.blue .icon {
  background: #eff6ff;
  color: #2563eb;
}

.green .icon {
  background: #ecfdf5;
  color: #10b981;
}

.purple .icon {
  background: #f5f3ff;
  color: #7c3aed;
}

/* TEXT */
.label {
  font-size: 12px;
  color: #6b7280;
}

.value {
  display: block;
  font-size: 22px;
  font-weight: 800;
  color: #111827;
}

.analytics-box {
  height: 220px;

  border-radius: 16px;
  border: 2px dashed #e5e7eb;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: #9ca3af;
}

.analytics-box i {
  font-size: 32px;
  margin-bottom: 10px;
}

:deep(.p-card) {
  border: 1px solid #e5e7eb;
  background: white;
}

:deep(.mt-6) {
  margin-top: 24px;
}

:deep(.mb-6) {
  margin-bottom: 24px;
}

</style>