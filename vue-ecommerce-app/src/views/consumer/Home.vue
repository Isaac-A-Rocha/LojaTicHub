<template>
  <div class="home-wrapper">
    <header class="hero-section">
      <div class="hero-content">
        <span class="hero-badge">Novidades de 2026</span>
        <h1 class="hero-title">
          Tecnologia que <span class="text-blue-600">move</span> você.
        </h1>
        <p class="hero-subtitle">
          Explore nossa curadoria exclusiva de produtos com design minimalista 
          e performance de última geração. Tudo com frete grátis esta semana.
        </p>
        <div class="hero-actions">
          <Button @click="scrollToProducts" class="btn-primary">
            Ver Catálogo <i class="pi pi-arrow-down ml-2 text-xs"></i>
          </Button>
          <Button class="btn-secondary">Saber Mais</Button>
        </div>
      </div>
    </header>

    <section id="products-grid" class="products-container">
      <div class="section-header">
        <h2 class="text-2xl font-extrabold text-gray-900">Destaques da Semana</h2>
        <p class="text-gray-500">Os itens mais desejados da nossa comunidade.</p>
      </div>
      
      <ProductList />
    </section>

    <footer class="benefits-grid">
      <div class="benefit-card">
        <div class="icon-box bg-blue-50 text-blue-600">
          <i class="pi pi-truck text-2xl"></i>
        </div>
        <h3>Entrega Expressa</h3>
        <p>Receba em até 48h nas principais capitais com rastreio total.</p>
      </div>

      <div class="benefit-card">
        <div class="icon-box bg-green-50 text-green-600">
          <i class="pi pi-shield text-2xl"></i>
        </div>
        <h3>Pagamento Blindado</h3>
        <p>Seus dados processados com criptografia de ponta a ponta.</p>
      </div>

      <div class="benefit-card">
        <div class="icon-box bg-purple-50 text-purple-600">
          <i class="pi pi-sync text-2xl"></i>
        </div>
        <h3>Devolução Grátis</h3>
        <p>Não gostou? Trocamos sem burocracia em até 7 dias úteis.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import ProductList from '@/views/consumer/ProductList.vue';
import Button from '@/components/ui/Button.vue';

const scrollToProducts = () => {
  document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth' });
};
</script>

<style scoped>
.home-wrapper {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.hero-section {
  padding: 5rem 1rem;
  margin-bottom: 3rem;
  background: radial-gradient(circle at top right, rgba(59, 130, 246, 0.05), transparent);
  border-radius: 2.5rem;
}

.hero-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.hero-badge {
  background: #eff6ff;
  color: #2563eb;
  padding: 0.5rem 1rem;
  border-radius: 99px;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 900;
  line-height: 1.1;
  margin: 1.5rem 0;
  color: #111827;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #6b7280;
  margin-bottom: 2.5rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}


.btn-primary {
  background-color: #111827;
  color: #ffffff;
  padding: 1rem 2rem;
  border-radius: 1rem;
  font-weight: 700;
  transition: all 0.2s ease;
  box-shadow: 0 10px 30px rgba(17,24,39,0.35);
}

.btn-primary:hover {
  background-color: #2563eb;
}

.btn-secondary {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  color: #374151;
  padding: 1rem 2rem;
  border-radius: 1rem;
  font-weight: 700;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  border-color: #9ca3af;
}

.section-header {
  margin-bottom: 3rem;
  border-left: 4px solid #2563eb;
  padding-left: 1.5rem;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 6rem;
  padding: 4rem 0;
  border-top: 1px solid #f3f4f6;
}

.benefit-card {
  text-align: left;
  padding: 1.5rem;
  border-radius: 1.5rem;
  transition: background 0.3s;
}

.benefit-card:hover {
  background: #f9fafb;
}

.icon-box {
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  margin-bottom: 1.25rem;
}

.benefit-card h3 {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.benefit-card p {
  color: #6b7280;
  font-size: 0.9375rem;
  line-height: 1.5;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.home-wrapper {
  animation: fadeIn 0.8s ease-out;
}
      </style>