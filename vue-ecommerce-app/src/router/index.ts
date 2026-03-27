import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import ConsumerLayout from '../layouts/ConsumerLayout.vue';
import AdminLayout from '../layouts/AdminLayout.vue';
import Home from '../views/consumer/Home.vue';
import ProductList from '../views/consumer/ProductList.vue';
import Cart from '../views/consumer/Cart.vue';
import Checkout from '../views/consumer/Checkout.vue';
import Dashboard from '../views/admin/Dashboard.vue';
import ProductManagement from '../views/admin/ProductManagement.vue';
import UserManagement from '../views/admin/UserManagement.vue';
import Reports from '../views/admin/Reports.vue';
import { useUserStore } from '../stores/user';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: ConsumerLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
      },
      {
        path: 'products/:id',
        name: 'ProductDetails',
        component: ProductList,
      },
      {
        path: 'cart',
        name: 'Cart',
        component: Cart,
      },
      {
        path: 'checkout',
        name: 'Checkout',
        component: Checkout,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true, role: 'admin' },
      },
      {
        path: 'products',
        name: 'ProductManagement',
        component: ProductManagement,
        meta: { requiresAuth: true, role: 'admin' },
      },
      {
        path: 'users',
        name: 'UserManagement',
        component: UserManagement,
        meta: { requiresAuth: true, role: 'admin' },
      },
      {
        path: 'reports',
        name: 'Reports',
        component: Reports,
        meta: { requiresAuth: true, role: 'admin' },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const isAuthenticated = userStore.isAuthenticated;
  const userRole = userStore.user?.role;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Home' });
  } else if (to.meta.requiresAuth && to.meta.role && userRole !== to.meta.role) {
    next({ name: 'Home' });
  } else {
    next();
  }
});

export default router;
