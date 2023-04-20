<template>
    <el-card>
        <div class="card-header">
            <h3 style="text-align: center;">
                主题学习：{{ themeName }}
                <el-tooltip class="box-item" effect="dark" content="你可以在主题学习页面参加话题讨论、沙龙研讨，也可以查看当前主题的最新动态。"
                    placement="bottom-start">
                    <el-icon size="18" style="margin-left: 5px;">
                        <InfoFilled />
                    </el-icon>
                </el-tooltip>
            </h3>
        </div>
        <div style="margin: 10px 20px;">
            <el-tabs v-model="activeName" tab-position="top" @tab-change="handleClick">
                <el-tab-pane v-if="isTeacherOrOperator" label="主题管理" name="theremManage">
                    <el-card class="box-card">
                        <div class="card-header">
                            <span style="font-weight: bold;">主题管理</span>
                        </div>
                        <div class="mat-10">
                            <div v-if="isManeger" style="margin-bottom: 20px;">
                                <el-alert title="管理运营教师和同学" type="success" effect="dark" :closable="false"
                                    description="下方展示当前主题的运营教师和同学~" />
                                <br>
                                <el-table :data="teacherAndOperator">
                                    <el-table-column prop="userId" label="ID" />
                                    <el-table-column prop="name" label="昵称" />
                                    <el-table-column prop="role" label="类型" />
                                    <el-table-column fixed="right" label="操作" width="120">
                                        <template #default="scope">
                                            <el-button type="warning"
                                                @click.prevent="onDeleteTeacherOrOperator(scope.$index)">
                                                删除
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div style="margin-top: 10px; margin-bottom: 10px;">
                                    <el-row :gutter="20" style="margin-bottom: 10px;">
                                        <el-col :span="24">
                                            <el-alert title="添加运营教师和同学" type="info" :closable="false" description="1.输入运营教师和同学的user_id，
                                                            2.查询昵称确认，
                                                            3.选择角色，
                                                            4.点击添加完成~" />
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="20" style="margin-bottom: 10px;">
                                        <el-col :span="12">
                                            <el-input v-model="teacherOrOperatorUserId" placeholder="请输入ID" />
                                        </el-col>
                                        <el-col :span="12">
                                            <el-button type="primary" style="width: 100%;"
                                                @click="onSearchTeacherOrOperatorByUserId()">
                                                搜索</el-button>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="20" style="margin-bottom: 10px;">
                                        <el-col :span="6">
                                            <el-input v-model="teacherOrOperatorUserId" disabled />
                                        </el-col>
                                        <el-col :span="6">
                                            <el-input v-model="teacherOrOperatorUserDisplayName" disabled />
                                        </el-col>
                                        <el-col :span="12">
                                            <el-select style="width: 100%;" v-model="teacherOrOperatorRole"
                                                placeholder="请选择类型">
                                                <el-option label="教师" value="教师" />
                                                <el-option label="运营" value="运营" />
                                            </el-select>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="20" style="margin-bottom: 10px;">
                                        <el-col :span="24">
                                            <el-button type="primary" class="mt-4" style="width: 100%"
                                                @click="onAddTeacherOrOperator()">添加</el-button>
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>

                            <div style="margin-bottom: 20px;">
                                <el-alert title="论坛话题" type="success" effect="dark" :closable="false"
                                    description="你可以在下方添加或删除当前主题的论坛话题~" />
                                <br>
                                <el-table :data="forumTable">
                                    <el-table-column prop="name" label="标题">
                                        <template #default="{ row }">
                                            <el-link type="success" :href="row.address">{{ row.name
                                            }}</el-link>
                                        </template>
                                    </el-table-column>
                                    <el-table-column fixed="right" label="操作" width="120">
                                        <template #default="scope">
                                            <el-button type="warning" @click.prevent="onDeleteForum(scope.$index)">
                                                删除
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div style="margin-top: 10px; margin-bottom: 10px;">
                                    <el-select v-model="tearcherOrOperatorSelectTopic" multiple placeholder="请选择要添加的话题"
                                        style="width: 100%;">
                                        <el-option v-for="item in tearcherOrOperatorSelectTopicOpitons" :key="item.value"
                                            :label="item.label" :value="item.value" style="width: 100%;" />
                                    </el-select>
                                    <el-button type="primary" style="width: 100%; margin-top: 10px;"
                                        @click="onAddFourm()">添加话题</el-button>
                                </div>
                            </div>

                            <div v-if="isTeacherOrOperator" style="margin-bottom: 20px;">
                                <el-alert title="沙龙活动" type="success" effect="dark" :closable="false"
                                    description="你可以在下方添加或删除当前主题的沙龙活动~" />
                                <br>
                                <el-table :data="activityList">
                                    <el-table-column prop="name" label="标题">
                                        <template #default="{ row }">
                                            <el-link type="success" :underline="false" :href="row.address">{{ row.title
                                            }}</el-link>
                                        </template>
                                    </el-table-column>
                                    <el-table-column fixed="right" label="操作" width="120">
                                        <template #default="scope">
                                            <el-button type="warning" @click.prevent="onDeleteActivity(scope.$index)">
                                                删除
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div style="margin-top: 10px; margin-bottom: 10px;">
                                    <el-select v-model="tearcherOrOperatorSelectSalon" multiple placeholder="请选择要添加的沙龙活动"
                                        style="width: 100%;">
                                        <el-option v-for="item in tearcherOrOperatorSelectSalonOpitons" :key="item.value"
                                            :label="item.label" :value="item.value" style="width: 100%;" />
                                    </el-select>
                                    <el-button type="primary" style="width: 100%; margin-top: 10px;"
                                        @click="onAddActivity()">添加沙龙活动</el-button>
                                </div>
                            </div>


                            <div v-if="isTeacherOrOperator" style="margin-bottom: 20px;">
                                <el-alert title="主题标签" type="success" effect="dark" :closable="false"
                                    description="你可以在下方添加或删除当前主题的标签~" />
                                <br>
                                <el-table :data="tagTable">
                                    <el-table-column prop="name" label="标签名称" />
                                    <el-table-column fixed="right" label="操作" width="120">
                                        <template #default="scope">
                                            <el-button type="warning" @click.prevent="onDeleteTag(scope.$index)">
                                                删除
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div style="margin-top: 10px; margin-bottom: 10px;">
                                    <el-alert title="添加主题标签选项" type="info" :closable="false" description="" />
                                    <el-input v-model="inputTag" placeholder="请输入标签名"
                                        style="width: 100%; margin-top: 10px;" />
                                    <el-button type="primary" style="width: 100%; margin-top: 10px;"
                                        @click="onAddTag()">添加标签</el-button>
                                </div>
                            </div>

                            <div v-if="isTeacherOrOperator" style="margin-bottom: 20px;">
                                <el-alert title="编辑主题概述" type="success" effect="dark" :closable="false"
                                    description="你可以在点击下方按钮编辑主题概述~" />
                                <div style="margin-top: 10px; margin-bottom: 10px;">
                                    <a :href="editUrl" target="_blank" style="text-decoration:none;"><el-button
                                            type="primary" style="width: 100%; margin-top: 10px;">编辑主题概述</el-button></a>
                                </div>
                            </div>

                        </div>
                    </el-card>
                </el-tab-pane>
                <el-tab-pane label="主题概述" name="overview">
                    <el-card class="box-card">
                        <!-- <div class="card-header">
                        <span style="font-weight: bold;">主题概述</span>
                    </div> -->
                        <div class="mat-10">
                            <el-alert title="主题概述" type="success" effect="dark" :closable="false"
                                description="下方展示当前主题的介绍~" />
                            <br>
                            <!-- <el-space direction="horizontal" alignment="center" size="small">
                            <el-space wrap size="default">
                                <el-row class="row-bg" justify="space-between">
                                    <el-col :span="12">
                                        <el-card class="box-card" size="small">
                                            <template #header>
                                                <div class="card-header">
                                                    <span>视频</span>
                                                </div>
                                            </template>
                                            <div style="width: 500px; height: 300px;">
                                                <video src="https://cmooc.bnu.edu.cn/wp-content/uploads/2023/04/11960a732362431.mp4"
                                                    controls="controls"></video>
                                            </div>
                                        </el-card>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-card class="box-card" size="small">
                                            <template #header>
                                                <div class="card-header">
                                                    <span>介绍</span>
                                                </div>
                                            </template>
                                            <div style="width: 500px; height: 300px;">
                                                这事介绍 这事介绍 
                                            </div>
                                        </el-card>
                                    </el-col>
                                </el-row>
                            </el-space>
                        </el-space> -->
                            <div v-html="overview"></div>
                        </div>
                    </el-card>
                </el-tab-pane>
                <el-tab-pane label="论坛话题" name="forum">
                    <el-card class="box-card">
                        <!-- <div class="card-header">
                        <span style="font-weight: bold;">论坛话题</span>
                    </div> -->
                        <div class="mat-10">
                            <el-alert title="论坛话题" type="success" effect="dark" :closable="false"
                                description="下方展示当前主题的论坛话题列表~" />
                            <br>
                            <el-table :data="forumTable" border style="width: 100%">
                                <el-table-column fixed="right" prop="address" label="">
                                    <template #default="{ row }">
                                        <el-link type="primary" :href="row.address" target="_blank">{{
                                            row.name }}</el-link>
                                        <br>
                                        <div style="margin-top: 10px;">
                                            <el-tag class="ml-2" type="info" size="small">{{ row.userCount }}人参与</el-tag>
                                            <el-divider direction="vertical"></el-divider>
                                            <el-tag class="ml-2" type="info" size="small">{{ row.clickCount }}人点击</el-tag>
                                            <el-divider direction="vertical"></el-divider>
                                            最后回复：<el-link size="small" type="primary" :href="row.lastReplyUserAddress"
                                                target="_blank" :underline="false">{{ row.lastReplyUserName }}</el-link>
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-card>
                </el-tab-pane>
                <el-tab-pane label="沙龙活动" name="activity">
                    <el-card class="box-card">
                        <!-- <div class="card-header">
                        <span style="font-weight: bold;">沙龙活动</span>
                    </div> -->
                        <div class="mat-10">
                            <el-alert title="沙龙活动" type="success" effect="dark" :closable="false"
                                description="下方展示当前主题的沙龙活动列表~" />
                            <br>
                            <!-- :default-expand-all="true" -->
                            <el-table :data="activityList" border style="width: 100%">
                                <el-table-column type="expand">
                                    <template #default="props">
                                        <div m="4" style="margin-left: 20px;">
                                            <div v-html="props.row.content"></div>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="date" label="" width="180" />
                                <el-table-column prop="title" label="">
                                    <template #default="{ row }">
                                        <el-link type="primary" :href="row.address" target="_blank" :underline="false">{{
                                            row.title
                                        }}</el-link>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-card>
                </el-tab-pane>
                <el-tab-pane label="知识寻径" name="wayfinding">
                    <el-card class="box-card">
                        <!-- <div class="card-header">
                        <span style="font-weight: bold;">学习情况</span>
                    </div> -->
                        <div class="mat-10">
                            <el-alert title="网络构建情况" type="success" effect="dark" :closable="false"
                                description="下方展示当前主题的网络构建情况~" />
                            <br>
                            <el-alert title="网络构建概览" type="info" :closable="false" />
                            <el-tabs style="margin-top: 10px;" type="border-card" v-model="networkActiveName"
                                @tab-change="handleClick">
                                <el-tab-pane label="社会网络" name="socialNetwork">
                                    <el-row :gutter="20">
                                        <el-col :span="6"></el-col>
                                        <el-col :span="6"></el-col>
                                        <el-col :span="6">
                                            <el-select v-model="socialNetworkTypeSelect" placeholder="请选择">
                                                <el-option label="关注网络" value="关注网络"></el-option>
                                                <el-option label="点赞网络" value="点赞网络"></el-option>
                                                <el-option label="回复网络" value="回复网络"></el-option>
                                            </el-select>
                                        </el-col>
                                        <el-col :span="6">
                                            <el-select v-model="socialNetworkRelateMeSelect" placeholder="请选择">
                                                <el-option label="全部" value="全部"></el-option>
                                                <el-option label="与我相关" value="与我相关"></el-option>
                                            </el-select>
                                        </el-col>
                                    </el-row>
                                    <el-divider></el-divider>
                                    <el-row :gutter="20">
                                        <el-col :span="24">
                                            <div id="social-network" style="width: 100%; height: 500px;"></div>
                                        </el-col>
                                    </el-row>
                                </el-tab-pane>
                                <el-tab-pane label="信息网络" name="informNetwork">
                                    <el-row :gutter="20">
                                        <el-col :span="6"></el-col>
                                        <el-col :span="6"></el-col>
                                        <el-col :span="6"></el-col>
                                        <el-col :span="6">
                                            <el-select v-model="infolNetworkRelateMeSelect" placeholder="请选择">
                                                <el-option label="全部" value="全部"></el-option>
                                                <el-option label="与我相关" value="与我相关"></el-option>
                                            </el-select>
                                        </el-col>
                                    </el-row>
                                    <el-divider></el-divider>
                                    <el-row :gutter="20">
                                        <el-col :span="24">
                                            <div id="info-network" style="width: 100%; height: 500px;"></div>
                                        </el-col>
                                    </el-row>
                                </el-tab-pane>
                            </el-tabs>
                            <el-divider></el-divider>

                            <el-alert title="主题之星" type="info" :closable="false" />
                            <el-table :data="wayfinding.recommendUserList" style="width: 100%">
                                <el-table-column prop="recommendCat" label="" width="140">
                                    <template #default="scope">
                                        <el-tag>{{ scope.row.recommendCat }}</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="recommendUser" label="">
                                    <template #default="scope">
                                        <el-popover :width="200" style="margin-right: 10px"
                                            v-for="u in scope.row.recommendUser" :key="u.id" size="small">
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
                            </el-table>
                            <el-divider></el-divider>

                            <el-alert title="内容生产情况" type="success" effect="dark" :closable="false"
                                description="下方展示当前主题的内容生产情况~" />
                            <br>
                            <el-alert title="生成生产概览" type="info" :closable="false" />
                            <el-table :data="wayfinding.generateContentPreviewList" style="width: 100%;">
                                <el-table-column label="">
                                    <template #default="{ row }">
                                        <el-space wrap>
                                            <el-tag style="margin-right: 10px;" v-for="t in row" :key="t.id"
                                                :type="t.generateContentTagType" size="large">
                                                {{ t.generateContentTagTitle }} | {{ t.generateContentTagNum }}
                                            </el-tag>
                                        </el-space>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-divider></el-divider>

                            <el-alert title="生成内容" type="info" :closable="false" />
                            <el-table :data="wayfinding.generateContentList" style="width: 100%;">
                                <el-table-column prop="generateContentCat" label="类型" width="90" :filters="[
                                    { text: '博客', value: '博客' },
                                    { text: '资源', value: '资源' },
                                    { text: '案例', value: '案例' },
                                ]" :filter-method="filterCat" filter-placement="bottom-end" />
                                <el-table-column prop="generateContentTag" label="标签" width="180"
                                    :filters="wayfinding.generateContentTagFilter" :filter-method="filterTag"
                                    filter-placement="bottom-end">
                                    <template #default="{ row }">
                                        <el-tag style="margin-left: 10px;" v-for="t in row.generateContentTag" :key="t.id"
                                            type="info" size="small"> {{ t }} </el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="generateContentDate" label="时间" width="120" sortable>
                                    <template #default="{ row }">
                                        {{ row.generateContentDate.slice(0, 10) }}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="generateContentTitle" label="标题">
                                    <template #default="{ row }">
                                        <el-link type="primary" :href="row.generateContentLink" target="_blank"
                                            :underline="false">
                                            {{ row.generateContentTitle }}
                                        </el-link>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="generateContentView" label="浏览" width="80"
                                    sortable></el-table-column>
                                <el-table-column prop="generateContentComment" label="评论" width="80"
                                    sortable></el-table-column>
                                <el-table-column prop="generateContentLike" label="点赞" width="80"
                                    sortable></el-table-column>
                            </el-table>
                            <el-divider></el-divider>
                        </div>
                    </el-card>
                </el-tab-pane>
                <el-tab-pane label="主题动态" name="event">
                    <el-card class="box-card">
                        <!-- <div class="card-header">
                        <span style="font-weight: bold;">主题动态</span>
                    </div> -->
                        <div class="mat-10">
                            <el-alert title="主题动态" type="success" effect="dark" :closable="false"
                                description="下方展示当前主题的相关动态情况~" />
                            <br>
                            <el-row>
                                <el-col :span="18">
                                </el-col>
                                <el-col :span="6">
                                    <el-select v-model="event.selectEvent" class="m-2" placeholder="选择..."
                                        @change="handleSelectEvent">
                                        <el-option v-for="item in event.eventOptions" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                    </el-select>
                                </el-col>
                            </el-row>
                            <el-table :data="event.eventTableData" style="width: 100%">
                                <el-table-column prop="user" label="昵称" width="90">
                                    <template #default="{ row }">
                                        <div v-html="row.user"></div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="event" label="行为" width="90"> </el-table-column>
                                <el-table-column prop="toUser" label="昵称" width="90">
                                    <template #default="{ row }">
                                        <div v-html="row.toUser"></div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="time" label="时间" width="120"></el-table-column>
                                <el-table-column prop="content" label="内容">
                                    <template #default="{ row }">
                                        <div v-html="row.content"></div>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="mat-10">
                                <el-pagination background layout="prev, pager, next"
                                    v-model:current-page="event.currentEventPage" :total="event.eventTotal"
                                    @current-change="handleCurrentChange" />
                            </div>
                        </div>
                    </el-card>
                </el-tab-pane>
            </el-tabs>
        </div>
    </el-card>
