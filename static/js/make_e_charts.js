//判断2个列表长度是否相等
function is_eq_length(list1, list2) {
    if(list1.length!=list2.length) {
        alert("list1和list2的行数不相等");
        console.log(list1);
        console.log(list2);
        return false;
    }else{
        return true;
    }
}

//将数据转换成符合要求的格式
function tran_data(y_data_list, y_label_list, chart_type_list) {
    if(!is_eq_length(y_data_list, chart_type_list)){
        return
    }
    var _data = [];
    //写入每组y值得名字与图表类型
    for(var i=0;i<y_label_list.length;i++){
        _data.push({});
        _data[i]['name'] = y_label_list[i];
        _data[i]['type'] = chart_type_list[i];
        //_data[i]['stack'] = '总量';
    }

    //遍历写入数值数据
    for(var i=0;i<y_data_list.length;i++){
        for(var j=0;j<y_data_list[i].length;j++){
            if('data' in _data[j]){
            _data[j]['data'].push(y_data_list[i][j]);
            }else{
               _data[j]['data'] = [y_data_list[i][j]];
            }
        }
    }
    return _data
}

//返回一个重复的图表的类型列表，如['line','line','line']
function type_list(type, len) {
    if(len.isNaN){
        alert("传入的长度为非数字");
        return []
    }
    var _len = parseInt(len);
    var re_list = [];
    for(var i=0;i<_len;i++){
        re_list.push(type);
    }
    return re_list
}


//画折线图
function make_line_chart(div_id, x_data_list, y_data_list, y_label_list, title) {
    //判定参数的长度是否正确，如果不正确则推出执行
    if(!is_eq_length(x_data_list, y_data_list) || !is_eq_length(y_data_list[0], y_label_list)){
        return
    }
    var myChart = echarts.init(document.getElementById(div_id));

    //开始写入_data
    var _char_type_list = type_list('line', y_data_list.length);
    var _data = tran_data(y_data_list, y_label_list, _char_type_list);

    //设置图的各个属性
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
            data:y_label_list
        },
        grid: {
            //上下左右距离边缘的距离
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                dataView: {show: true, readOnly: false},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        xAxis: {
            //x轴标签属性
            type: 'category',
            boundaryGap: false,
            data: x_data_list
        },
        yAxis: {
            //y轴标签属性
            type: 'value'
        },

        //数据源
        series: _data
    };

    //画图
    myChart.setOption(option);
}

//调用折线图

var x_data_list, y_data_list, y_label_list,div_id='line_chart';
x_data_list = ['周一','周二','周三','周四','周五','周六','周日'];
y_data_list = [
    [120, 220, 150, 320, 820],
    [132, 182, 232, 332, 932],
    [101, 191, 201, 301, 901],
    [134, 234, 154, 334, 934],
    [90, 290, 190, 390, 1290],
    [230, 330, 330, 330, 1330],
    [210, 310, 410, 320, 1320]
];
y_label_list = ['标签1', '标签2', '标签3', '标签4', '标签5'];
//make_line_chart(div_id, x_data_list, y_data_list, y_label_list, '折线图');


