import { defineStore } from 'pinia';
import { Product } from '../types';

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [
      { id: 1, name: 'Fone de Ouvido', description: 'Áudio de alta qualidade', price: 199.9, category: 'Audio', imageUrl: '' },
      { id: 2, name: 'Mouse Gamer', description: 'Precisão e ergonomia', price: 89.9, category: 'Acessórios', imageUrl: '' },
      { id: 3, name: 'Teclado Mecânico', description: 'Sucesso para digitação e jogos', price: 249.9, category: 'Acessórios', imageUrl: '' }
    ] as Product[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchProducts(): Promise<Product[]> {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        this.products = await response.json();
        return this.products;
      } catch (err) {
        this.error = (err as Error).message;
        return [];
      } finally {
        this.loading = false;
      }
    },
    addProduct(product: Product) {
      this.products.push(product);
    },
    updateProduct(updatedProduct: Product) {
      const index = this.products.findIndex(product => product.id === updatedProduct.id);
      if (index !== -1) {
        this.products[index] = updatedProduct;
      }
    },
    removeProduct(productId: number) {
      this.products = this.products.filter(product => product.id !== productId);
    },
  },
});