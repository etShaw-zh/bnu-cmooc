<template>
    <el-row>
        <el-col :span="20">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
                <el-menu-item index="1">Processing Center</el-menu-item>
                <el-sub-menu index="2">
                    <template #title>Workspace</template>
                    <el-menu-item index="2-1">item one</el-menu-item>
                    <el-menu-item index="2-2">item two</el-menu-item>
                    <el-menu-item index="2-3">item three</el-menu-item>
                    <el-sub-menu index="2-4">
                        <template #title>item four</template>
                        <el-menu-item index="2-4-1">item one</el-menu-item>
                        <el-menu-item index="2-4-2">item two</el-menu-item>
                        <el-menu-item index="2-4-3">item three</el-menu-item>
                    </el-sub-menu>
                </el-sub-menu>
                <el-menu-item index="3" disabled>Info</el-menu-item>
                <el-menu-item index="4">Orders</el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="4">
            <el-button mb-2 @click="toggle">Switch Language</el-button>
        </el-col>
    </el-row>
</template>
    
<script>
import { ref, computed } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

export default {
    name: 'headerView',
    setup() {
        // 语言切换
        const language = ref('zh-cn')
        // const language = ref('en')
        const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))
        const activeIndex = ref('1')
        return {
            language,
            locale,
            activeIndex
        };
    },

    methods: {
        close(key, keyPath) {
            console.log(key, keyPath)
        },
        toggle() {
            this.language = this.language === 'zh-cn' ? 'en' : 'zh-cn';
            console.log(this.language)
        }
    }

}

</script>
    
<style></style>
    