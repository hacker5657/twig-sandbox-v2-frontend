import './style.css'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'
import { createApp } from 'vue'
import { router } from './router'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip'
import { store } from './store'


createApp(App)
.use(PrimeVue)
.use(router)
.use(store)
.directive('tooltip', Tooltip)
.mount('#app')
