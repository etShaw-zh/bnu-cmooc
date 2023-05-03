<template>
    <div style='height: 50px; padding-top: 10px;'>
        <el-button-group>
            <a href='javascript:history.back()'>
                <el-button size='small' type='info'>后&nbsp;&nbsp;&nbsp;退</el-button>
            </a>
            <a style='margin-left: 10px;' href='javascript:history.forward()'>
                <el-button size='small' type='info'>前&nbsp;&nbsp;&nbsp;进</el-button>
            </a>
        </el-button-group>
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {}
    },
    mounted() {
    },
    methods: {
    },
    computed: {
    },
    setup() {
    },
}

</script>