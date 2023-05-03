<template>
    <el-row :gutter="20">
        <el-col :span="24">
            <div style="text-align: center; color: black; font-size: 16px; font-weight: bolder; margin-bottom: 20px;">搜索一下
            </div>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="20">
            <el-autocomplete style="width: 100%;" v-model="state" :fetch-suggestions="querySearchAsync" placeholder="请输入..."
                @select="handleSelect" />
        </el-col>
        <el-col :span="4">
            <el-button style="margin-left: 10px;" type="primary" circle @click="searchClick()">
                <el-icon>
                    <Search />
                </el-icon>
            </el-button>
        </el-col>
    </el-row>
</template>
  
<script>
import { ElMessage } from 'element-plus'

export default {
    name: "App",
    data() {
        return {
            baseUrl: "https://cmooc.bnu.edu.cn/explore/?search=",
            recommendBaseUrl: "https://cmooc.bnu.edu.cn/wp-admin/admin-ajax.php?action=",
            state: "",
            links: [],
        }
    },
    mounted() {
        this.loadQuery();
    },
    methods: {
        loadQuery() {
            const url = this.recommendBaseUrl + 'cmooc_search_word_recommend';
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.code == 200) {
                        this.links = data.data
                    } else {
                        this.links = [
                            { value: '互联网+教育' },
                            { value: '新知识观' },
                            { value: '联通主义', },
                            { value: '教育数字化转型' },
                        ];
                    }
                })
        },
        querySearchAsync(queryString, cb) {
            const results = queryString
                ? this.links.filter(this.createFilter(queryString))
                : this.links;
            console.log(results);
            cb(results);
        },
        createFilter(queryString) {
            return (link) => {
                return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        handleSelect(item) {
            console.log(item);
        },
        searchClick() {
            if (this.state == "") {
                ElMessage({
                    message: '请输入搜索词！',
                    type: 'warning',
                })
                return
            }
            const url = this.baseUrl + encodeURIComponent(this.state);
            // window.open(url);
            window.location.href = url;
        },
    },
    computed: {
    },
    setup() {
    },
}

</script>