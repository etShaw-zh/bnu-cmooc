import { createApp } from 'vue'
import App from '../view/followthemes.vue'
import { ElTable, ElLink } from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElTable, ElLink)
app.mount('#follow-themes-list')