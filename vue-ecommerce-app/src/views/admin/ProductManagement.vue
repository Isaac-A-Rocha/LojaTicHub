<template>
  <div class="admin-page">

    
    <div class="page-header">
      <div>
        <h1 class="title">Gerenciamento de Produtos</h1>
        <p class="subtitle">Controle do catálogo da loja</p>
      </div>

      <button class="create-btn" @click="addProduct">
        <i class="pi pi-plus"></i>
        Novo Produto
      </button>
    </div>

    
    <div class="table-container">

      <DataTable
        :value="products"
        :loading="loading"
        paginator
        :rows="8"
        class="custom-table"
      >

        <template #empty>
          <div class="empty-state">
            <i class="pi pi-box"></i>
            <p>Nenhum produto cadastrado</p>
          </div>
        </template>

        <Column field="name" header="Produto" />

        <Column header="Categoria">
          <template #body="{ data }">
            <span class="badge">
              {{ data.category }}
            </span>
          </template>
        </Column>
        
        <Column header="Preço">
          <template #body="{ data }">
            <span class="price">
              {{ formatCurrency(data.price) }}
            </span>
          </template>
        </Column>

        <Column header="">
          <template #body="slotProps">
            <div class="actions">

              <button 
                class="edit-btn"
                @click="editProduct(slotProps.data)"
              >
                <i class="pi pi-pencil"></i>
              </button>

              <button 
                class="delete-btn"
                @click="deleteProduct(slotProps.data.id)"
              >
                <i class="pi pi-trash"></i>
              </button>

            </div>
          </template>
        </Column>

      </DataTable>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useProductsStore } from '@/stores/products'

const store = useProductsStore()

const products = computed(() => store.products)


const loading = computed(() => store.products.length === 0)


onMounted(async () => {
  if (!store.products.length) {
    await store.fetchProducts()
  }
})

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

const addProduct = () => {
  console.log('Criar produto')
}

const editProduct = (product: any) => {
  console.log('Editar', product)
}

const deleteProduct = (id: number) => {
  console.log('Deletar', id)

  store.products = store.products.filter(p => p.id !== id)
}
</script>

<style scoped>

.admin-page {
  padding: 24px;
  background: #f9fafb;
  min-height: 100vh;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.title {
  font-size: 24px;
  font-weight: 800;
  color: #111827;
}

.subtitle {
  font-size: 14px;
  color: #6b7280;
}

.create-btn {
  background: #10b981;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 10px;

  display: flex;
  align-items: center;
  gap: 6px;

  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.create-btn:hover {
  background: #059669;
}


.table-container {
  background: white;
  border-radius: 16px;
  border: 1px solid #f1f1f1;
  overflow: hidden;
}


:deep(.p-datatable) {
  border: none;
}


:deep(.p-datatable-thead > tr > th) {
  background: #f9fafb;
  font-size: 12px;
  text-transform: uppercase;
  color: #6b7280;
  border: none;
}


:deep(.p-datatable-tbody > tr) {
  border-bottom: 1px solid #f1f1f1;
}

:deep(.p-datatable-tbody > tr:hover) {
  background: #fafafa;
}

:deep(.p-datatable-tbody > tr > td) {
  padding: 16px;
  border: none;
}

.badge {
  background: #eef4ff;
  color: #2563eb;
  font-size: 11px;
  font-weight: 700;
  padding: 5px 10px;
  border-radius: 999px;
}


.price {
  font-weight: 700;
  color: #10b981;
}


.actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}


.edit-btn {
  width: 36px;
  height: 36px;
  background: #eff6ff;
  border: none;
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  transition: 0.2s;
}

.edit-btn:hover {
  background: #dbeafe;
}

.edit-btn i {
  color: #2563eb;
}


.delete-btn {
  width: 36px;
  height: 36px;
  background: #fee2e2;
  border: none;
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  transition: 0.2s;
}

.delete-btn:hover {
  background: #fecaca;
}

.delete-btn i {
  color: #dc2626;
}


.empty-state {
  text-align: center;
  padding: 60px 0;
  color: #9ca3af;
}

.empty-state i {
  font-size: 40px;
  margin-bottom: 10px;
}

</style>