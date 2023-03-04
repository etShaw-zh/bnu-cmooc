<template>
  <el-tabs :tab-position="tabPosition" class="demo-tabs">
    <el-tab-pane label="User">User</el-tab-pane>
    <el-tab-pane label="Content">

        <div>
          <el-button mb-2 @click="toggle">Switch Language</el-button>
          <br />

          <el-config-provider :locale="locale">
            <el-table mb-1 :data="[]" />
            <el-pagination :total="100" />
          </el-config-provider>
          <br />
        </div>

        <div style="border: 1px solid #ccc">
          <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
            :mode="mode" />
          <Editor style="height: 400px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig"
            :mode="mode" @onCreated="handleCreated" />
        </div>
        <el-divider></el-divider>
        <div>
          <h1>Hello {{ msg }}</h1>
          <el-row>
            <el-col :span="4">
              <div class="grid-content ep-bg-purple" />
            </el-col>
            <el-col :span="4">
              <div class="grid-content ep-bg-purple-light" />
            </el-col>
            <el-col :span="4">
              <div class="grid-content ep-bg-purple" />
            </el-col>
            <el-col :span="4">
              <div class="grid-content ep-bg-purple-light" />
            </el-col>
            <el-col :span="4">
              <div class="grid-content ep-bg-purple" />
            </el-col>
            <el-col :span="4">
              <div class="grid-content ep-bg-purple-light" /><el-button type="primary" @click="close">提交</el-button>
            </el-col>
          </el-row>
        </div>

    </el-tab-pane>
    <el-tab-pane label="Role">Role</el-tab-pane>
    <el-tab-pane label="Task">Task</el-tab-pane>
  </el-tabs>
</template>
  
<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { i18nChangeLanguage } from '@wangeditor/editor'

import { computed, onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'



export default {
  components: { Editor, Toolbar },
  name: 'contentView',
  setup() {

    // 语言切换
    const language = ref('zh-cn')
    // const language = ref('en')
    const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))

    // 切换语言 - 'en' 或者 'zh-CN'
    i18nChangeLanguage(language.value === 'zh-cn' ? 'zh-CN' : 'en')

    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()

    // 内容 HTML
    const valueHtml = ref('<p>hello</p>')

    // 模拟 ajax 异步获取内容
    onMounted(() => {
      setTimeout(() => {
        valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
      }, 1500)
    })

    const toolbarConfig = {}
    toolbarConfig.excludeKeys = [
      'fullScreen',
    ]
    const editorConfig = { placeholder: '请输入内容...' }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })

    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }

    const msg = ref('click close button ~~~')

    const tabPosition = ref('left')

    return {
      editorRef,
      valueHtml,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
      msg,
      language,
      locale,
      tabPosition
    };
  },

  methods: {
    close() {
      this.msg = this.valueHtml
    },
    toggle() {
      this.language = this.language === 'zh-cn' ? 'en' : 'zh-cn';
      // 切换语言 - 'en' 或者 'zh-CN'
      i18nChangeLanguage(this.language === 'zh-cn' ? 'zh-CN' : 'en')
      this.editorRef = shallowRef()
      console.log(this.language)
    }
  }

}

</script>
  
<style></style>
  