<template>
  <button class="p-button p-component">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Button',
});
</script>

<style scoped>
.p-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background-color: #3b82f6; 
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-radius: 0.375rem; 
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, transform 0.1s;
}

.p-button:hover {
  background-color: #2563eb; 
}

.p-button:active {
  transform: scale(0.98);
}

.p-button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
  transform: none;
}
</style>