<template>
    <el-table :data="topicTable">
        <el-table-column prop="title" label="话题标题">
            <template #default="{ row }">
                <el-link type="primary" :underline="false" :href="row.url">{{ row.title }}</el-link>
            </template>
        </el-table-column>
        <el-table-column prop="num" label="参与次数" width="180"></el-table-column>
    </el-table>
    <el-pagination style="margin-top: 20px;" background layout="prev, pager, next" v-model:current-page="currentTopicPage"
        :total="topicTotal" @current-change="handleCurrentChange" />
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            baseUrl: "https://cmooc.bnu.edu.cn/wp-admin/admin-ajax.php?action=",
            topicTable: [],
            currentTopicPage: 1,
            topicTotal: 0,
        }
    },
    mounted() {
        this.getTopicList();
    },
    methods: {
        getTopicList() {
            var url = this.baseUrl + 'get_topic_list_at_user_page' + '&page=' + this.currentTopicPage;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.code == 200) {
                        this.topicTable = data.data.topic_table;
                        this.topicTotal = data.data.topic_total;
                    }
                })
        },
        handleCurrentChange(val) {
            this.currentTopicPage = val;
            this.getTopicList();
        },
    },
    computed: {
    },
    setup() {
    },
}

</script>