import './assets/fileUpload.scss'
import './assets/loading.scss'
import axios from "axios"


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

const app = createApp(App)
  .use(router)
  .use(vuetify)
app.config.globalProperties.axios = axios
app.mount('#app')
