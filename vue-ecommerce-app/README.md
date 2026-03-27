# Vue E-commerce App

This is a Vue 3 + TypeScript e-commerce application that features both consumer and admin areas. The application is structured to provide a seamless shopping experience for users while allowing administrators to manage products and users effectively.

## Project Structure

```
vue-ecommerce-app
├── public
│   └── index.html
├── src
│   ├── assets
│   │   └── styles
│   │       └── main.css
│   ├── components
│   │   ├── common
│   │   │   └── Header.vue
│   │   └── ui
│   │       └── Button.vue
│   ├── layouts
│   │   ├── ConsumerLayout.vue
│   │   └── AdminLayout.vue
│   ├── router
│   │   └── index.ts
│   ├── stores
│   │   ├── cart.ts
│   │   ├── products.ts
│   │   └── user.ts
│   ├── types
│   │   └── index.ts
│   ├── views
│   │   ├── consumer
│   │   │   ├── Home.vue
│   │   │   ├── ProductList.vue
│   │   │   └── Cart.vue
│   │   └── admin
│   │       ├── Dashboard.vue
│   │       ├── ProductManagement.vue
│   │       └── UserManagement.vue
│   ├── App.vue
│   └── main.ts
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Features

- **Consumer Area**: Users can browse products, view product details, and manage their shopping cart.
- **Admin Area**: Administrators can manage products and users through a dedicated dashboard.
- **Routing**: The application uses Vue Router for navigation, with separate layouts for consumer and admin areas.
- **Access Control**: Role-based access control is implemented to restrict access to admin routes.

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd vue-ecommerce-app
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open your browser and go to `http://localhost:3000` to view the application.

## Usage Guidelines

- For consumers, navigate through the home page to explore products and add them to the cart.
- Admin users can access the admin dashboard to manage products and users. Ensure you have the necessary credentials to log in.

## Technologies Used

- Vue 3
- TypeScript
- Vue Router
- PrimeVue
- Tailwind CSS
- Vite

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.