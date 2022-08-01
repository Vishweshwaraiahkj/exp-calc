import { createApp } from 'vue'
import App from '@/App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '@/registerServiceWorker'
import router from '@/router'
import store from '@/store'
import '@/utils/prototypes'

// Set base URL
axios.defaults.baseURL = 'http://localhost:3000'

const app = createApp(App)
app.use(VueAxios, axios)
app.use(store)
app.use(router)
app.mount('#app')
