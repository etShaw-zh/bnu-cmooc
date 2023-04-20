<template>
    <el-card>
        <div class="card-header">
            <h3 style="text-align: center;">
                主题广场
                <el-tooltip class="box-item" effect="dark" content="你可以在主题广场选择感兴趣的主题关注学习。" placement="bottom-start">
                    <el-icon size="18" style="margin-left: 5px;">
                        <InfoFilled />
                    </el-icon>
                </el-tooltip>
            </h3>
        </div>
        <div v-if="myThemes.length > 0">
            <!-- <el-divider content-position="left">我关注的主题</el-divider> -->
            <el-alert style="margin-bottom: 20px; margin-top: 20px;" title="我关注的主题" type="success" effect="dark"
                :closable="false" description="下方展示你关注的主题~" />
            <div style="padding-left: 40px;">
                <el-space direction="horizontal" alignment="start" :size="size">
                    <el-space wrap :size="size">
                        <el-card v-for="(item, index) in myThemes" :key="index" class="box-card" style="width: 360px">
                            <template #header>
                                <div class="card-header">
                                    <el-link :href="item.guid" target="_blank" type="primary">{{ item.title }}</el-link>
                                </div>
                            </template>
                            <div class="text item">
                                <div
                                    style="color: gray;  display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;">
                                    {{ item.content }}</div>
                            </div>
                            <el-row :gutter="20">
                                <el-col :span="24">
                                    <div style="color:gray; margin-top: 30px;">
                                        <el-icon>
                                            <StarFilled />
                                        </el-icon>
                                        <span style="font-size: small; margin-left: 5px; margin-bottom: 2px;">{{
                                            item.follows }}
                                            人关注</span>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-space>
                </el-space>
            </div>
        </div>

        <!-- <el-divider class="margin-top-10" content-position="left">所有主题</el-divider> -->
        <el-alert style="margin-bottom: 20px; margin-top: 20px;" title="所有主题" type="success" effect="dark" :closable="false"
            description="下方展示本期课程所有主题~" />
        <!-- vertical -->
        <div style="padding-left: 40px;">
            <el-space direction="horizontal" alignment="start" :size="size">
                <el-space wrap :size="size">
                    <el-card v-for="(item, index) in themes" :key="index" class="box-card" style="width: 360px">
                        <template #header>
                            <div class="card-header">
                                <el-link :href="item.guid" target="_blank" type="primary">{{ item.title }}</el-link>
                            </div>
                        </template>
                        <div class="text item">
                            <div
                                style="color: gray; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;">
                                {{ item.content }}</div>
                        </div>
                        <el-row :gutter="20" justify="start">
                            <el-col :span="24">
                                <div style="margin-top: 30px;">
                                    <el-button v-if="item.videoUrl" type="primary" size="small"
                                        @click="showThemeVideo(item.videoUrl)">视频介绍</el-button>
                                    <el-button v-if="!item.isFollowed" size="small" type="primary"
                                        @click="followTheme(index)">关注
                                    </el-button>
                                    <el-button v-else size="small" type="primary" @click="followTheme(index)">取消关注
                                    </el-button>
                                    <span style="color:gray; font-size: small; margin-left: 5px; margin-bottom: 2px;">{{
                                        item.follows }}
                                        人关注</span>
                                </div>
                            </el-col>
                        </el-row>
                        <!-- <el-row :gutter="20" justify="end">
                            <el-col :span="8">
                                <div style="width: 100%; height: 75px;">
                                    <el-tooltip class="box-item" effect="dark" content="过去1个月的活动情况" placement="bottom">
                                        <div style="display: none;">
                                            <div :id="item.chatId" style="width: 100%; height: 75px;"></div>
                                        </div>
                                    </el-tooltip>
                                </div>
                                <div style="color:gray; position: absolute; bottom: 10px;">
                                    <el-icon size="12">
                                        <StarFilled />
                                    </el-icon>
                                    <span style="font-size: small; margin-left: 5px; margin-bottom: 2px;">{{ item.follows }}
                                        人关注</span>
                                </div>
                            </el-col>
                            <el-col :span="6"></el-col>
                            <el-col :span="10">
                                <div style="float: right; position: absolute; bottom: 10px;">
                                    <el-button style="vertical-align: middle; text-align: center;" v-if="item.videoUrl"
                                        type="primary" size="small" @click="showThemeVideo(item.videoUrl)">视频介绍</el-button>
                                    <el-tooltip class="box-item" effect="dark" content="关注" placement="bottom"
                                        v-if="!item.isFollowed">
                                        <el-button size="small" circle @click="followTheme(index)">
                                            <el-icon>
                                                <Star />
                                            </el-icon>
                                        </el-button>
                                    </el-tooltip>
                                    <el-tooltip class="box-item" effect="dark" content="取消关注" placement="bottom" v-else>
                                        <el-button style="vertical-align: middle; text-align: center;" type="success"
                                            size="small" circle @click="followTheme(index)">
                                            <el-icon>
                                                <StarFilled />
                                            </el-icon>
                                        </el-button>
                                    </el-tooltip>
                                </div>
                            </el-col>
                        </el-row> -->
                    </el-card>
                </el-space>
            </el-space>
        </div>

        <!-- <el-divider class="margin-top-10" content-position="left">主题动态</el-divider> -->
        <el-alert style="margin-bottom: 20px; margin-top: 20px;" title="主题动态" type="success" effect="dark" :closable="false"
            description="下方展示本期课程近期主题动态~" />
        <div style="padding-left: 40px;">
            <el-timeline>
                <el-timeline-item v-for="(activity, index) in themeAactivities" :key="index" :icon="activity.icon"
                    :type="activity.type" :color="activity.color" :size="activity.size" :hollow="activity.hollow"
                    :timestamp="activity.timestamp">
                    <el-avatar size="small" :src="activity.userAvatarUrl" @error="true">
                        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                    </el-avatar>
                    <span style="margin-left: 10px;" v-html="activity.content"></span>
                </el-timeline-item>
            </el-timeline>
        </div>
    </el-card>

    <el-dialog v-model="videoDialogVisible" title="主题介绍视频" width="700px" destroy-on-close center>
        <div style="width: 100%; height: 400px; text-align: center; vertical-align: middle;">
            <video :src="currentVideoUrl" controls="controls" autoplay muted></video>
        </div>
        <template #footer>
            <span>
                <el-button size="small" type="primary" @click="videoDialogVisible = false">关闭视频</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { forEach } from 'lodash'

