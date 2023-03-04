import { createApp } from 'vue'
import App from '../view/content.vue'
// import {ElButton, ElRow, ElCol } from 'element-plus'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
// app.use(ElButton)
// app.use(ElRow)
// app.use(ElCol)
app.use(ElementPlus)
app.mount('#app')



console.log('hello world content todo something~')

