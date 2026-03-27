export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'consumer';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface CartState {
  items: CartItem[];
}

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}