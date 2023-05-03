
<template>
    <el-table :data="themesTable">
        <el-table-column prop="title" label="主题标题">
            <template #default="{ row }">
                <el-link type="primary" :underline="false" :href="row.url">{{ row.title }}</el-link>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            baseUrl: "https://cmooc.bnu.edu.cn/wp-admin/admin-ajax.php?action=",
            themesTable: [],
        }
    },
    mounted() {
        this.getThemesList();
    },
    methods: {
        getThemesList() {
            var url = this.baseUrl + 'get_themes_list_at_user_page';
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.code == 200) {
                        this.themesTable = data.data;
                    }
                })
        },
    },
    computed: {
    },
    setup() {
    },
}

</script>