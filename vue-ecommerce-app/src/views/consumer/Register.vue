<template>
  <div class="page-shell">
    <Card class="card-form">
      <template #content>
        <div class="card-grid">
          <div>
            <div class="form-header">
              <h2>Criar Conta</h2>
              <p>Complete seu cadastro e acesse seu carrinho com segurança.</p>
            </div>

            <form @submit.prevent="handleSubmit" class="form-block">
              <div>
                <label for="name" class="block text-sm font-medium text-slate-700">Nome</label>
                <InputText
                  id="name"
                  v-model="form.name"
                  :class="['w-full', v$.name.$error ? 'p-invalid' : '']"
                  placeholder="Digite seu nome"
                  @blur="v$.name.$touch()"
                />
                <small v-if="v$.name.$error && v$.name.$dirty" class="p-error">{{ v$.name.$errors[0].$message }}</small>
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-slate-700">E-mail</label>
                <InputText
                  id="email"
                  v-model="form.email"
                  :class="['w-full', v$.email.$error ? 'p-invalid' : '']"
                  placeholder="Digite seu e-mail"
                  @blur="v$.email.$touch()"
                />
                <small v-if="v$.email.$error && v$.email.$dirty" class="p-error">{{ v$.email.$errors[0].$message }}</small>
              </div>

              <div>
                <label for="password" class="block text-sm font-medium text-slate-700">Senha</label>
                <div class="input-with-toggle">
                  <InputText
                    id="password"
                    :type="showPassword ? 'text' : 'password'"
                    v-model="form.password"
                    :class="['w-full', v$.password.$error ? 'p-invalid' : '']"
                    placeholder="Digite sua senha"
                    @blur="v$.password.$touch()"
                  />
                  <button type="button" class="password-toggle" @click="showPassword = !showPassword" aria-label="Mostrar/ocultar senha">
                    <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
                  </button>
                </div>
                <small v-if="v$.password.$error && v$.password.$dirty" class="p-error">{{ v$.password.$errors[0].$message }}</small>
              </div>

              <div>
                <label for="confirmPassword" class="block text-sm font-medium text-slate-700">Confirmar Senha</label>
                <div class="input-with-toggle">
                  <InputText
                    id="confirmPassword"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    v-model="form.confirmPassword"
                    :class="['w-full', v$.confirmPassword.$error ? 'p-invalid' : '']"
                    placeholder="Confirme sua senha"
                    @blur="v$.confirmPassword.$touch()"
                  />
                  <button type="button" class="password-toggle" @click="showConfirmPassword = !showConfirmPassword" aria-label="Mostrar/ocultar senha">
                    <i :class="showConfirmPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
                  </button>
                </div>
                <small v-if="v$.confirmPassword.$error && v$.confirmPassword.$dirty" class="p-error">{{ v$.confirmPassword.$errors[0].$message }}</small>
              </div>

              <div class="form-actions">
                <Button
                  type="submit"
                  :loading="loading"
                  :disabled="v$.$invalid"
                  class="p-button-rounded p-button-lg p-button-success"
                  label="Criar Conta"
                />
                <p class="submit-note">Preencha todos os campos corretamente antes de enviar.</p>
              </div>
            </form>
          </div>
          <div class="card-aside">
            <h3 class="text-xl font-semibold mb-4">Benefícios do cadastro</h3>
            <ul class="space-y-3 text-slate-200">
              <li>• Checkout mais rápido</li>
              <li>• Histórico de pedidos</li>
              <li>• Acesso seguro ao carrinho</li>
              <li>• Feedback visual imediato</li>
            </ul>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { useAuthStore } from '@/stores/auth';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required, email, minLength, sameAs } from '@vuelidate/validators';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const rules = {
  name: { required: helpers.withMessage('O nome é obrigatório', required) },
  email: {
    required: helpers.withMessage('O e-mail é obrigatório', required),
    email: helpers.withMessage('Digite um e-mail válido', email),
  },
  password: {
    required: helpers.withMessage('A senha é obrigatória', required),
    minLength: helpers.withMessage('A senha deve ter pelo menos 6 caracteres', minLength(6)),
  },
  confirmPassword: {
    required: helpers.withMessage('A confirmação de senha é obrigatória', required),
    // Use a direct comparison validator to avoid edge-cases with reactive access
    sameAsPassword: helpers.withMessage('As senhas não coincidem', (value: string) => {
      return value === form.password;
    }),
  },
};

const v$ = useVuelidate(rules, form);
const loading = ref(false);

const handleSubmit = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  loading.value = true;
  try {
    // Normalize (trim) before comparing to avoid invisible-space mismatches
    const pwd = form.password?.toString().trim();
    const conf = form.confirmPassword?.toString().trim();

    if (pwd !== conf) {
      toast.add({ severity: 'error', summary: 'Erro', detail: 'As senhas não coincidem (remova espaços no início/fim)', life: 4000 });
      loading.value = false;
      return;
    }

    await authStore.register({ name: form.name, email: form.email, password: pwd });
    toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Conta criada com sucesso!', life: 3000 });
    router.push('/');
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar conta', life: 3000 });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.page-shell {
  min-height: 100vh;
  padding: 40px 20px;
  background: radial-gradient(circle at top left, #f8fbff 0%, #eef2ff 35%, #f8fafc 100%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-form {
  width: 100%;
  max-width: 950px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 30px 90px rgba(15, 23, 42, 0.12);
}

.card-grid {
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr;
}

@media (min-width: 960px) {
  .card-grid {
    grid-template-columns: 1.2fr 0.8fr;
  }
}

.form-header h2 {
  margin: 0 0 10px;
  font-size: 2rem;
  color: #111827;
}

.form-header p {
  margin: 0;
  color: #4b5563;
}

.form-block {
  display: grid;
  gap: 18px;
}

.form-block label {
  display: block;
  margin-bottom: 8px;
  color: #374151;
  font-weight: 600;
}

.form-block .p-inputtext,
.form-block .p-password {
  width: 100%;
}

.input-with-toggle {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
}

.password-toggle .pi {
  font-size: 1rem;
}

.form-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 8px;
}

.submit-note {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.card-aside {
  background: #0f172a;
  color: #f8fafc;
  border-radius: 0 24px 24px 0;
  padding: 32px 26px;
  display: none;
}

@media (min-width: 960px) {
  .card-aside {
    display: block;
  }
}

.card-aside h3 {
  margin: 0 0 16px;
  font-size: 1.25rem;
}

.card-aside ul {
  padding-left: 1rem;
  margin: 0;
  list-style: none;
}

.card-aside ul li {
  position: relative;
  margin-bottom: 14px;
  padding-left: 20px;
}

.card-aside ul li::before {
  content: '•';
  position: absolute;
  left: 0;
  top: 0;
  color: #22c55e;
}

.p-error {
  color: #dc2626;
  font-size: 0.875rem;
  display: block;
  margin-top: 6px;
}

.p-invalid {
  border-color: #dc2626 !important;
}
</style>