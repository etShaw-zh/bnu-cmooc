import { createApp } from 'vue'
import App from '../view/discover.vue'
import { ElTable, ElLink, ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'
import { Refresh, VideoCameraFilled, Edit } from '@element-plus/icons-vue'

const app = createApp(App)
app.use(ElTable, ElLink, ElMessage)
app.component(Refresh.name, Refresh)
app.component(VideoCameraFilled.name, VideoCameraFilled)
app.component(Edit.name, Edit)
app.mount('#cmooc-discover')