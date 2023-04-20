<template>
    <el-table :data="activitiesTable">
        <el-table-column prop="user" label="昵称" width="120">
            <template #default="{ row }">
                <el-link type="primary" :underline="false" :href="row.userUrl" target="_blank">{{ row.userDisplayName }}</el-link>
            </template>
        </el-table-column>
        <el-table-column prop="type" label="行为" width="120"></el-table-column>
        <el-table-column prop="toUser" label="昵称" width="120">
            <template #default="{ row }">
                <el-link type="primary" :underline="false" :href="row.toUserUrl" target="_blank">{{ row.toUserDisplayName }}</el-link>
            </template>
        </el-table-column>
        <el-table-column prop="msgDate" label="时间" width="120"></el-table-column>
        <el-table-column prop="content" label="内容">
            <template #default="{ row }">
                <el-link v-if="row.content" type="primary" :underline="false" :href="row.contentUrl" target="_blank">{{ row.content }}</el-link>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination style="margin-top: 20px;" background layout="prev, pager, next" v-model:current-page="currentActivityPage"
        :total="activitiesTotal" @current-change="handleCurrentChange" />
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            baseUrl: "https://cmooc.bnu.edu.cn/wp-admin/admin-ajax.php?action=",
            activitiesTable: [],
            currentActivityPage: 1,
            activitiesTotal: 0,
        }
    },
    mounted() {
        this.getActivitiesList();
    },
    methods: {
        getActivitiesList() {
            var url = this.baseUrl + 'get_activities_list_at_user_page' + '&page=' + this.currentActivityPage;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.code == 200) {
                        this.activitiesTable = data.data.activities_table;
                        this.activitiesTotal = data.data.activities_total;
                    }
                })
        },
        handleCurrentChange(val) {
            this.currentActivityPage = val;
            this.getActivitiesList();
        },
    },
    computed: {
    },
    setup() {
    },
}

</script>