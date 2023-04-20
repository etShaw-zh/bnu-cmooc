<template>
    <el-dialog title='提示' v-model="isFollowPublicShow" :modal='false' width='60%' center>
        <p style='font-size: 16px; font-weight: bold'>扫码（左）添加“课程进群助手”，加入课程学习群；</p>
        <p style='font-size: 16px; font-weight: bold'>扫码（右）关注“课程服务号”，获取课程最新动态及未读消息提醒。</p>
        <div align='center' style='font-size: 16px !important;'>
            <el-image style='width: 80%; height: 80%; margin-top: 20px;' :src='publicUrl' :fit='publicFit'></el-image>
            <div style='margin-top: 20px'>
                <el-button size='small' type='primary' @click='isFollowPublicShow = false'>关闭</el-button>
                <el-button size='small' type='primary' @click='followPublicNotice'>不再提醒</el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            baseUrl: "https://cmooc.bnu.edu.cn/wp-admin/admin-ajax.php?action=",
            // eslint-disable-next-line no-undef
            isFollowPublicShow: cmooc_footer_script.is_follow_public_show == 'true' ? true : false,
            publicUrl: 'https://cmooc.bnu.edu.cn/wp-content/uploads/2022/12/wxpublicandasst.png',
            publicFit: 'contain'
        }
    },
    methods: {
        followPublicNotice() {
            var url = this.baseUrl + 'follow_public_notice&follow_public_status=off';
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.code == 200) {
                        this.isFollowPublicShow = false
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