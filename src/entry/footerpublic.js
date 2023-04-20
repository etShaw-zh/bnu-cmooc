import { createApp } from 'vue'
import App from '../view/footerpublic.vue'
import { ElDialog, ElImage, ElButton } from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElDialog, ElImage, ElButton)
app.mount('#footer-public')