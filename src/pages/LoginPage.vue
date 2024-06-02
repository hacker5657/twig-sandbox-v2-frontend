<template>
  <div class="main">
    <div class="form">
      <h1>Войти</h1>
      <InputText v-model="username" placeholder="Ввдите имя пользователя"/>
      <InputText v-model="password" type="password" placeholder="Ввдите пароль"/>
      <Button @click="loginUser()" label="Войти" class="btn"/>
      <RouterLink class="link" to="/register">
        <Button label="Зарегистрироваться" link/>
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { api } from '../axios-instance'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

export default {
  components: {
    InputText,
    Button
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },

  methods: {
    async loginUser() {
      const { data } = await api.post('/auth/login', {
        username: this.username,
        password: this.password
      })

      if (data.success) {
        this.$router.replace('/')
      }

    }
  }
}
</script>

<style scoped>
.main{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form{
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 320px;
}
.form h1 {
  margin: 0 0 8px 0;
  text-align: center;
}
.link{
  text-align: center;
}
.btn{
  justify-content: center;
}
</style>