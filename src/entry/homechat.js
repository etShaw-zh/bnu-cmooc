import * as echarts from 'echarts/core';
import { GridComponent, VisualMapComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
    GridComponent,
    VisualMapComponent,
    LineChart,
    CanvasRenderer,
    UniversalTransition
]);
const drawChat = (chatId, activityLine) => {
    const chart = echarts.init(document.getElementById(chatId));
    const option = {
        // Make gradient line here
        visualMap: [
            {
                show: false,
                type: 'continuous',
                seriesIndex: 0,
                min: 0,
                max: 400
            }
        ],
        grid: [
            {
                bottom: '85%'
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
}

fetch('https://cmooc.bnu.edu.cn/wp-admin/admin-ajax.php?action=from_bnu_online').then(res => res.json()).then(res => {
    console.log(res)
    // const data = res.data
    // for (let i = 0; i < data.length; i++) {
    //     drawChat(data[i].chatId, data[i].activityLine)
    // }
})

const data = [{
    title: '主题一：“互联网+教育”的基本原理',
    content: 'List item 1',
    time: '2021-05-01',
    views: '100',
    comments: '10',
    likes: '20',
    follows: '30',
    chatId: 'chat-1',
    activityLine: {
        time: ['2023-04-29', '2023-04-30', '2023-05-01', '2023-05-02', '2023-05-03', '2023-05-04', '2023-05-05'],
        count: [0, 0, 12, 23, 34, 15, 6],
    }
}, {
    title: '主题一：“互联网+教育”的基本原理',
    content: 'List item 1',
    time: '2021-05-01',
    views: '100',
    comments: '10',
    likes: '20',
    follows: '30',
    chatId: 'chat-2',
    activityLine: {
        time: ['2023-04-29', '2023-04-30', '2023-05-01', '2023-05-02', '2023-05-03', '2023-05-04', '2023-05-05'],
        count: [0, 0, 12, 23, 4, 45, 56],
    }
}, {
    title: '主题一：“互联网+教育”的基本原理',
    content: 'List item 1',
    time: '2021-05-01',
    views: '100',
    comments: '10',
    likes: '20',
    follows: '30',
    chatId: 'chat-3',
    activityLine: {
        time: ['2023-04-29', '2023-04-30', '2023-05-01', '2023-05-02', '2023-05-03', '2023-05-04', '2023-05-05'],
        count: [0, 0, 12, 23, 34, 1, 26],
    }
}]


for (let i = 0; i < data.length; i++) {
    drawChat(data[i].chatId, data[i].activityLine)
}

// drawChat('chat-1', {
//     time: ['2023-05-01', '2023-05-02', '2023-05-03', '2023-05-04', '2023-05-05'],
//     count: [12, 23, 34, 15, 6],
// })