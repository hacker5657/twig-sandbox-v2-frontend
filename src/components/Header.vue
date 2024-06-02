<template>
  <header class="header">
      <RouterLink to="/" class="header-brand">
        <h1>Twig Sandbox</h1>
      </RouterLink>
      <div class="actions">
        <RouterLink v-if="!isAuthUser" to="/login">
          <Button>Войти</Button>
        </RouterLink>
        <RouterLink v-if="!isAuthUser" to="/register">
          <Button>Зарегистрироваться</Button>
        </RouterLink>
        <RouterLink v-if="isAuthUser" to="/profile">
          <Button>Профиль</Button>
        </RouterLink>
        <Button v-if="isAuthUser" @click="logoutUser()">Выйти</Button>
      </div>
    </header>
</template>

<script>
import Button from 'primevue/button'
import { api } from '../axios-instance';

export default {
  components: {
    Button
  },
  props: {
    isAuthUser: Boolean
  },
  methods: {
    async logoutUser(){
      const { data } = await api.get('/auth/logout')
    }
  }
}
</script>

<style scoped>
.header{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid var(--surface-200);
}
.header h1 {
  margin: 0;
}

.header .actions{
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-brand{
  text-decoration: none;
  background: linear-gradient(to bottom right, var(--primary-400), var(--primary-500));
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
}
</style>
