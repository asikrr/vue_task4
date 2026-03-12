import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

if (store.state.token) {
  store.dispatch('INIT_STORE').catch(err => console.error('Ошибка инициализации:', err));
}

createApp(App).use(store).use(router).mount('#app')