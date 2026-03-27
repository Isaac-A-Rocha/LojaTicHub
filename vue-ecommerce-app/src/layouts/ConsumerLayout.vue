<template>
  <div class="layout-container">
    <Header />
    
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/common/Header.vue';
</script>

<style scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
}

.main-content {
  flex-grow: 1; 
  padding: 20px;
  background-color: #f9fafb; 
}
</style>