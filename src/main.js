import { createApp } from 'vue'
import App from './App.vue'
import { swapi } from './plugins/http'

createApp(App).provide('swapi', swapi).mount('#app')
