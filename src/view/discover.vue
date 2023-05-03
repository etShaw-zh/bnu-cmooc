<template>
    <el-tabs v-model="discoverActiveName" @tab-change="discoverTabChange">
        <el-tab-pane label="我关注的动态" name="我关注的动态">
            <el-card style="padding: 10px;">
                <div style="margin-bottom: 20px;">
                    <el-alert title="我和我关注的学习伙伴最近60天的动态" type="success" :closable="false" effect="dark"
                        style="background-color: rgb(23, 124, 176) !important; margin-bottom: 10px;" />
                    <el-table :data="myFollowEventTable" style="width: 100%">
                        <el-table-column prop="userId" label="学习者" width="120">
                            <template #default="{ row }">
                                <el-link type="primary" :href="row.userUrl" target="_blank" :underline="false">
                                    {{ row.userName }}
                                </el-link>
                            </template>
                        </el-table-column>
                        <el-table-column prop="eventDate" label="日期" width="120" />
                        <el-table-column prop="eventType" label="行为" width="90" />
                        <el-table-column prop="toUserId" label="学习者" width="120">
                            <template #default="{ row }">
                                <el-link type="primary" :href="row.toUserUrl" target="_blank" :underline="false">
                                    {{ row.toUserName }}
                                </el-link>
                            </template>
                        </el-table-column>
                        <el-table-column prop="contentTitle" label="标题">
                            <template #default="{ row }">
                                <el-link type="primary" :href="row.contentUrl" target="_blank" :underline="false">
                                    {{ row.contentTitle }}
                                </el-link>
                            </template>
                        </el-table-column>
                        <el-table-column prop="content" label="内容" />
                    </el-table>
                    <div style="margin-top: 20px;">
                        <el-pagination background layout="prev, pager, next" v-model:current-page="currentEventPage"
                            :total="eventTotal" @current-change="handleCurrentEventPageChange" />
                    </div>
                </div>
                <el-divider></el-divider>
                <div v-if="isShow" style="margin-bottom: 20px;">
                    <el-alert title="学习伙伴推荐" type="success" :closable="false" effect="dark"
                        description="基于“关注网络”的学习伙伴推荐，每天更新一次！"
                        style="background-color: rgb(23, 124, 176) !important; margin-bottom: 10px;" />
                    <el-table :data="recommendUserTable.recommendUserList" height="auto" style="width: 100%">
                        <el-table-column prop="recommendCat" align="right" label="" width="220">
                            <template #default="scope">
                                <el-tag size="large">{{ scope.row.recommendCat }}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="recommendUser" label="">
                            <template #default="scope">
                                <el-popover :width="200" style="margin-right: 10px" v-for="u in scope.row.recommendUser"
                                    :key="u.id" size="small">
                                    <template #reference>
                                        <a :href="u.url" target="_blank">
                                            <el-avatar :src="u.avatarUrl" style="margin-right: 10px" @error="true">
                                                <img
                                                    src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                                            </el-avatar>
                                        </a>
                                    </template>
                                    <template #default>
                                        <div style="display: flex; gap: 16px; flex-direction: column">
                                            <el-avatar :src="u.avatarUrl" style="margin-bottom: 8px" />
                                            <el-row :gutter="20">
                                                <el-col :span="24">
                                                    <span>{{ u.name }}</span>
                                                </el-col>
                                                <!-- <el-col :span="12">
                                                            <el-button v-if="!u.isFollowed" type="primary" size="small"
                                                                @click="followUser(u.userId)"> 关注 </el-button>
                                                            <el-button v-else type="info" size="small"
                                                                @click="unFollowUser(u.userId)"> 取消关注 </el-button>
                                                        </el-col> -->
                                            </el-row>
                                            <el-row :gutter="20">
                                                <el-col :span="12">
                                                    <el-tag class="ml-2" type="info">
                                                        粉丝数：{{ u.fans }}
                                                    </el-tag>
                                                </el-col>
                                                <el-col :span="12">
                                                    <el-tag class="ml-2" type="info">
                                                        关注数：{{ u.fols }}
                                                    </el-tag>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </template>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column width="90">
                            <template #default="scope">
                                <el-button style="margin-left: 10px;" type="primary" circle
                                    @click="refreshClick(scope.$index, scope.row)">
                                    <el-icon>
                                        <Refresh />
                                    </el-icon>
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-alert title="" :description="'上次更新时间： ' + recommendUserTable.recommendTime" type="info" size="small"
                        :closable="false" style="margin-top: 5px;"></el-alert>
                </div>
            </el-card>
        </el-tab-pane>
        <el-tab-pane label="文章" name="生成内容搜索">
            <el-card style="padding: 10px;">
                <div id="cmooc-custom-search" style="margin: 10px; padding: 10px"></div>
                <el-alert v-if="searchWord != ''" :title="'关于 ' + searchWord + ' 的搜索结果'" type="success" :closable="false"
                    effect="dark" style="background-color: rgb(23, 124, 176) !important; margin-bottom: 10px;" />
                <el-table :data="contentSearchTable" style="width: 100%">
                    <el-table-column prop="postDate" label="日期" width="120" />
                    <el-table-column prop="userId" label="作者" width="180">
                        <template #default="{ row }">
                            <el-link type="primary" :href="row.userUrl" target="_blank" :underline="false">
                                {{ row.userName }}
                            </el-link>
                        </template>
                    </el-table-column>
                    <el-table-column prop="title" label="标题">
                        <template #default="{ row }">
                            <el-link type="primary" :href="row.postUrl" target="_blank" :underline="false">
                                {{ row.title }}
                            </el-link>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="margin-top: 20px;">
                    <el-pagination background layout="prev, pager, next" v-model:current-page="currentSearchPage"
                        :total="SearchTotal" @current-change="handleCurrentSearchPageChange" />
                </div>
            </el-card>
        </el-tab-pane>
        <el-tab-pane label="论坛" name="论坛">
            <el-card style="padding: 10px;">
                <el-alert title="论坛话题" type="success" :closable="false" effect="dark"
                    style="background-color: rgb(23, 124, 176) !important; margin-bottom: 10px;" />
                <el-table :data="topicTable">
                    <!-- <el-table-column prop="topicTag" label="主题" width="140">
                        <template #default="{ row }">
                            <el-tag style="margin-left: 10px;" v-for="t in row.topicTag" :key="t.id"
                                type="info" size="small"> {{ t }} </el-tag>
                        </template>
                    </el-table-column> -->
                    <el-table-column prop="topicTitle" label="标题">
                        <template #default="{ row }">
                            <el-link type="primary" :href="row.topicUrl" target="_blank" :underline="false">
                                {{ row.topicTitle }}
                            </el-link>
                            <span style="margin-left: 20px;">
                                <el-tag style="margin-left: 10px;" v-for="t in row.topicTag" :key="t.id" type="info"
                                    size="small"> {{ t }} </el-tag>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="topicUserNum" label="参与人数" width="80" sortable />
                    <el-table-column prop="topicEventNum" label="参与次数" width="80" sortable />
                    <el-table-column prop="topicMyNum" label="我参与次数" width="100" sortable />
                </el-table>
            </el-card>
        </el-tab-pane>
        <el-tab-pane label="活动" name="活动">
            <el-card style="padding: 10px;">
                <el-alert title="沙龙活动" type="success" :closable="false" effect="dark"
                    style="background-color: rgb(23, 124, 176) !important; margin-bottom: 10px;" />
                <el-table :data="salonTable">
                    <el-table-column prop="salonTag" label="类型" width="120">
                        <template #default="{ row }">
                            <el-tag style="margin-left: 10px;" :type="row.salonTag == '导学者发布' ? 'success' : 'info'"
                                size="small"> {{ row.salonTag }} </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="salonTitle" label="标题">
                        <template #default="{ row }">
                            <span style="margin-right: 10px;">
                                <el-tag style="margin-right: 10px;" :type="row.salonColor" size="small"> {{ row.salonStatus
                                }} </el-tag>
                            </span>
                            <el-link type="primary" :href="row.salonUrl" target="_blank" :underline="false">
                                {{ row.salonTitle }}
                            </el-link>
                        </template>
                    </el-table-column>
                    <el-table-column prop="salonVideoUrl" label="直播回放" width="90">
                        <template #default="{ row }">
                            <el-link v-if="row.salonVideoUrl" type="primary" :href="row.salonVideoUrl" target="_blank"
                                :underline="false">
                                <el-button type="info" size="small" round>
                                    <el-icon>
                                        <VideoCameraFilled />
                                    </el-icon>
                                </el-button>
                            </el-link>
                            <span v-else>暂无</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="margin-top: 20px;">
                    <el-pagination background layout="prev, pager, next" v-model:current-page="currentSalonPage"
                        :total="salonTotal" @current-change="handleCurrentSalonPageChange" />
                </div>
            </el-card>
        </el-tab-pane>
        <el-tab-pane label="学习伙伴" name="学习伙伴">
            <el-card style="padding: 10px;">
                <el-alert title="我的自我介绍" type="success" :closable="false" effect="dark"
                    style="background-color: rgb(23, 124, 176) !important; margin-bottom: 10px;" />
                <div style="margin-bottom: 10px;">
                    <el-row :gutter="20">
                        <el-col :span="22">
                            <el-skeleton style="width: 100%" :loading="partnerLoading" animated :count="1">
                                <template #template>
                                    <div style="padding: 14px">
                                        <el-skeleton-item variant="h3" style="width: 100%" />
                                        <div style="
                                        display: flex;
                                        align-items: center;
                                        justify-items: space-between;
                                        margin-top: 16px;
                                        height: 16px;
                                        ">
                                            <el-skeleton-item variant="text" style="margin-right: 16px" />
                                            <el-skeleton-item variant="text" style="width: 80%" />
                                        </div>
                                    </div>
                                </template>
                                <template #default>
                                    <span v-if="myIntroduction" style="margin: 10px;padding: 10px;color: gray; font-size: large;">
                                    {{ myIntroduction }}
                                </span>
                                <span v-else style="margin: 10px;padding: 10px;color: gray; font-size: large;">
                                    暂无，点击右侧编辑按钮，编辑自我介绍
                                </span>
                                </template>
                            </el-skeleton>
                        </el-col>
                        <el-col :span="2">
                            <el-link type="primary" size="large" :href="myIntroductionUrl" target="_blank" :underline="false">
                                <el-button type="primary">
                                    <el-icon>
                                        <Edit />
                                    </el-icon>
                                    编辑
                                </el-button>

                            </el-link>
                        </el-col>
                    </el-row>
                </div>
                <el-alert title="学习伙伴" type="success" :closable="false" effect="dark"
                    style="background-color: rgb(23, 124, 176) !important; margin-bottom: 10px; margin-top: 30px;" />
                <el-row :gutter="20">
                    <el-col :span="4"></el-col>
                    <el-col :span="4"></el-col>
                    <el-col :span="4"></el-col>
                    <el-col :span="4"></el-col>
                    <el-col :span="4">
                        <el-select v-model="partnerDomainSearch" class="m-2" placeholder="请输入关注的领域" style="width:100%">
                            <el-option v-for="item in partnerDomainOptions" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary" @click="handlePartnerSearch" style="width:100%">筛选</el-button>
                    </el-col>
                </el-row>
                <el-table :data="partnerTable" style="width: 100%">
                    <el-table-column prop="userName" label="昵称" width="180">
                        <template #default="{ row }">
                            <span style="text-align: center; justify-items: center;">
                                <el-avatar :src="row.userAvatar" size="small" />
                                <el-link style="margin-bottom: 15px; margin-left: 8px;" type="primary" size="small"
                                    :href="row.userUrl" target="_blank" :underline="false">
                                    {{ row.userName }}
                                </el-link>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="userDomain" label="感兴趣的领域" width="160">
                        <template #default="{ row }">
                            <el-tag type="success">{{ row.userDomain }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="userInfo" label="自我介绍">
                        <template #default="{ row }">
                            <span style="color: gray; font-size: small;">{{ row.userInfo }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="laseActionTime" label="最后登陆时间" width="120">
                        <template #default="{ row }">
                            <span style="color: gray; font-size: small;">{{ row.laseActionTime }}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="margin-top: 20px;">
                    <el-pagination background layout="prev, pager, next" v-model:current-page="currentParterPage"
                        :total="partnerTotal" @current-change="handleCurrentPartnerPageChange" />
                </div>
            </el-card>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import { ElMessage } from 'element-plus'
export default {
    name: "App",
    data() {
        return {
            baseUrl: "https://cmooc.bnu.edu.cn/wp-admin/admin-ajax.php?action=",
            // eslint-disable-next-line no-undef
            discoverActiveName: cmooc_discover.discover_active_name != 'undefined' ? cmooc_discover.discover_active_name : '生成内容搜索', // 我关注的动态
            // eslint-disable-next-line no-undef
            contentSearchTable: cmooc_discover.posts != 'undefined' ? cmooc_discover.posts : [],
            currentSearchPage: 1,
            // eslint-disable-next-line no-undef
            SearchTotal: cmooc_discover.search_total != 'undefined' ? parseInt(cmooc_discover.search_total) : 0,
            // eslint-disable-next-line no-undef
            searchWord: cmooc_discover.search_word != 'undefined' ? cmooc_discover.search_word : "",
            // eslint-disable-next-line no-undef
            isShow: cmooc_discover.current_user_id != '18' ? false : true,

            myFollowEventTable: [],
            currentEventPage: 1,
            eventTotal: 0,
            recommendUserTable: {
                recommendTime: '2023-04-27 00:00:00',
                recommendUserList: [
                    {
                        recommendCat: '与我感兴趣领域相同的人',
                        recommendUser: [],
                    },
                    {
                        recommendCat: '我关注的人还关注了他们',
                        recommendUser: [],
                    },
                    {
                        recommendCat: '我关注的人还被他们关注了',
                        recommendUser: [],
                    },
                    {
                        recommendCat: '我们经常评论或点赞相同内容',
                        recommendUser: []
                    }
                ],
            },
            topicTable: [],
            salonTable: [],
            currentSalonPage: 1,
            salonTotal: 0,
            partnerTable: [],
            currentParterPage: 1,
            partnerTotal: 0,
            partnerDomainSearch: '规律与方法研究',
            partnerDomainOptions: [
                { name: '规律与方法研究', value: '规律与方法研究' },
                { name: '技术与产品研发', value: '技术与产品研发' },
                { name: '课程与资源设计', value: '课程与资源设计' },
                { name: '政策与制度创新', value: '政策与制度创新' },
                { name: '其他', value: '其他' },
            ],
            myIntroduction: '',
            myIntroductionUrl: '',
            partnerLoading: true,
        }
    },
    mounted() {
        this.loadEvent();
    },
    methods: {
        discoverTabChange(tab) {
            if (tab == '我关注的动态') {
                this.myFollowEventTable.length == 0 && this.loadEvent();
            } else if (tab == '论坛') {
                this.topicTable.length == 0 && this.loadTopic();
            } else if (tab == '活动') {
                this.salonTable.length == 0 && this.loadSalon();
            } else if (tab == '学习伙伴') {
                this.partnerTable.length == 0 && this.loadMyIntroduction();
                this.myIntroduction == '' && this.loadPartner();
            }
        },
        refreshClick(index, row) {
            console.log(index, row)
        },
        handleCurrentSearchPageChange(val) {
            this.currentSearchPage = val;
            this.loadContentSearch();
        },
        loadContentSearch() {
            const url = this.baseUrl + "cmooc_discover_content_search" + "&page=" + this.currentSearchPage + "&searchWord=" + encodeURIComponent(this.searchWord);
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.code == 200) {
                        this.contentSearchTable = data.data
                    } else {
                        ElMessage({
                            message: data.message,
                            type: 'warning',
                        })
                    }
                })
        },
        handleCurrentEventPageChange(val) {
            this.currentEventPage = val;
            this.loadEvent();
        },
        loadEvent() {
            const url = this.baseUrl + "cmooc_discover_event_relate_current_user" + "&page=" + this.currentEventPage;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.code == 200) {
                        this.myFollowEventTable = data.data.data
                        this.eventTotal = data.data.total
                    } else {
                        ElMessage({
                            message: data.message,
                            type: 'warning',
                        })
                    }
                })
        },
        loadTopic() {
            const url = this.baseUrl + "cmooc_discover_topic";
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.code == 200) {
                        this.topicTable = data.data
                    } else {
                        ElMessage({
                            message: data.message,
                            type: 'warning',
                        })
                    }
                })
        },
        loadSalon() {
            const url = this.baseUrl + "cmooc_discover_salon" + "&page=" + this.currentSalonPage;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.code == 200) {
                        this.salonTable = data.data.salonTable
                        this.salonTotal = data.data.salonTotal
                    } else {
                        ElMessage({
                            message: data.message,
                            type: 'warning',
                        })
                    }
                })
        },
        handleCurrentSalonPageChange(val) {
            this.currentSalonPage = val;
            this.loadSalon();
        },
        handleCurrentPartnerPageChange(val) {
            this.currentParterPage = val;
            this.loadPartner();
        },
        handlePartnerSearch() {
            this.currentParterPage = 1;
            this.loadPartner();
        },
        loadPartner() {
            const url = this.baseUrl + "cmooc_discover_partner" + "&page=" + this.currentParterPage + "&domain=" + encodeURIComponent(this.partnerDomainSearch);
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.code == 200) {
                        this.partnerTable = data.data.partnerTable
                        this.partnerTotal = data.data.partnerTotal
                    } else {
                        ElMessage({
                            message: data.message,
                            type: 'warning',
                        })
                    }
                })
        },
        loadMyIntroduction(){
            const url = this.baseUrl + "cmooc_discover_my_introduction";
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.code == 200) {
                        this.myIntroduction = data.data.myIntroduction
                        this.myIntroductionUrl = data.data.myIntroductionUrl
                        this.partnerLoading = false
                    } else {
                        ElMessage({
                            message: data.message,
                            type: 'warning',
                        })
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