import * as echarts from 'echarts/core';
import { GridComponent, VisualMapComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
// import { MoreFilled } from '@element-plus/icons-vue'

echarts.use([
    GridComponent,
    VisualMapComponent,
    LineChart,
    CanvasRenderer,
    UniversalTransition
]);

export default {
    name: 'App',
    data() {
        return {
            baseUrl: 'https://cmooc.bnu.edu.cn/wp-admin/admin-ajax.php?action=',
            userId: -1,
            themes: [],
            myThemes: [],
            size: 10,
            themeAactivities: [],
            videoDialogVisible: false,
            currentVideoUrl: '',
        }
    },
    mounted() {
        this.getThemes()
    },
    watch: {
        themes: {
            handler: function () {
                this.myThemes = this.themes.filter((d) => d.isFollowed)
            },
            deep: true,
        },
    },
    methods: {
        showThemeVideo(url) {
            this.videoDialogVisible = true
            this.currentVideoUrl = url
        },
        getThemes() {
            fetch(this.baseUrl + 'cmooc_homepage_theme')
                .then(res => res.json())
                .then(data => {
                    if (data.code === 200) {
                        this.themes = data.data.themes
                        this.userId = data.data.current_user_id
                        this.themeAactivities = data.data.theme_activities
                    }
                }).then(() => {
                    forEach(this.themes, (d) => {
                        console.log(d.chatId)
                        // this.drawChat(d.chatId, d.activityLine)
                    })
                })
        },
        drawChat(chatId, activityLine) {
            const chart = echarts.init(document.getElementById(chatId));
            const option = {
                visualMap: [
                    {
                        show: false,
                        type: 'continuous',
                    }
                ],
                grid: [
                    {
                        bottom: '50%'
                    },
                    {
                        top: '20%'
                    }
                ],
                xAxis: [
                    {
                        show: false,
                        data: activityLine.time
                    }
                ],
                yAxis: [
                    {
                        show: false
                    }
                ],
                series: [
                    {
                        type: 'line',
                        showSymbol: false,
                        data: activityLine.count
                    }
                ]
            };
            chart.setOption(option);
        },
        // handleClickFollowTheme(index) {
        //     this.themes[index].follows = this.themes[index].isFollowed ? this.themes[index].follows - 1 : this.themes[index].follows + 1
        //     this.themes[index].isFollowed = !this.themes[index].isFollowed
        // },
        followTheme(index) {
            fetch(this.baseUrl + 'cmooc_follow_theme&theme_id=' + this.themes[index].themeId)
                .then(res => res.json())
                .then(data => {
                    if (data.code === 200) {
                        this.themes[index].follows = this.themes[index].isFollowed ? this.themes[index].follows - 1 : this.themes[index].follows + 1
                        this.themes[index].isFollowed = !this.themes[index].isFollowed
                    }
                })
        },
    },
    setup() {
        return {
        }
    },
}
</script>

<style scoped>
.margin-top-10 {
    margin-top: 50px;
}

.text {
    color: #606266;
    font-size: 14px;
    line-height: 20px;
    overflow: hidden;
}

.item {
    height: 50px;
}
</style>