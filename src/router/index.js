import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import LogoutPage from '../pages/LogoutPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import ProfilePage from '../pages/ProfilePage.vue'

const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/register',
    component: RegisterPage
  },
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/logout',
    component: LogoutPage
  },
  {
    path: '/profile',
    component: ProfilePage
  },
]

export const router = createRouter({
  routes, 
  history: createWebHistory()
})