</template>

<script>
import { forEach } from 'lodash';
import * as echarts from 'echarts/core';
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent
} from 'echarts/components';
import { GraphChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GraphChart,
    CanvasRenderer
]);

export default {
    name: "App",
    data() {
        return {
            // eslint-disable-next-line no-undef
            themeId: parseInt(zrz_single.post_id) || 556572,
            // eslint-disable-next-line no-undef
            themeName: zrz_single.post_title || '主题名称',
            editUrl: '',
            isManeger: false,
            isTeacherOrOperator: false,
            teacherOrOperatorUserId: 0,
            teacherOrOperatorUserDisplayName: "",
            teacherOrOperatorRole: "",
            teacherAndOperator: [],
            tearcherOrOperatorSelectTopic: [],
            tearcherOrOperatorSelectTopicOpitons: [],
            tearcherOrOperatorSelectSalon: [],
            tearcherOrOperatorSelectSalonOpitons: [],
            activeName: "wayfinding",
            networkActiveName: "socialNetwork",
            baseUrl: "https://cmooc.bnu.edu.cn/wp-admin/admin-ajax.php?action=",
            overview: ``,
            tagTable: [],
            inputTag: "",
            forumTable: [],
            activityList: [],
            socialNetworkTypeSelect: "关注网络",
            socialNetworkRelateMeSelect: "全部",
            infolNetworkRelateMeSelect: "全部",
            wayfinding: {
                'socialNetwork': [],
                'informNetwork': [],
                'recommendUserList': [],
                'generateContentList': [],
                'generateContentPreviewList': [],
                'generateContentTagFilter': [],
            },
            event: {
                'selectEvent': "全部",
                'eventOptions': [{
                    'value': "与我相关",
                    'label': "与我相关"
                },
                {
                    'value': "全部",
                    'label': "全部"
                }],
                'eventTableData': [],
                'currentEventPage': 1,
                'eventPageSize': 10,
                'eventTotal': 0,
            },
        }
    },
    mounted() {
        this.cmoocThemeManegeCheck();
        this.editUrl = 'https://cmooc.bnu.edu.cn/write?pid=' + this.themeId;
        if (this.activeName == "theremManage") {
            this.getThemeManegeTeacherOrOperatorTable();
            this.getThemeManegeTag();
            this.getThemeContent('forum');
            this.getThemeContent('activity');
            this.getThemeManegeTopicOrActivityOptions();
        } else {
            this.getThemeContent(this.activeName);
        }
    },
    watch: {
        isTeacherOrOperator() {
            this.activeName = this.isTeacherOrOperator ? "theremManage" : "overview";
        },
        teacherOrOperatorUserId(newVal, oldVal) {
            if (newVal != oldVal) {
                this.teacherOrOperatorUserDisplayName = ""
            }
        },
    },
    methods: {
        // 检查是否为主题管理员
        cmoocThemeManegeCheck() {
            const url = this.baseUrl + "cmooc_theme_manege_check&theme_id=" + this.themeId;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.code == 200) {
                        this.isManeger = data.data.isManeger;
                        this.isTeacherOrOperator = data.data.isTeacherOrOperator;
                    } else {
                        this.$message.error(data.message);
                    }
                })
        },
        // 获取主题管理员和运营人员列表
        getThemeManegeTeacherOrOperatorTable() {
            const url = this.baseUrl + "cmooc_get_theme_manege_teacher_or_operator&theme_id=" + this.themeId;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.code == 200) {
                        this.teacherAndOperator = data.data;
                    } else {
                        this.$message.error(data.message);
                    }
                })
        },
        // 通过用户id获取用户信息，用于添加主题管理员和运营人员
        onSearchTeacherOrOperatorByUserId() {
            if (this.isManeger == false) {
                this.$message.error("您不是管理员，无法进行此操作");
                return;
            }
            const url = this.baseUrl + "cmooc_theme_manege_get_maneger_info_by_user_id&user_id=" + this.teacherOrOperatorUserId;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.code == 200) {
                        this.teacherOrOperatorUserId = data.data.user_id;
                        this.teacherOrOperatorUserDisplayName = data.data.display_name;
                    } else {
                        this.$message.error(data.message);
                    }
                })
        },
        // 添加主题管理员和运营人员
        onAddTeacherOrOperator() {
            if (this.isManeger == false) {
                this.$message.error("您不是管理员，无法进行此操作");
                return;
            }
            if (this.teacherOrOperatorUserId == 0) {
                this.$message.error("请先输入用户ID");
                return;
            }
            if (this.teacherOrOperatorUserDisplayName == "") {
                this.$message.error("请先搜索用户");
                return;
            }
            if (this.teacherOrOperatorRole == "") {
                this.$message.error("请选择角色");
                return;
            }
            fetch(this.baseUrl + "cmooc_theme_manege_add_teacher_or_operator" + "&theme_id=" + this.themeId + "&user_id=" + this.teacherOrOperatorUserId + "&role=" + this.teacherOrOperatorRole)
                .then(response => response.json())
                .then(data => {
                    if (data.code == 200) {
                        this.teacherAndOperator.push({
                            userId: this.teacherOrOperatorUserId,
                            role: this.teacherOrOperatorRole,
                            name: this.teacherOrOperatorUserDisplayName,
                        })
                        this.teacherOrOperatorUserId = 0;
                        this.teacherOrOperatorUserDisplayName = "";
                        this.teacherOrOperatorRole = "";
                        this.$message.success("添加成功");
                    } else {
                        this.$message.error(data.message);
                    }
                })
        },
        // 删除主题管理员和运营人员
        onDeleteTeacherOrOperator(index) {
            const userId = this.teacherAndOperator[index].userId;
            const role = this.teacherAndOperator[index].role;
            fetch(this.baseUrl + "cmooc_theme_manege_delete_teacher_or_operator" + "&theme_id=" + this.themeId + "&user_id=" + userId + "&role=" + role)
                .then(response => response.json())
                .then(data => {
                    if (data.code == 200) {
                        this.teacherAndOperator.splice(index, 1);
                        this.$message.success("删除成功");
                    } else {
                        this.$message.error(data.message);
                    }
                })
        },
        // 获取主题管理中的可添加的话题和活动列表，作为添加话题和活动的备选项
        getThemeManegeTopicOrActivityOptions() {
            const url = this.baseUrl + "cmooc_theme_manege_get_recent_topic_and_activity";
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.code == 200) {
                        this.tearcherOrOperatorSelectTopicOpitons = data.data.topic;
                        this.tearcherOrOperatorSelectSalonOpitons = data.data.activity;
                    }
                })
        },
        // 在主题管理中添加话题
        onAddFourm() {
            var temp = [];
            forEach(this.forumTable, (item) => {
                temp.push(item.id);
            })
            if (this.tearcherOrOperatorSelectTopic.length == 0) {
                this.$message({
                    message: '请选择要添加的话题',
                    type: 'warning'
                });
                return;
            }
            var i = 0;
            forEach(this.tearcherOrOperatorSelectTopicOpitons, (item) => {
                if (temp.indexOf(item.value) == -1 && this.tearcherOrOperatorSelectTopic.indexOf(item.value) != -1) {
                    i++;
                    this.forumTable.push({
                        id: item.value,
                        name: item.label,
                    })
                }
            })
            if (i == 0) {
                this.$message({
                    message: '已经添加过了',
                    type: 'warning'
                });
                this.tearcherOrOperatorSelectTopic = [];
                return;
            }
            this.onAddForumToBackend();
            this.tearcherOrOperatorSelectTopic = [];
        },
        // 在主题管理中添加话题并存储到数据库
        onAddForumToBackend() {
            var temp = [];
            forEach(this.forumTable, (item) => {
                temp.push(item.id);
            })
            const url = this.baseUrl + "cmooc_theme_manege_add_forum" + "&themeId=" + this.themeId + "&forumId=" + JSON.stringify(temp);
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.code == 200) {
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                    }
                })
        },
        // 在主题管理中删除话题
        onDeleteForum(index) {
            this.forumTable.splice(index, 1)
            this.onAddForumToBackend();
        },
        onAddActivity() {
            var temp = [];
            forEach(this.activityList, (item) => {
                temp.push(item.id);
            })
            if (this.tearcherOrOperatorSelectSalon.length == 0) {
                this.$message({
                    message: '请选择要添加的沙龙活动',
                    type: 'warning'
                });
                return;
            }
            var i = 0;
            forEach(this.tearcherOrOperatorSelectSalonOpitons, (item) => {
                if (temp.indexOf(item.value) == -1 && this.tearcherOrOperatorSelectSalon.indexOf(item.value) != -1) {
                    i++;
                    this.activityList.push({
                        id: item.value,
                        title: item.label,
                    })
                }
            })
            if (i == 0) {
                this.$message({
                    message: '已经添加过了',
                    type: 'warning'
                });
                this.tearcherOrOperatorSelectSalon = [];
                return;
            }
            this.onAddActivityToBackend();
            this.tearcherOrOperatorSelectSalon = [];
        },
        onAddActivityToBackend() {
            var temp = [];
            forEach(this.activityList, (item) => {
                temp.push(item.id);
            })
            const url = this.baseUrl + "cmooc_theme_manege_add_activity" + "&themeId=" + this.themeId + "&activityId=" + JSON.stringify(temp)
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.code == 200) {
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                    }
                })
        },
        onDeleteActivity(index) {
            this.activityList.splice(index, 1)
            this.onAddActivityToBackend();
        },
        onDeleteActivityToBackend() {
            const url = this.baseUrl + "cmooc_theme_manege_delete_activity";
            var temp = [];
            forEach(this.activityList, (item) => {
                temp.push(item.id);
            })
            fetch(url, {
                themeId: this.themeId,
                activityId: temp,
            })
                .then(response => response.json())
                .then(data => {
                    if (data.code == 200) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    }
                })
        },
        getThemeManegeTag() {
            const url = this.baseUrl + "cmooc_theme_manege_get_tag" + "&themeId=" + this.themeId;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.code == 200) {
                        this.tagTable = data.data;
                    }
                })
        },
        onAddTag() {
            if (this.inputTag == "") {
                this.$message({
                    message: '请输入标签',
                    type: 'warning'
                });
                return;
            }
            var temp = [];
            forEach(this.tagTable, (item) => {
                temp.push(item.name);
            })
            if (temp.indexOf(this.inputTag) != -1) {
                this.$message({
                    message: '已经添加过了',
                    type: 'warning'
                });
                return;
            }
            this.tagTable.push({
                name: this.inputTag,
            })
            this.onAddTagToBackend();
            this.inputTag = "";
        },
        onAddTagToBackend() {
            var temp = [];
            forEach(this.tagTable, (item) => {
                temp.push(item.name);
            })
            const url = this.baseUrl + "cmooc_theme_manege_add_tag" + "&themeId=" + this.themeId + "&tag=" + JSON.stringify(temp);
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.code == 200) {
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                    }
                })
        },
        onDeleteTag(index) {
            this.tagTable.splice(index, 1)
            this.onAddTagToBackend();
        },
        handleClick(tab) {
            if (tab == "overview") {
                this.getThemeContent('overview');
            } else if (tab == "event") {
                this.getThemeContent('event');
            } else if (tab == "forum") {
                this.getThemeContent('forum');
            } else if (tab == "activity") {
                this.getThemeContent('activity');
            } else if (tab == "wayfinding") {
                this.getThemeContent('wayfinding');
            } else if (tab == "socialNetwork") {
                this.getThemeContent('socialNetwork');
            } else if (tab == "informNetwork") {
                this.getThemeContent('informNetwork');
            } else if (tab == "theremManage") {
                this.cmoocThemeManegeCheck();
                this.getThemeManegeTeacherOrOperatorTable();
                this.getThemeManegeTag();
                this.getThemeContent('forum');
                this.getThemeContent('activity');
                this.getThemeManegeTopicOrActivityOptions();
            }
        },
        handleSelectEvent(val) {
            console.log(val);
            this.getThemeContent('event');
        },
        getThemeContent(tab) {
            var url = this.baseUrl + 'cmooc_theme_content&theme_id=' + this.themeId + '&tab=' + tab
            if (tab === 'event') {
                url = url +
                    '&event_page_size=' + this.event.eventPageSize +
                    '&current_event_page=' + this.event.currentEventPage +
                    '&event_tab_type=' + this.event.selectEvent;
            }
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.code == 200) {
                        if (tab == 'overview') {
                            this.overview = data.data;
                        }
                        else if (tab == 'event') {
                            this.event.eventTableData = data.data.eventTableData
                            this.event.currentEventPage = data.data.currentEventPage
                            this.event.eventPageSize = data.data.eventPageSize
                            this.event.eventTotal = data.data.eventTotal
                        }
                        else if (tab == 'forum') {
                            this.forumTable = data.data;
                            // forEach(this.forumTable, (item) => {
                            //     this.tearcherOrOperatorSelectTopic.push({
                            //         value: item.id,
                            //         label: item.name,
                            //     })
                            // })
                        }
                        else if (tab == 'activity') {
                            this.activityList = data.data;
                            // forEach(this.activityList, (item) => {
                            //     this.tearcherOrOperatorSelectSalon.push({
                            //         value: item.id,
                            //         label: item.title,
                            //     })
                            // })
                        }
                        else if (tab == 'wayfinding') {
                            this.wayfinding.generateContentPreviewList = data.data.generateContentPreviewList;
                            this.wayfinding.generateContentList = data.data.generateContentList;
                            this.wayfinding.recommendUserList = data.data.recommendUserList;
                            this.wayfinding.generateContentTagFilter = data.data.generateContentTagFilter;
                            this.drawSocialNetwork();
                        }
                        else if (tab == 'socialNetwork') {
                            this.wayfinding.socialNetwork = data.data;
                        }
                        else if (tab == 'informNetwork') {
                            this.wayfinding.informNetwork = data.data;
                        }
                    }
                })
        },
        followUser(userId) {
            console.log(userId)
        },
        unFollowUser(userId) {
            console.log(userId)
        },
        handleCurrentChange(val) {
            this.event.currentEventPage = val;
            this.getThemeContent('event');
        },
        filterCat(value, row) {
            return row.generateContentCat === value
        },
        filterTag(value, row) {
            return row.generateContentTag.includes(value)
        },
        // wayfinding draw socialNetwork
        drawSocialNetwork() {
            // id social-network   info-network
            var chartDom = document.getElementById('social-network');
            var myChart = echarts.init(chartDom);
            var option;

            myChart.showLoading();

            var graph = {
                "nodes": [
                    {
                        "id": "0",
                        "name": "Myriel",
                        "symbolSize": 46.12381,
                        "symbol": "image://https://cmooc.bnu.edu.cn/wp-content/uploads/bfi_thumb/06a9e145736a5-6twza1xr6ke2uuhwtlokxevmsoglm5o9k42oxbatgb4.jpg",
                        "shape": 'circle', 
                        "x": -266.82776,
                        "y": 299.6904,
                        "value": 48.685715,
                        "category": 0
                    },
                    {
                        "id": "1",
                        "name": "Napoleon",
                        "symbolSize": 2.6666666666666665,
                        "x": -418.08344,
                        "y": 446.8853,
                        "value": 4,
                        "category": 0
                    },
                    {
                        "id": "2",
                        "name": "MlleBaptistine",
                        "symbolSize": 6.323809333333333,
                        "x": -212.76357,
                        "y": 245.29176,
                        "value": 9.485714,
                        "category": 1
                    },
                    {
                        "id": "3",
                        "name": "MmeMagloire",
                        "symbolSize": 6.323809333333333,
                        "x": -242.82404,
                        "y": 235.26283,
                        "value": 9.485714,
                        "category": 1
                    },
                    {
                        "id": "4",
                        "name": "CountessDeLo",
                        "symbolSize": 2.6666666666666665,
                        "x": -379.30386,
                        "y": 429.06424,
                        "value": 4,
                        "category": 0
                    },
                    {
                        "id": "5",
                        "name": "Geborand",
                        "symbolSize": 2.6666666666666665,
                        "x": -417.26337,
                        "y": 406.03506,
                        "value": 4,
                        "category": 0
                    },
                    {
                        "id": "6",
                        "name": "Champtercier",
                        "symbolSize": 2.6666666666666665,
                        "x": -332.6012,
                        "y": 485.16974,
                        "value": 4,
                        "category": 0
                    },
                    {
                        "id": "7",
                        "name": "Cravatte",
                        "symbolSize": 2.6666666666666665,
                        "x": -382.69568,
                        "y": 475.09113,
                        "value": 4,
                        "category": 0
                    },
                    {
                        "id": "8",
                        "name": "Count",
                        "symbolSize": 2.6666666666666665,
                        "x": -320.384,
                        "y": 387.17325,
                        "value": 4,
                        "category": 0
                    },
                    {
                        "id": "9",
                        "name": "OldMan",
                        "symbolSize": 2.6666666666666665,
                        "x": -344.39832,
                        "y": 451.16772,
                        "value": 4,
                        "category": 0
                    },
                    {
                        "id": "10",
                        "name": "Labarre",
                        "symbolSize": 2.6666666666666665,
                        "x": -89.34107,
                        "y": 234.56128,
                        "value": 4,
                        "category": 1
                    },
                    {
                        "id": "11",
                        "name": "Valjean",
                        "symbolSize": 66.66666666666667,
                        "x": -87.93029,
                        "y": -6.8120565,
                        "value": 100,
                        "category": 1
                    },
                    {
                        "id": "12",
                        "name": "Marguerite",
                        "symbolSize": 4.495239333333333,
                        "x": -339.77908,
                        "y": -184.69139,
                        "value": 6.742859,
                        "category": 1
                    },
                    {
                        "id": "13",
                        "name": "MmeDeR",
                        "symbolSize": 2.6666666666666665,
                        "x": -194.31313,
                        "y": 178.55301,
                        "value": 4,
                        "category": 1
                    },
                    {
                        "id": "14",
                        "name": "Isabeau",
                        "symbolSize": 2.6666666666666665,
                        "x": -158.05168,
                        "y": 201.99768,
                        "value": 4,
                        "category": 1
                    },
                    {
                        "id": "15",
                        "name": "Gervais",
                        "symbolSize": 2.6666666666666665,
                        "x": -127.701546,
                        "y": 242.55057,
                        "value": 4,
                        "category": 1
                    },
                    {
                        "id": "16",
                        "name": "Tholomyes",
                        "symbolSize": 17.295237333333333,
                        "x": -385.2226,
                        "y": -393.5572,
                        "value": 25.942856,
                        "category": 2
                    },
                    {
                        "id": "17",
                        "name": "Listolier",
                        "symbolSize": 13.638097333333334,
                        "x": -516.55884,
                        "y": -393.98975,
                        "value": 20.457146,
                        "category": 2
                    },
                    {
                        "id": "18",
                        "name": "Fameuil",
                        "symbolSize": 13.638097333333334,
                        "x": -464.79382,
                        "y": -493.57944,
                        "value": 20.457146,
                        "category": 2
                    },
                    {
                        "id": "19",
                        "name": "Blacheville",
                        "symbolSize": 13.638097333333334,
                        "x": -515.1624,
                        "y": -456.9891,
                        "value": 20.457146,
                        "category": 2
                    },
                    {
                        "id": "20",
                        "name": "Favourite",
                        "symbolSize": 13.638097333333334,
                        "x": -408.12122,
                        "y": -464.5048,
                        "value": 20.457146,
                        "category": 2
                    },
                    {
                        "id": "21",
                        "name": "Dahlia",
                        "symbolSize": 13.638097333333334,
                        "x": -456.44113,
                        "y": -425.13303,
                        "value": 20.457146,
                        "category": 2
                    },
                    {
                        "id": "22",
                        "name": "Zephine",
                        "symbolSize": 13.638097333333334,
                        "x": -459.1107,
                        "y": -362.5133,
                        "value": 20.457146,
                        "category": 2
                    },
                    {
                        "id": "23",
                        "name": "Fantine",
                        "symbolSize": 28.266666666666666,
                        "x": -313.42786,
                        "y": -289.44803,
                        "value": 42.4,
                        "category": 2
                    },
                    {
                        "id": "24",
                        "name": "MmeThenardier",
                        "symbolSize": 20.95238266666667,
                        "x": 4.6313396,
                        "y": -273.8517,
                        "value": 31.428574,
                        "category": 7
                    },
                    {
                        "id": "25",
                        "name": "Thenardier",
                        "symbolSize": 30.095235333333335,
                        "x": 82.80825,
                        "y": -203.1144,
                        "value": 45.142853,
                        "category": 7
                    },
                    {
                        "id": "26",
                        "name": "Cosette",
                        "symbolSize": 20.95238266666667,
                        "x": 78.64646,
                        "y": -31.512747,
                        "value": 31.428574,
                        "category": 6
                    },
                    {
                        "id": "27",
                        "name": "Javert",
                        "symbolSize": 31.923806666666668,
                        "x": -81.46074,
                        "y": -204.20204,
                        "value": 47.88571,
                        "category": 7
                    },
                    {
                        "id": "28",
                        "name": "Fauchelevent",
                        "symbolSize": 8.152382000000001,
                        "x": -225.73984,
                        "y": 82.41631,
                        "value": 12.228573,
                        "category": 4
                    },
                    {
                        "id": "29",
                        "name": "Bamatabois",
                        "symbolSize": 15.466666666666667,
                        "x": -385.6842,
                        "y": -20.206686,
                        "value": 23.2,
                        "category": 3
                    },
                    {
                        "id": "30",
                        "name": "Perpetue",
                        "symbolSize": 4.495239333333333,
                        "x": -403.92447,
                        "y": -197.69823,
                        "value": 6.742859,
                        "category": 2
                    },
                    {
                        "id": "31",
                        "name": "Simplice",
                        "symbolSize": 8.152382000000001,
                        "x": -281.4253,
                        "y": -158.45137,
                        "value": 12.228573,
                        "category": 2
                    },
                    {
                        "id": "32",
                        "name": "Scaufflaire",
                        "symbolSize": 2.6666666666666665,
                        "x": -122.41348,
                        "y": 210.37503,
                        "value": 4,
                        "category": 1
                    },
                    {
                        "id": "33",
                        "name": "Woman1",
                        "symbolSize": 4.495239333333333,
                        "x": -234.6001,
                        "y": -113.15067,
                        "value": 6.742859,
                        "category": 1
                    },
                    {
                        "id": "34",
                        "name": "Judge",
                        "symbolSize": 11.809524666666666,
                        "x": -387.84915,
                        "y": 58.7059,
                        "value": 17.714287,
                        "category": 3
                    },
                    {
                        "id": "35",
                        "name": "Champmathieu",
                        "symbolSize": 11.809524666666666,
                        "x": -338.2307,
                        "y": 87.48405,
                        "value": 17.714287,
                        "category": 3
                    },
                    {
                        "id": "36",
                        "name": "Brevet",
                        "symbolSize": 11.809524666666666,
                        "x": -453.26874,
                        "y": 58.94648,
                        "value": 17.714287,
                        "category": 3
                    },
                    {
                        "id": "37",
                        "name": "Chenildieu",
                        "symbolSize": 11.809524666666666,
                        "x": -386.44904,
                        "y": 140.05937,
                        "value": 17.714287,
                        "category": 3
                    },
                    {
                        "id": "38",
                        "name": "Cochepaille",
                        "symbolSize": 11.809524666666666,
                        "x": -446.7876,
                        "y": 123.38005,
                        "value": 17.714287,
                        "category": 3
                    },
                    {
                        "id": "39",
                        "name": "Pontmercy",
                        "symbolSize": 6.323809333333333,
                        "x": 336.49738,
                        "y": -269.55914,
                        "value": 9.485714,
                        "category": 6
                    },
                    {
                        "id": "40",
                        "name": "Boulatruelle",
                        "symbolSize": 2.6666666666666665,
                        "x": 29.187843,
                        "y": -460.13132,
                        "value": 4,
                        "category": 7
                    },
                    {
                        "id": "41",
                        "name": "Eponine",
                        "symbolSize": 20.95238266666667,
                        "x": 238.36697,
                        "y": -210.00926,
                        "value": 31.428574,
                        "category": 7
                    },
                    {
                        "id": "42",
                        "name": "Anzelma",
                        "symbolSize": 6.323809333333333,
                        "x": 189.69513,
                        "y": -346.50662,
                        "value": 9.485714,
                        "category": 7
                    },
                    {
                        "id": "43",
                        "name": "Woman2",
                        "symbolSize": 6.323809333333333,
                        "x": -187.00418,
                        "y": -145.02663,
                        "value": 9.485714,
                        "category": 6
                    },
                    {
                        "id": "44",
                        "name": "MotherInnocent",
                        "symbolSize": 4.495239333333333,
                        "x": -252.99521,
                        "y": 129.87549,
                        "value": 6.742859,
                        "category": 4
                    },
                    {
                        "id": "45",
                        "name": "Gribier",
                        "symbolSize": 2.6666666666666665,
                        "x": -296.07935,
                        "y": 163.11964,
                        "value": 4,
                        "category": 4
                    },
                    {
                        "id": "46",
                        "name": "Jondrette",
                        "symbolSize": 2.6666666666666665,
                        "x": 550.3201,
                        "y": 522.4031,
                        "value": 4,
                        "category": 5
                    },
                    {
                        "id": "47",
                        "name": "MmeBurgon",
                        "symbolSize": 4.495239333333333,
                        "x": 488.13535,
                        "y": 356.8573,
                        "value": 6.742859,
                        "category": 5
                    },
                    {
                        "id": "48",
                        "name": "Gavroche",
                        "symbolSize": 41.06667066666667,
                        "x": 387.89572,
                        "y": 110.462326,
                        "value": 61.600006,
                        "category": 8
                    },
                    {
                        "id": "49",
                        "name": "Gillenormand",
                        "symbolSize": 13.638097333333334,
                        "x": 126.4831,
                        "y": 68.10622,
                        "value": 20.457146,
                        "category": 6
                    },
                    {
                        "id": "50",
                        "name": "Magnon",
                        "symbolSize": 4.495239333333333,
                        "x": 127.07365,
                        "y": -113.05923,
                        "value": 6.742859,
                        "category": 6
                    },
                    {
                        "id": "51",
                        "name": "MlleGillenormand",
                        "symbolSize": 13.638097333333334,
                        "x": 162.63559,
                        "y": 117.6565,
                        "value": 20.457146,
                        "category": 6
                    },
                    {
                        "id": "52",
                        "name": "MmePontmercy",
                        "symbolSize": 4.495239333333333,
                        "x": 353.66415,
                        "y": -205.89165,
                        "value": 6.742859,
                        "category": 6
                    },
                    {
                        "id": "53",
                        "name": "MlleVaubois",
                        "symbolSize": 2.6666666666666665,
                        "x": 165.43939,
                        "y": 339.7736,
                        "value": 4,
                        "category": 6
                    },
                    {
                        "id": "54",
                        "name": "LtGillenormand",
                        "symbolSize": 8.152382000000001,
                        "x": 137.69348,
                        "y": 196.1069,
                        "value": 12.228573,
                        "category": 6
                    },
                    {
                        "id": "55",
                        "name": "Marius",
                        "symbolSize": 35.58095333333333,
                        "x": 206.44687,
                        "y": -13.805411,
                        "value": 53.37143,
                        "category": 6
                    },
                    {
                        "id": "56",
                        "name": "BaronessT",
                        "symbolSize": 4.495239333333333,
                        "x": 194.82993,
                        "y": 224.78036,
                        "value": 6.742859,
                        "category": 6
                    },
                    {
                        "id": "57",
                        "name": "Mabeuf",
                        "symbolSize": 20.95238266666667,
                        "x": 597.6618,
                        "y": 135.18481,
                        "value": 31.428574,
                        "category": 8
                    },
                    {
                        "id": "58",
                        "name": "Enjolras",
                        "symbolSize": 28.266666666666666,
                        "x": 355.78366,
                        "y": -74.882454,
                        "value": 42.4,
                        "category": 8
                    },
                    {
                        "id": "59",
                        "name": "Combeferre",
                        "symbolSize": 20.95238266666667,
                        "x": 515.2961,
                        "y": -46.167564,
                        "value": 31.428574,
                        "category": 8
                    },
                    {
                        "id": "60",
                        "name": "Prouvaire",
                        "symbolSize": 17.295237333333333,
                        "x": 614.29285,
                        "y": -69.3104,
                        "value": 25.942856,
                        "category": 8
                    },
                    {
                        "id": "61",
                        "name": "Feuilly",
                        "symbolSize": 20.95238266666667,
                        "x": 550.1917,
                        "y": -128.17537,
                        "value": 31.428574,
                        "category": 8
                    },
                    {
                        "id": "62",
                        "name": "Courfeyrac",
                        "symbolSize": 24.609526666666667,
                        "x": 436.17184,
                        "y": -12.7286825,
                        "value": 36.91429,
                        "category": 8
                    },
                    {
                        "id": "63",
                        "name": "Bahorel",
                        "symbolSize": 22.780953333333333,
                        "x": 602.55225,
                        "y": 16.421427,
                        "value": 34.17143,
                        "category": 8
                    },
                    {
                        "id": "64",
                        "name": "Bossuet",
                        "symbolSize": 24.609526666666667,
                        "x": 455.81955,
                        "y": -115.45826,
                        "value": 36.91429,
                        "category": 8
                    },
                    {
                        "id": "65",
                        "name": "Joly",
                        "symbolSize": 22.780953333333333,
                        "x": 516.40784,
                        "y": 47.242233,
                        "value": 34.17143,
                        "category": 8
                    },
                    {
                        "id": "66",
                        "name": "Grantaire",
                        "symbolSize": 19.12381,
                        "x": 646.4313,
                        "y": -151.06331,
                        "value": 28.685715,
                        "category": 8
                    },
                    {
                        "id": "67",
                        "name": "MotherPlutarch",
                        "symbolSize": 2.6666666666666665,
                        "x": 668.9568,
                        "y": 204.65488,
                        "value": 4,
                        "category": 8
                    },
                    {
                        "id": "68",
                        "name": "Gueulemer",
                        "symbolSize": 19.12381,
                        "x": 78.4799,
                        "y": -347.15146,
                        "value": 28.685715,
                        "category": 7
                    },
                    {
                        "id": "69",
                        "name": "Babet",
                        "symbolSize": 19.12381,
                        "x": 150.35959,
                        "y": -298.50797,
                        "value": 28.685715,
                        "category": 7
                    },
                    {
                        "id": "70",
                        "name": "Claquesous",
                        "symbolSize": 19.12381,
                        "x": 137.3717,
                        "y": -410.2809,
                        "value": 28.685715,
                        "category": 7
                    },
                    {
                        "id": "71",
                        "name": "Montparnasse",
                        "symbolSize": 17.295237333333333,
                        "x": 234.87747,
                        "y": -400.85983,
                        "value": 25.942856,
                        "category": 7
                    },
                    {
                        "id": "72",
                        "name": "Toussaint",
                        "symbolSize": 6.323809333333333,
                        "x": 40.942253,
                        "y": 113.78272,
                        "value": 9.485714,
                        "category": 1
                    },
                    {
                        "id": "73",
                        "name": "Child1",
                        "symbolSize": 4.495239333333333,
                        "x": 437.939,
                        "y": 291.58234,
                        "value": 6.742859,
                        "category": 8
                    },
                    {
                        "id": "74",
                        "name": "Child2",
                        "symbolSize": 4.495239333333333,
                        "x": 466.04922,
                        "y": 283.3606,
                        "value": 6.742859,
                        "category": 8
                    },
                    {
                        "id": "75",
                        "name": "Brujon",
                        "symbolSize": 13.638097333333334,
                        "x": 238.79364,
                        "y": -314.06345,
                        "value": 20.457146,
                        "category": 7
                    },
                    {
                        "id": "76",
                        "name": "MmeHucheloup",
                        "symbolSize": 13.638097333333334,
                        "x": 712.18353,
                        "y": 4.8131495,
                        "value": 20.457146,
                        "category": 8
                    }
                ],
                "links": [
                    {
                        "source": "1",
                        "target": "0"
                    },
                    {
                        "source": "2",
                        "target": "0"
                    },
                    {
                        "source": "3",
                        "target": "0"
                    },
                    {
                        "source": "3",
                        "target": "2"
                    },
                    {
                        "source": "4",
                        "target": "0"
                    },
                    {
                        "source": "5",
                        "target": "0"
                    },
                    {
                        "source": "6",
                        "target": "0"
                    },
                    {
                        "source": "7",
                        "target": "0"
                    },
                    {
                        "source": "8",
                        "target": "0"
                    },
                    {
                        "source": "9",
                        "target": "0"
                    },
                    {
                        "source": "11",
                        "target": "0"
                    },
                    {
                        "source": "11",
                        "target": "2"
                    },
                    {
                        "source": "11",
                        "target": "3"
                    },
                    {
                        "source": "11",
                        "target": "10"
                    },
                    {
                        "source": "12",
                        "target": "11"
                    },
                    {
                        "source": "13",
                        "target": "11"
                    },
                    {
                        "source": "14",
                        "target": "11"
                    },
                    {
                        "source": "15",
                        "target": "11"
                    },
                    {
                        "source": "17",
                        "target": "16"
                    },
                    {
                        "source": "18",
                        "target": "16"
                    },
                    {
                        "source": "18",
                        "target": "17"
                    },
                    {
                        "source": "19",
                        "target": "16"
                    },
                    {
                        "source": "19",
                        "target": "17"
                    },
                    {
                        "source": "19",
                        "target": "18"
                    },
                    {
                        "source": "20",
                        "target": "16"
                    },
                    {
                        "source": "20",
                        "target": "17"
                    },
                    {
                        "source": "20",
                        "target": "18"
                    },
                    {
                        "source": "20",
                        "target": "19"
                    },
                    {
                        "source": "21",
                        "target": "16"
                    },
                    {
                        "source": "21",
                        "target": "17"
                    },
                    {
                        "source": "21",
                        "target": "18"
                    },
                    {
                        "source": "21",
                        "target": "19"
                    },
                    {
                        "source": "21",
                        "target": "20"
                    },
                    {
                        "source": "22",
                        "target": "16"
                    },
                    {
                        "source": "22",
                        "target": "17"
                    },
                    {
                        "source": "22",
                        "target": "18"
                    },
                    {
                        "source": "22",
                        "target": "19"
                    },
                    {
                        "source": "22",
                        "target": "20"
                    },
                    {
                        "source": "22",
                        "target": "21"
                    },
                    {
                        "source": "23",
                        "target": "11"
                    },
                    {
                        "source": "23",
                        "target": "12"
                    },
                    {
                        "source": "23",
                        "target": "16"
                    },
                    {
                        "source": "23",
                        "target": "17"
                    },
                    {
                        "source": "23",
                        "target": "18"
                    },
                    {
                        "source": "23",
                        "target": "19"
                    },
                    {
                        "source": "23",
                        "target": "20"
                    },
                    {
                        "source": "23",
                        "target": "21"
                    },
                    {
                        "source": "23",
                        "target": "22"
                    },
                    {
                        "source": "24",
                        "target": "11"
                    },
                    {
                        "source": "24",
                        "target": "23"
                    },
                    {
                        "source": "25",
                        "target": "11"
                    },
                    {
                        "source": "25",
                        "target": "23"
                    },
                    {
                        "source": "25",
                        "target": "24"
                    },
                    {
                        "source": "26",
                        "target": "11"
                    },
                    {
                        "source": "26",
                        "target": "16"
                    },
                    {
                        "source": "26",
                        "target": "24"
                    },
                    {
                        "source": "26",
                        "target": "25"
                    },
                    {
                        "source": "27",
                        "target": "11"
                    },
                    {
                        "source": "27",
                        "target": "23"
                    },
                    {
                        "source": "27",
                        "target": "24"
                    },
                    {
                        "source": "27",
                        "target": "25"
                    },
                    {
                        "source": "27",
                        "target": "26"
                    },
                    {
                        "source": "28",
                        "target": "11"
                    },
                    {
                        "source": "28",
                        "target": "27"
                    },
                    {
                        "source": "29",
                        "target": "11"
                    },
                    {
                        "source": "29",
                        "target": "23"
                    },
                    {
                        "source": "29",
                        "target": "27"
                    },
                    {
                        "source": "30",
                        "target": "23"
                    },
                    {
                        "source": "31",
                        "target": "11"
                    },
                    {
                        "source": "31",
                        "target": "23"
                    },
                    {
                        "source": "31",
                        "target": "27"
                    },
                    {
                        "source": "31",
                        "target": "30"
                    },
                    {
                        "source": "32",
                        "target": "11"
                    },
                    {
                        "source": "33",
                        "target": "11"
                    },
                    {
                        "source": "33",
                        "target": "27"
                    },
                    {
                        "source": "34",
                        "target": "11"
                    },
                    {
                        "source": "34",
                        "target": "29"
                    },
                    {
                        "source": "35",
                        "target": "11"
                    },
                    {
                        "source": "35",
                        "target": "29"
                    },
                    {
                        "source": "35",
                        "target": "34"
                    },
                    {
                        "source": "36",
                        "target": "11"
                    },
                    {
                        "source": "36",
                        "target": "29"
                    },
                    {
                        "source": "36",
                        "target": "34"
                    },
                    {
                        "source": "36",
                        "target": "35"
                    },
                    {
                        "source": "37",
                        "target": "11"
                    },
                    {
                        "source": "37",
                        "target": "29"
                    },
                    {
                        "source": "37",
                        "target": "34"
                    },
                    {
                        "source": "37",
                        "target": "35"
                    },
                    {
                        "source": "37",
                        "target": "36"
                    },
                    {
                        "source": "38",
                        "target": "11"
                    },
                    {
                        "source": "38",
                        "target": "29"
                    },
                    {
                        "source": "38",
                        "target": "34"
                    },
                    {
                        "source": "38",
                        "target": "35"
                    },
                    {
                        "source": "38",
                        "target": "36"
                    },
                    {
                        "source": "38",
                        "target": "37"
                    },
                    {
                        "source": "39",
                        "target": "25"
                    },
                    {
                        "source": "40",
                        "target": "25"
                    },
                    {
                        "source": "41",
                        "target": "24"
                    },
                    {
                        "source": "41",
                        "target": "25"
                    },
                    {
                        "source": "42",
                        "target": "24"
                    },
                    {
                        "source": "42",
                        "target": "25"
                    },
                    {
                        "source": "42",
                        "target": "41"
                    },
                    {
                        "source": "43",
                        "target": "11"
                    },
                    {
                        "source": "43",
                        "target": "26"
                    },
                    {
                        "source": "43",
                        "target": "27"
                    },
                    {
                        "source": "44",
                        "target": "11"
                    },
                    {
                        "source": "44",
                        "target": "28"
                    },
                    {
                        "source": "45",
                        "target": "28"
                    },
                    {
                        "source": "47",
                        "target": "46"
                    },
                    {
                        "source": "48",
                        "target": "11"
                    },
                    {
                        "source": "48",
                        "target": "25"
                    },
                    {
                        "source": "48",
                        "target": "27"
                    },
                    {
                        "source": "48",
                        "target": "47"
                    },
                    {
                        "source": "49",
                        "target": "11"
                    },
                    {
                        "source": "49",
                        "target": "26"
                    },
                    {
                        "source": "50",
                        "target": "24"
                    },
                    {
                        "source": "50",
                        "target": "49"
                    },
                    {
                        "source": "51",
                        "target": "11"
                    },
                    {
                        "source": "51",
                        "target": "26"
                    },
                    {
                        "source": "51",
                        "target": "49"
                    },
                    {
                        "source": "52",
                        "target": "39"
                    },
                    {
                        "source": "52",
                        "target": "51"
                    },
                    {
                        "source": "53",
                        "target": "51"
                    },
                    {
                        "source": "54",
                        "target": "26"
                    },
                    {
                        "source": "54",
                        "target": "49"
                    },
                    {
                        "source": "54",
                        "target": "51"
                    },
                    {
                        "source": "55",
                        "target": "11"
                    },
                    {
                        "source": "55",
                        "target": "16"
                    },
                    {
                        "source": "55",
                        "target": "25"
                    },
                    {
                        "source": "55",
                        "target": "26"
                    },
                    {
                        "source": "55",
                        "target": "39"
                    },
                    {
                        "source": "55",
                        "target": "41"
                    },
                    {
                        "source": "55",
                        "target": "48"
                    },
                    {
                        "source": "55",
                        "target": "49"
                    },
                    {
                        "source": "55",
                        "target": "51"
                    },
                    {
                        "source": "55",
                        "target": "54"
                    },
                    {
                        "source": "56",
                        "target": "49"
                    },
                    {
                        "source": "56",
                        "target": "55"
                    },
                    {
                        "source": "57",
                        "target": "41"
                    },
                    {
                        "source": "57",
                        "target": "48"
                    },
                    {
                        "source": "57",
                        "target": "55"
                    },
                    {
                        "source": "58",
                        "target": "11"
                    },
                    {
                        "source": "58",
                        "target": "27"
                    },
                    {
                        "source": "58",
                        "target": "48"
                    },
                    {
                        "source": "58",
                        "target": "55"
                    },
                    {
                        "source": "58",
                        "target": "57"
                    },
                    {
                        "source": "59",
                        "target": "48"
                    },
                    {
                        "source": "59",
                        "target": "55"
                    },
                    {
                        "source": "59",
                        "target": "57"
                    },
                    {
                        "source": "59",
                        "target": "58"
                    },
                    {
                        "source": "60",
                        "target": "48"
                    },
                    {
                        "source": "60",
                        "target": "58"
                    },
                    {
                        "source": "60",
                        "target": "59"
                    },
                    {
                        "source": "61",
                        "target": "48"
                    },
                    {
                        "source": "61",
                        "target": "55"
                    },
                    {
                        "source": "61",
                        "target": "57"
                    },
                    {
                        "source": "61",
                        "target": "58"
                    },
                    {
                        "source": "61",
                        "target": "59"
                    },
                    {
                        "source": "61",
                        "target": "60"
                    },
                    {
                        "source": "62",
                        "target": "41"
                    },
                    {
                        "source": "62",
                        "target": "48"
                    },
                    {
                        "source": "62",
                        "target": "55"
                    },
                    {
                        "source": "62",
                        "target": "57"
                    },
                    {
                        "source": "62",
                        "target": "58"
                    },
                    {
                        "source": "62",
                        "target": "59"
                    },
                    {
                        "source": "62",
                        "target": "60"
                    },
                    {
                        "source": "62",
                        "target": "61"
                    },
                    {
                        "source": "63",
                        "target": "48"
                    },
                    {
                        "source": "63",
                        "target": "55"
                    },
                    {
                        "source": "63",
                        "target": "57"
                    },
                    {
                        "source": "63",
                        "target": "58"
                    },
                    {
                        "source": "63",
                        "target": "59"
                    },
                    {
                        "source": "63",
                        "target": "60"
                    },
                    {
                        "source": "63",
                        "target": "61"
                    },
                    {
                        "source": "63",
                        "target": "62"
                    },
                    {
                        "source": "64",
                        "target": "11"
                    },
                    {
                        "source": "64",
                        "target": "48"
                    },
                    {
                        "source": "64",
                        "target": "55"
                    },
                    {
                        "source": "64",
                        "target": "57"
                    },
                    {
                        "source": "64",
                        "target": "58"
                    },
                    {
                        "source": "64",
                        "target": "59"
                    },
                    {
                        "source": "64",
                        "target": "60"
                    },
                    {
                        "source": "64",
                        "target": "61"
                    },
                    {
                        "source": "64",
                        "target": "62"
                    },
                    {
                        "source": "64",
                        "target": "63"
                    },
                    {
                        "source": "65",
                        "target": "48"
                    },
                    {
                        "source": "65",
                        "target": "55"
                    },
                    {
                        "source": "65",
                        "target": "57"
                    },
                    {
                        "source": "65",
                        "target": "58"
                    },
                    {
                        "source": "65",
                        "target": "59"
                    },
                    {
                        "source": "65",
                        "target": "60"
                    },
                    {
                        "source": "65",
                        "target": "61"
                    },
                    {
                        "source": "65",
                        "target": "62"
                    },
                    {
                        "source": "65",
                        "target": "63"
                    },
                    {
                        "source": "65",
                        "target": "64"
                    },
                    {
                        "source": "66",
                        "target": "48"
                    },
                    {
                        "source": "66",
                        "target": "58"
                    },
                    {
                        "source": "66",
                        "target": "59"
                    },
                    {
                        "source": "66",
                        "target": "60"
                    },
                    {
                        "source": "66",
                        "target": "61"
                    },
                    {
                        "source": "66",
                        "target": "62"
                    },
                    {
                        "source": "66",
                        "target": "63"
                    },
                    {
                        "source": "66",
                        "target": "64"
                    },
                    {
                        "source": "66",
                        "target": "65"
                    },
                    {
                        "source": "67",
                        "target": "57"
                    },
                    {
                        "source": "68",
                        "target": "11"
                    },
                    {
                        "source": "68",
                        "target": "24"
                    },
                    {
                        "source": "68",
                        "target": "25"
                    },
                    {
                        "source": "68",
                        "target": "27"
                    },
                    {
                        "source": "68",
                        "target": "41"
                    },
                    {
                        "source": "68",
                        "target": "48"
                    },
                    {
                        "source": "69",
                        "target": "11"
                    },
                    {
                        "source": "69",
                        "target": "24"
                    },
                    {
                        "source": "69",
                        "target": "25"
                    },
                    {
                        "source": "69",
                        "target": "27"
                    },
                    {
                        "source": "69",
                        "target": "41"
                    },
                    {
                        "source": "69",
                        "target": "48"
                    },
                    {
                        "source": "69",
                        "target": "68"
                    },
                    {
                        "source": "70",
                        "target": "11"
                    },
                    {
                        "source": "70",
                        "target": "24"
                    },
                    {
                        "source": "70",
                        "target": "25"
                    },
                    {
                        "source": "70",
                        "target": "27"
                    },
                    {
                        "source": "70",
                        "target": "41"
                    },
                    {
                        "source": "70",
                        "target": "58"
                    },
                    {
                        "source": "70",
                        "target": "68"
                    },
                    {
                        "source": "70",
                        "target": "69"
                    },
                    {
                        "source": "71",
                        "target": "11"
                    },
                    {
                        "source": "71",
                        "target": "25"
                    },
                    {
                        "source": "71",
                        "target": "27"
                    },
                    {
                        "source": "71",
                        "target": "41"
                    },
                    {
                        "source": "71",
                        "target": "48"
                    },
                    {
                        "source": "71",
                        "target": "68"
                    },
                    {
                        "source": "71",
                        "target": "69"
                    },
                    {
                        "source": "71",
                        "target": "70"
                    },
                    {
                        "source": "72",
                        "target": "11"
                    },
                    {
                        "source": "72",
                        "target": "26"
                    },
                    {
                        "source": "72",
                        "target": "27"
                    },
                    {
                        "source": "73",
                        "target": "48"
                    },
                    {
                        "source": "74",
                        "target": "48"
                    },
                    {
                        "source": "74",
                        "target": "73"
                    },
                    {
                        "source": "75",
                        "target": "25"
                    },
                    {
                        "source": "75",
                        "target": "41"
                    },
                    {
                        "source": "75",
                        "target": "48"
                    },
                    {
                        "source": "75",
                        "target": "68"
                    },
                    {
                        "source": "75",
                        "target": "69"
                    },
                    {
                        "source": "75",
                        "target": "70"
                    },
                    {
                        "source": "75",
                        "target": "71"
                    },
                    {
                        "source": "76",
                        "target": "48"
                    },
                    {
                        "source": "76",
                        "target": "58"
                    },
                    {
                        "source": "76",
                        "target": "62"
                    },
                    {
                        "source": "76",
                        "target": "63"
                    },
                    {
                        "source": "76",
                        "target": "64"
                    },
                    {
                        "source": "76",
                        "target": "65"
                    },
                    {
                        "source": "76",
                        "target": "66"
                    }
                ],
                "categories": [
                    {
                        "name": "A"
                    },
                    {
                        "name": "B"
                    },
                    {
                        "name": "C"
                    },
                    {
                        "name": "D"
                    },
                    {
                        "name": "E"
                    },
                    {
                        "name": "F"
                    },
                    {
                        "name": "G"
                    },
                    {
                        "name": "H"
                    },
                    {
                        "name": "I"
                    }
                ]
            }
            myChart.hideLoading();
            graph.nodes.forEach(function (node) {
                node.label = {
                    show: node.symbolSize > 30
                };
            });
            option = {
                title: {
                    text: '社会网络',
                    top: 'top',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: (params) => {
                        if (params.componentType == 'markPoint') {
                            return params.data.name
                        }
                        if (params.dataType === 'edge') {
                            return params.data.source + '--' + this.netType + '-->' + params.data.target
                        } else if (params.dataType === 'node') {
                            return '<span>昵称</span>' + params.data.name +
                                '<br /><span>身份</span>' + params.data.category +
                                '<br /><span>职业</span>' + params.data.out +
                                '<br /><span>值1</span>' + params.data.in +
                                '<br /><span>值2</span>' + this.netType +
                                '<br /> [' + this.themeType + ']' + (window.location.href.split('/')[window.location.href.split('/').length - 3] == params.data.name.split('-')[1] ? '1' : '2') +
                                '<br /><span>3</span>' + (params.data.place == 1 ? '4' : params.data.place == 2 ? '5' : '6')
                        }
                    }
                },
                legend: [
                    {
                        // selectedMode: 'single',
                        data: graph.categories.map(function (a) {
                            return a.name;
                        }),
                        left: 'right',
                    }
                ],
                animationDuration: 1500,
                animationEasingUpdate: 'quinticInOut',
                series: [
                    {
                        name: '关注网络',
                        type: 'graph',
                        layout: 'none',
                        data: graph.nodes,
                        links: graph.links,
                        categories: graph.categories,
                        edgeSymbol: ['circle', 'arrow'],
                        edgeSymbolSize: [4, 6],
                        roam: true,
                        label: {
                            position: 'right',
                            formatter: '{b}'
                        },
                        lineStyle: {
                            color: 'source',
                            curveness: 0.3,

                        },
                        emphasis: {
                            focus: 'adjacency',
                            lineStyle: {
                                width: 10
                            }
                        }
                    }
                ]
            };
            myChart.setOption(option);
            myChart.on('click', function (param) {
                if (param.dataType === 'node') {
                    console.log(param.data)
                    window.open('https://cmooc.bnu.edu.cn/user/' + param.data.userId);
                }
            });

        },
    },


    setup() {
    },
}
</script>

<style scoped>
.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
    height: 100%;
}

.mat-10 {
    margin-top: 10px;
}

.wayfinding-content {
    height: 100px;
    background-color: #f2f2f2;
}

.el-link .el-icon--right.el-icon {
    vertical-align: text-bottom;
}
</style>

