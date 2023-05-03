import { createApp } from 'vue'
import App from '../view/myperformance.vue'
import { ElTable, ElLink, ElRow, ElAvatar, ElDivider } from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElTable, ElLink, ElRow, ElAvatar, ElDivider)
app.mount('#cmooc-my-performance')