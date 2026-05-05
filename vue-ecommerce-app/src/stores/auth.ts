import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // currently authenticated user (no password stored here)
    user: null as { id: string; name: string; email: string; role: string } | null,
    token: null as string | null,
    isAuthenticated: false,
    // in-memory users store to allow login for newly registered accounts
    users: [
      { id: '1', name: 'Admin', email: 'admin@example.com', password: 'admin123', role: 'admin' },
      { id: '2', name: 'User', email: 'user@example.com', password: 'user123', role: 'consumer' },
    ] as Array<{ id: string; name: string; email: string; password: string; role: string }>,
  }),
  actions: {
    async login(credentials: { email: string; password: string }) {
      // Simulação de login com suporte a usuários registrados dinamicamente
      return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          const found = this.users.find(u => u.email === credentials.email && u.password === credentials.password);
          if (found) {
            this.user = { id: found.id, name: found.name, email: found.email, role: found.role };
            this.token = `fake-token-${found.id}`;
            this.isAuthenticated = true;
            resolve();
          } else {
            reject(new Error('Credenciais inválidas'));
          }
        }, 800); // pequeno delay para UX
      });
    },
    async register(userData: { name: string; email: string; password: string }) {
      // Simulação de registro: adiciona o usuário à lista em memória e faz login
      return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          const exists = this.users.find(u => u.email === userData.email);
          if (exists) {
            reject(new Error('Usuário já existe'));
            return;
          }

          const id = Date.now().toString();
          const newUser = { id, name: userData.name, email: userData.email, password: userData.password, role: 'consumer' };
          this.users.push(newUser);

          // set authenticated user (do not store password on `this.user`)
          this.user = { id, name: userData.name, email: userData.email, role: 'consumer' };
          this.token = `fake-token-${id}`;
          this.isAuthenticated = true;
          resolve();
        }, 800);
      });
    },
    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
    },
  },
  getters: {
    isAdmin: (state) => state.user?.role === 'admin',
    isConsumer: (state) => state.user?.role === 'consumer',
  },
});