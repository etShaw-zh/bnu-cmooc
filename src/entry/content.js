import { createApp } from 'vue'
import App from '../view/content.vue'
import { ElTabPane, ElButton, ElPagination, ElDivider } from 'element-plus'
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElButton)
app.use(ElTabPane)
app.use(ElPagination)
app.use(ElDivider)
app.mount('#app')



console.log('hello world content todo something~')

