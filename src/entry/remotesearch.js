import { createApp } from 'vue'
import App from '../view/remotesearch.vue'
// import ElementPlus from 'element-plus'
import { ElRow, ElCol, ElButton, ElLink, ElAutocomplete, ElIcon } from 'element-plus'
import 'element-plus/dist/index.css'
import { Search } from '@element-plus/icons-vue'

const app = createApp(App)
app.use(ElRow, ElCol, ElButton, ElLink, ElAutocomplete, ElIcon)
app.component(Search.name, Search)
app.mount('#cmooc-custom-search')