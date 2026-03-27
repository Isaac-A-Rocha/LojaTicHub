<template>
  <div class="p-6">
    
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">User Management</h1>
        <p class="text-gray-600">Manage users, roles, and permissions</p>
      </div>

      <Button label="Add User" icon="pi pi-plus" @click="addUser" />
    </div>

    <DataTable
      :value="users"
      dataKey="id"
      paginator
      :rows="10"
      class="shadow-lg rounded-xl overflow-hidden"
    >
      <Column field="name" header="Name" />
      <Column field="email" header="Email" />
      <Column field="role" header="Role" />

      <Column header="Actions">
        <template #body="slotProps">
          <div class="flex gap-2">
            <Button
              icon="pi pi-pencil"
              severity="info"
              outlined
              @click="editUser(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              severity="danger"
              outlined
              @click="removeUser(slotProps.data.id)"
            />
          </div>
        </template>
      </Column>
    </DataTable>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { User } from '@/types'

import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const users = ref<User[]>([
  { id: 1, name: 'Isaac', email: 'isaac@email.com', role: 'admin' },
  { id: 2, name: 'João', email: 'joao@email.com', role: 'consumer' }
])

const addUser = () => {
  console.log('Add user')
}

const editUser = (user: User) => {
  console.log('Edit:', user)
}

const removeUser = (userId: number) => {
  users.value = users.value.filter(u => u.id !== userId)
}
</script>