//画柱状图
function make_bar_chart(div_id, x_data_list, y_data_list, y_label_list, title) {
    //判定参数的长度是否正确，如果不正确则推出执行
    if(!is_eq_length(x_data_list, y_data_list) || !is_eq_length(y_data_list[0], y_label_list)){
        return
    }
    var myChart = echarts.init(document.getElementById(div_id));

    //开始写入_data
    var _char_type_list = type_list('bar', y_data_list.length);
    var _data = tran_data(y_data_list, y_label_list, _char_type_list);

    //颜色列表
    var colors = ['##FFC1C1', '##FFB90F', '##FFA54F', '#FF8C00', '#FF7F50', '#FF6EB4', '#FF4500' ,'#FF00FF'];

    var _yAxis = [];
    var tem_map;
    for(var j=0;j<y_label_list.length;j++){
        tem_map = {
            type: 'value',
            name: '',
            position: 'right',
            axisLine: {
                lineStyle: {
                    color: colors[j]
                }
            },
            axisLabel: {
                formatter: '{value}'
            }
        };
        _yAxis.push(tem_map);
    }

    //设置图的各个属性

    var option = {
        color: colors,
        title: {
            //图表标题
            text: title
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        grid: {
            right: '20%'
        },
        toolbox: {
            feature: {
                dataView: {show: true, readOnly: false},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        legend: {
            data:y_label_list
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                data: x_data_list
            }
        ],
        yAxis: _yAxis,
        series: _data
    };
    //画图
    myChart.setOption(option);
}

//调用画柱状图
div_id = 'hero-bar';
x_data_list = ['周一','周二','周三','周四','周五','周六','周日'];
y_data_list = [
    [120, 220, 150, 320, 820],
    [132, 182, 232, 332, 932],
    [101, 191, 201, 301, 901],
    [134, 234, 154, 334, 934],
    [90, 290, 190, 390, 1290],
    [230, 330, 330, 330, 1330],
    [210, 310, 410, 320, 1320]
];
y_label_list = ['标签1', '标签2', '标签3', '标签4', '标签5'];
make_bar_chart(div_id, x_data_list, y_data_list, y_label_list, '柱状图');


//画饼图
function make_pie_chart(div_id, label_list, value_list, title) {
    //判定参数的长度是否正确，如果不正确则推出执行
    if(!is_eq_length(label_list, value_list)){
        return
    }
    var myChart = echarts.init(document.getElementById(div_id));

    //开始写入_data
    var _data = [];
    var tem_map;
    for(var i=0;i<label_list.length;i++){
        tem_map = {};
        tem_map['name'] = label_list[i];
        tem_map['value'] = value_list[i];
        _data.push(tem_map);
    }

    //设置图的各个属性
    var option = {
        title:{
          text:title
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        toolbox: {
            feature: {
                dataView: {show: true, readOnly: false},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data:['直达','营销广告','搜索引擎','邮件营销','联盟广告','视频广告','百度','谷歌','必应','其他']
        },
        series: [
            {
                name:'主标签',
                type:'pie',
                label: {
                    normal: {
                        formatter: '{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                        backgroundColor: '#eee',
                        borderColor: '#aaa',
                        borderWidth: 1,
                        borderRadius: 4,
                        // shadowBlur:3,
                        // shadowOffsetX: 2,
                        // shadowOffsetY: 2,
                        // shadowColor: '#999',
                        // padding: [0, 7],
                        rich: {
                            a: {
                                color: '#999',
                                lineHeight: 22,
                                align: 'center'
                            },
                            // abg: {
                            //     backgroundColor: '#333',
                            //     width: '100%',
                            //     align: 'right',
                            //     height: 22,
                            //     borderRadius: [4, 4, 0, 0]
                            // },
                            hr: {
                                borderColor: '#aaa',
                                width: '100%',
                                borderWidth: 0.5,
                                height: 0
                            },
                            b: {
                                fontSize: 16,
                                lineHeight: 33
                            },
                            per: {
                                color: '#eee',
                                backgroundColor: '#334455',
                                padding: [2, 4],
                                borderRadius: 2
                            }
                        }
                    }
                },
                data:_data
            }
        ]
    };

    //画图
    myChart.setOption(option);
}

//调用画饼图
div_id = 'hero-donut';
var value_list = [335, 310, 234, 135, 1048, 251, 147, 102];
var label_list = ['直达', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他'];
make_pie_chart(div_id, label_list, value_list, '饼图');



//画地图（此方法暂时不可用）
function make_map_chart(div_id, city_list, value_list, title) {
    //判定参数的长度是否正确，如果不正确则推出执行
    if(!is_eq_length(city_list, value_list)){
        return
    }

    //初始化画图工具
    var myChart = echarts.init(document.getElementById(div_id));

    //数据标准化
    var data = [];
    for(var i=0;i<city_list.length;i++){
        data.push({'name':city_list[i], 'value':value_list[i]});
    }

    //每个城市的地理坐标
    var geoCoordMap = {
        '海门':[121.15,31.89],
        '鄂尔多斯':[109.781327,39.608266],
        '招远':[120.38,37.35],
        '舟山':[122.207216,29.985295],
        '齐齐哈尔':[123.97,47.33],
        '盐城':[120.13,33.38],
        '赤峰':[118.87,42.28],
        '青岛':[120.33,36.07],
        '乳山':[121.52,36.89],
        '金昌':[102.188043,38.520089],
        '泉州':[118.58,24.93],
        '莱西':[120.53,36.86],
        '日照':[119.46,35.42],
        '胶南':[119.97,35.88],
        '南通':[121.05,32.08],
        '拉萨':[91.11,29.97],
        '云浮':[112.02,22.93],
        '梅州':[116.1,24.55],
        '文登':[122.05,37.2],
        '上海':[121.48,31.22],
        '攀枝花':[101.718637,26.582347],
        '威海':[122.1,37.5],
        '承德':[117.93,40.97],
        '厦门':[118.1,24.46],
        '汕尾':[115.375279,22.786211],
        '潮州':[116.63,23.68],
        '丹东':[124.37,40.13],
        '太仓':[121.1,31.45],
        '曲靖':[103.79,25.51],
        '烟台':[121.39,37.52],
        '福州':[119.3,26.08],
        '瓦房店':[121.979603,39.627114],
        '即墨':[120.45,36.38],
        '抚顺':[123.97,41.97],
        '玉溪':[102.52,24.35],
        '张家口':[114.87,40.82],
        '阳泉':[113.57,37.85],
        '莱州':[119.942327,37.177017],
        '湖州':[120.1,30.86],
        '汕头':[116.69,23.39],
        '昆山':[120.95,31.39],
        '宁波':[121.56,29.86],
        '湛江':[110.359377,21.270708],
        '揭阳':[116.35,23.55],
        '荣成':[122.41,37.16],
        '连云港':[119.16,34.59],
        '葫芦岛':[120.836932,40.711052],
        '常熟':[120.74,31.64],
        '东莞':[113.75,23.04],
        '河源':[114.68,23.73],
        '淮安':[119.15,33.5],
        '泰州':[119.9,32.49],
        '南宁':[108.33,22.84],
        '营口':[122.18,40.65],
        '惠州':[114.4,23.09],
        '江阴':[120.26,31.91],
        '蓬莱':[120.75,37.8],
        '韶关':[113.62,24.84],
        '嘉峪关':[98.289152,39.77313],
        '广州':[113.23,23.16],
        '延安':[109.47,36.6],
        '太原':[112.53,37.87],
        '清远':[113.01,23.7],
        '中山':[113.38,22.52],
        '昆明':[102.73,25.04],
        '寿光':[118.73,36.86],
        '盘锦':[122.070714,41.119997],
        '长治':[113.08,36.18],
        '深圳':[114.07,22.62],
        '珠海':[113.52,22.3],
        '宿迁':[118.3,33.96],
        '咸阳':[108.72,34.36],
        '铜川':[109.11,35.09],
        '平度':[119.97,36.77],
        '佛山':[113.11,23.05],
        '海口':[110.35,20.02],
        '江门':[113.06,22.61],
        '章丘':[117.53,36.72],
        '肇庆':[112.44,23.05],
        '大连':[121.62,38.92],
        '临汾':[111.5,36.08],
        '吴江':[120.63,31.16],
        '石嘴山':[106.39,39.04],
        '沈阳':[123.38,41.8],
        '苏州':[120.62,31.32],
        '茂名':[110.88,21.68],
        '嘉兴':[120.76,30.77],
        '长春':[125.35,43.88],
        '胶州':[120.03336,36.264622],
        '银川':[106.27,38.47],
        '张家港':[120.555821,31.875428],
        '三门峡':[111.19,34.76],
        '锦州':[121.15,41.13],
        '南昌':[115.89,28.68],
        '柳州':[109.4,24.33],
        '三亚':[109.511909,18.252847],
        '自贡':[104.778442,29.33903],
        '吉林':[126.57,43.87],
        '阳江':[111.95,21.85],
        '泸州':[105.39,28.91],
        '西宁':[101.74,36.56],
        '宜宾':[104.56,29.77],
        '呼和浩特':[111.65,40.82],
        '成都':[104.06,30.67],
        '大同':[113.3,40.12],
        '镇江':[119.44,32.2],
        '桂林':[110.28,25.29],
        '张家界':[110.479191,29.117096],
        '宜兴':[119.82,31.36],
        '北海':[109.12,21.49],
        '西安':[108.95,34.27],
        '金坛':[119.56,31.74],
        '东营':[118.49,37.46],
        '牡丹江':[129.58,44.6],
        '遵义':[106.9,27.7],
        '绍兴':[120.58,30.01],
        '扬州':[119.42,32.39],
        '常州':[119.95,31.79],
        '潍坊':[119.1,36.62],
        '重庆':[106.54,29.59],
        '台州':[121.420757,28.656386],
        '南京':[118.78,32.04],
        '滨州':[118.03,37.36],
        '贵阳':[106.71,26.57],
        '无锡':[120.29,31.59],
        '本溪':[123.73,41.3],
        '克拉玛依':[84.77,45.59],
        '渭南':[109.5,34.52],
        '马鞍山':[118.48,31.56],
        '宝鸡':[107.15,34.38],
        '焦作':[113.21,35.24],
        '句容':[119.16,31.95],
        '北京':[116.46,39.92],
        '徐州':[117.2,34.26],
        '衡水':[115.72,37.72],
        '包头':[110,40.58],
        '绵阳':[104.73,31.48],
        '乌鲁木齐':[87.68,43.77],
        '枣庄':[117.57,34.86],
        '杭州':[120.19,30.26],
        '淄博':[118.05,36.78],
        '鞍山':[122.85,41.12],
        '溧阳':[119.48,31.43],
        '库尔勒':[86.06,41.68],
        '安阳':[114.35,36.1],
        '开封':[114.35,34.79],
        '济南':[117,36.65],
        '德阳':[104.37,31.13],
        '温州':[120.65,28.01],
        '九江':[115.97,29.71],
        '邯郸':[114.47,36.6],
        '临安':[119.72,30.23],
        '兰州':[103.73,36.03],
        '沧州':[116.83,38.33],
        '临沂':[118.35,35.05],
        '南充':[106.110698,30.837793],
        '天津':[117.2,39.13],
        '富阳':[119.95,30.07],
        '泰安':[117.13,36.18],
        '诸暨':[120.23,29.71],
        '郑州':[113.65,34.76],
        '哈尔滨':[126.63,45.75],
        '聊城':[115.97,36.45],
        '芜湖':[118.38,31.33],
        '唐山':[118.02,39.63],
        '平顶山':[113.29,33.75],
        '邢台':[114.48,37.05],
        '德州':[116.29,37.45],
        '济宁':[116.59,35.38],
        '荆州':[112.239741,30.335165],
        '宜昌':[111.3,30.7],
        '义乌':[120.06,29.32],
        '丽水':[119.92,28.45],
        '洛阳':[112.44,34.7],
        '秦皇岛':[119.57,39.95],
        '株洲':[113.16,27.83],
        '石家庄':[114.48,38.03],
        '莱芜':[117.67,36.19],
        '常德':[111.69,29.05],
        '保定':[115.48,38.85],
        '湘潭':[112.91,27.87],
        '金华':[119.64,29.12],
        '岳阳':[113.09,29.37],
        '长沙':[113,28.21],
        '衢州':[118.88,28.97],
        '廊坊':[116.7,39.53],
        '菏泽':[115.480656,35.23375],
        '合肥':[117.27,31.86],
        '武汉':[114.31,30.52],
        '大庆':[125.03,46.58]
    };

    //数据格式转换为地图模式
    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    };

    option = {
        backgroundColor: '#404a59',
        title: {
            text: title,
            subtext: 'data from PM25.in',
            sublink: 'http://www.pm25.in',
            left: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        tooltip : {
            trigger: 'item'
        },
        bmap: {
            center: [104.114129, 37.550339],
            zoom: 5,
            roam: true,
            mapStyle: {
                styleJson: [
                        {
                            "featureType": "water",
                            "elementType": "all",
                            "stylers": {
                                "color": "#044161"
                            }
                        },
                        {
                            "featureType": "land",
                            "elementType": "all",
                            "stylers": {
                                "color": "#004981"
                            }
                        },
                        {
                            "featureType": "boundary",
                            "elementType": "geometry",
                            "stylers": {
                                "color": "#064f85"
                            }
                        },
                        {
                            "featureType": "railway",
                            "elementType": "all",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {
                            "featureType": "highway",
                            "elementType": "geometry",
                            "stylers": {
                                "color": "#004981"
                            }
                        },
                        {
                            "featureType": "highway",
                            "elementType": "geometry.fill",
                            "stylers": {
                                "color": "#005b96",
                                "lightness": 1
                            }
                        },
                        {
                            "featureType": "highway",
                            "elementType": "labels",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {
                            "featureType": "arterial",
                            "elementType": "geometry",
                            "stylers": {
                                "color": "#004981"
                            }
                        },
                        {
                            "featureType": "arterial",
                            "elementType": "geometry.fill",
                            "stylers": {
                                "color": "#00508b"
                            }
                        },
                        {
                            "featureType": "poi",
                            "elementType": "all",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {
                            "featureType": "green",
                            "elementType": "all",
                            "stylers": {
                                "color": "#056197",
                                "visibility": "off"
                            }
                        },
                        {
                            "featureType": "subway",
                            "elementType": "all",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {
                            "featureType": "manmade",
                            "elementType": "all",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {
                            "featureType": "local",
                            "elementType": "all",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {
                            "featureType": "arterial",
                            "elementType": "labels",
                            "stylers": {
                                "visibility": "off"
                            }
                        },
                        {
                            "featureType": "boundary",
                            "elementType": "geometry.fill",
                            "stylers": {
                                "color": "#029fd4"
                            }
                        },
                        {
                            "featureType": "building",
                            "elementType": "all",
                            "stylers": {
                                "color": "#1a5787"
                            }
                        },
                        {
                            "featureType": "label",
                            "elementType": "all",
                            "stylers": {
                                "visibility": "off"
                            }
                        }
                ]
            }
        },
        series : [
            {
                name: 'pm2.5',
                type: 'scatter',
                coordinateSystem: 'bmap',
                data: convertData(data),
                symbolSize: function (val) {
                    return val[2] / 10;
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#ddb926'
                    }
                }
            },
            {
                name: 'Top 5',
                type: 'effectScatter',
                coordinateSystem: 'bmap',
                data: convertData(data.sort(function (a, b) {
                    return b.value - a.value;
                }).slice(0, 6)),
                symbolSize: function (val) {
                    return val[2] / 10;
                },
                showEffectOn: 'emphasis',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#f4e925',
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                zlevel: 1
            }
        ]
    };
    //画图
    console.log(data[0]);
    myChart.setOption(option);
}

//调用画地图
div_id = 'map_chart';
var city_list = ['海门','鄂尔多斯','招远','舟山','齐齐哈尔','盐城','赤峰','青岛','乳山','金昌','泉州','莱西','日照','胶南','南通','拉萨','云浮','梅州','文登',
'上海','攀枝花','威海','承德','厦门','汕尾','潮州','丹东','太仓','曲靖','烟台','福州','瓦房店','即墨','抚顺','玉溪','张家口','阳泉','莱州','湖州',
'汕头','昆山','宁波','湛江','揭阳','荣成','连云港','葫芦岛','常熟','东莞','河源','淮安','泰州','南宁','营口','惠州','江阴','蓬莱','韶关','嘉峪关',
'广州','延安','太原','清远','中山','昆明','寿光','盘锦','长治','深圳','珠海','宿迁','咸阳','铜川','平度','佛山','海口','江门','章丘','肇庆','大连',
'临汾','吴江','石嘴山','沈阳','苏州','茂名','嘉兴','长春','胶州','银川','张家港','三门峡','锦州','南昌','柳州','三亚','自贡','吉林','阳江','泸州',
'西宁','宜宾','呼和浩特','成都','大同','镇江','桂林','张家界','宜兴','北海','西安','金坛','东营','牡丹江','遵义','绍兴','扬州','常州','潍坊','重庆',
'台州','南京','滨州','贵阳','无锡','本溪','克拉玛依','渭南','马鞍山','宝鸡','焦作','句容','北京','徐州','衡水','包头','绵阳','乌鲁木齐','枣庄','杭州',
'淄博','鞍山','溧阳','库尔勒','安阳','开封','济南','德阳','温州','九江','邯郸','临安','兰州','沧州','临沂','南充','天津','富阳','泰安','诸暨','郑州',
'哈尔滨','聊城','芜湖','唐山','平顶山','邢台','德州','济宁','荆州','宜昌','义乌','丽水','洛阳','秦皇岛','株洲','石家庄','莱芜','常德','保定','湘潭',
'金华','岳阳','长沙','衢州','廊坊','菏泽','合肥','武汉','大庆'];
value_list = [9,12,12,12,14,15,16,18,18,19,21,21,21,22,23,24,24,25,25,25,25,25,25,26,26,26,27,27,27,28,29,30,30,31,31,31,31,32,32,32,33,33,33,34,34,35,35,36,36,36,36,
36,37,37,37,37,37,38,38,38,38,39,39,39,39,40,40,41,41,42,43,43,44,44,44,44,45,45,46,47,47,47,49,50,50,50,51,51,52,52,52,53,54,54,54,54,56,56,57,57,57,58,
58,58,58,59,59,59,59,60,61,62,62,63,63,63,64,64,65,66,67,67,70,71,71,71,72,72,72,72,75,75,79,79,80,80,80,84,84,84,85,86,86,86,90,90,92,93,95,96,98,99,99,
100,103,104,105,106,112,112,113,114,116,117,119,119,119,120,120,127,130,132,133,134,136,143,147,148,152,153,154,157,169,175,177,193,194,229,273,279];
//make_map_chart(div_id, city_list, value_list, '地图');
