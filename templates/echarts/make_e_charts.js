function make_line_chart(div_id, x_data_list, y_data_list, title, ) {
    var myChart = echarts.init($("#"+div_id));
    var option = {
        title: {
            //图表标题
            text: title
        },
        tooltip: {
            //每条线的悬浮标签
            trigger: 'axis'
        },
        legend: {
            //顶部图例
            data:x_data_list
        },
        grid: {
            //上下左右距离边缘的距离
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            //暂时不知道作用
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            //x轴标签属性
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis: {
            //y轴标签属性
            type: 'value'
        },

        //数据源
        series: [
            {
                name:'邮件营销',
                type:'line',
                stack: '总量',
                data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
                name:'联盟广告',
                type:'line',
                stack: '总量',
                data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
                name:'视频广告',
                type:'line',
                stack: '总量',
                data:[150, 232, 201, 154, 190, 330, 410]
            },
            {
                name:'直接访问',
                type:'line',
                stack: '总量',
                data:[320, 332, 301, 334, 390, 330, 320]
            },
            {
                name:'搜索引擎',
                type:'line',
                stack: '总量',
                data:[820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    };
}