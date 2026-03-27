import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as { id: string; name: string; role: string } | null,
    isAuthenticated: false,
  }),
  actions: {
    login(userData: { id: string; name: string; role: string }) {
      this.user = userData;
      this.isAuthenticated = true;
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false;
    },
    setUser(userData: { id: string; name: string; role: string }) {
      this.user = userData;
    },
  },
  getters: {
    isAdmin: (state) => state.user?.role === 'admin',
    isConsumer: (state) => state.user?.role === 'consumer',
  },
});