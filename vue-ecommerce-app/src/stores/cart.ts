import { defineStore } from 'pinia'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),

  getters: {
    cartItems: (state) => state.items,

    totalAmount: (state) =>
      state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
  },

  actions: {
    addItem(product: { id: number; name: string; price: number }) {
      const existingItem = this.items.find(i => i.id === product.id)

      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({
          ...product,
          quantity: 1,
        })
      }
    },

    increaseItem(id: number) {
      const item = this.items.find(i => i.id === id)
      if (item) {
        item.quantity++
      }
    },

    decreaseItem(id: number) {
      const item = this.items.find(i => i.id === id)

      if (!item) return

      if (item.quantity > 1) {
        item.quantity--
      } else {
        this.removeItem(id)
      }
    },

    removeItem(itemId: number) {
      this.items = this.items.filter(item => item.id !== itemId)
    },

    clearCart() {
      this.items = []
    },
  },
})