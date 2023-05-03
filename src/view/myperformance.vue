<template>
    <div>
        <el-row style='margin-top:8px'>
            <el-col :xs='4' :sm='4' :md='6' :lg='6'>
                <el-avatar :size='48' :src='imgUrl'></el-avatar>
            </el-col>
            <el-col :xs='20' :sm='20' :md='18' :lg='18'>
                <p style='font-weight: normal; font-size: 12px; color: #333333;'>{{ displayName }}</p>
                <p style='font-weight: normal; font-size: 12px; line-height:18px; color: #8590A6; margin-top: 3px;'>您是cMOOC平台第<span style='color: #4285F4'>{{ userId
                }}</span>位学习者，您的【学号】是<span style='color: #4285F4'>{{ userId }}</span>，已学习<span
                        style='color: #4285F4'>{{ hereDays }}</span>天。</p>
            </el-col>
        </el-row>
        <el-divider></el-divider>
        <p style="text-align: center;"><span style='color: #8590A6;'>我的成就（我的 / 最大值）</span></p>
        <!-- <div id="my-performance-radar" style="text-align: center; height: 300px; width: 250px;"></div> -->
        <div style="margin-bottom: 15px; margin-top: 15px;">
            <span v-for="(item, index,) in radarData.progress" :key="index">
                <span style="color: gray; font-size: small;">{{ item.name }}</span>
                <el-progress :percentage="item.percent" :status="item.type">{{ item.text }}</el-progress>
            </span>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts/core';
import { TitleComponent, LegendComponent, GridComponent, TooltipComponent } from 'echarts/components';
import { RadarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer, GridComponent, TooltipComponent]);

export default {
    name: "App",
    data() {
        return {
            baseUrl: "https://cmooc.bnu.edu.cn/wp-admin/admin-ajax.php?action=",
            // eslint-disable-next-line no-undef
            imgUrl: cmooc_my_performance.imgUrl != 'undefind' ? cmooc_my_performance.imgUrl : "",
            // eslint-disable-next-line no-undef
            userId: cmooc_my_performance.userId != 'undefind' ? cmooc_my_performance.userId : 0,
            // eslint-disable-next-line no-undef
            displayName: cmooc_my_performance.displayName != 'undefind' ? cmooc_my_performance.displayName : "",
            // eslint-disable-next-line no-undef
            hereDays: cmooc_my_performance.hereDays != 'undefind' ? cmooc_my_performance.hereDays : 0,
            radarData: {
                indicator: [],
                maxValue: [],
                myValue: [],
            },
        }
    },
    mounted() {
        this.getMyPerformanceRadarData();
    },
    methods: {
        drawMyPerformanceRadar() {
            var chartDom = document.getElementById('my-performance-radar');
            var myChart = echarts.init(chartDom);
            var option;

            option = {
                color: ['#56A3F1', '#FF917C'],
                legend: {
                    left: 'left' // 'center' | 'left' | {number},
                },
                tooltip: {
                    trigger: 'axis'
                },
                radar: [
                    {
                        indicator: this.radarData.indicator,
                        center: ['50%', '55%'],
                        radius: 80,
                        axisName: {
                            color: '#fff',
                            backgroundColor: '#666',
                            borderRadius: 3,
                            padding: [3, 5],
                        }
                    }
                ],
                series: [
                    {
                        type: 'radar',
                        tooltip: {
                            trigger: 'item',
                            left: 'left',
                        },
                        emphasis: {
                            lineStyle: {
                                width: 4
                            }
                        },
                        data: [
                            {
                                value: this.radarData.maxValue,
                                name: '最大值',
                                symbol: 'rect',
                                symbolSize: 12,
                                lineStyle: {
                                    type: 'dashed'
                                },
                                label: {
                                    show: true,
                                    left: 'left',
                                    formatter: function (params) {
                                        return params.value;
                                    }
                                }
                            },
                            {
                                value: this.radarData.myValue,
                                name: '我的',
                                areaStyle: {
                                    color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
                                        {
                                            color: 'rgba(255, 145, 124, 0.1)',
                                            offset: 0
                                        },
                                        {
                                            color: 'rgba(255, 145, 124, 0.9)',
                                            offset: 1
                                        }
                                    ])
                                },
                            }
                        ]
                    }
                ]
            };

            option && myChart.setOption(option);
            myChart.resize();
        },
        getMyPerformanceRadarData() {
            var url = this.baseUrl + "cmooc_get_my_performance_data";
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.code == 200) {
                        this.radarData = data.data;
                        // this.drawMyPerformanceRadar();
                    } else {
                        this.$message.error(data.message);
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