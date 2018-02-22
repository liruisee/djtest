var x_data_list, y_data_list, div_id;

//判断2个列表的行数是否相等
function is_eq_length(list1, list2) {
    if(list1.length!=list2.length) {
        alert("x和y的行数不相等");
        return false;
    }else{
        return true;
    }
}

//柱状图函数
function make_bar(div_id, x_data_list, y_data_list) {
    //如果x和y的行数不相等，则直接退出
    if(!is_eq_length(x_data_list, y_data_list)){
        return;
    }

    //初始化data
    var _data=[], _ykeys=[], _labels=[];
    for(var i=0;i<x_data_list.length;i++){
        var tem_map={};
        tem_map['label']=x_data_list[i];
        for(var j in y_data_list[i]) {
            tem_map[j] = y_data_list[i][j];
        }
        _data.push(tem_map);
        tem_map={};
    };

    //初始化_ykey,_labels
    for(var k in y_data_list[0]){
        _ykeys.push(k);
        _labels.push(k);
    };

    //画柱状图
    Morris.Bar({
        element: div_id,
        data: _data,
        xkey: 'label',
        ykeys: _ykeys,
        labels: _labels,
        barRatio: 0.4,
        xLabelMargin: 10,
        hideHover: 'auto',
        barColors: ["#3d88ba", "#30a1ec"]
    })
}

//调用画柱状图函数
x_data_list=[1,2,3,4];
y_data_list=[[1,2],[2,3],[3,4],[5,6]];
div_id='hero-bar';
make_bar(div_id,x_data_list,y_data_list);


//环形图函数
function make_donut(div_id,x_data_list, y_data_list, is_percent) {
    var _data = [];
    //如果x和y的行数不相等，则直接退出
    if(!is_eq_length(x_data_list, y_data_list)){
        return;
    }

    //如果想要看百分比环形图，设置is_percent为yes
    if(is_percent==='yes'){
        var _sum = 0;
        for(var tem_num in y_data_list){
            if(isNaN(y_data_list[tem_num])){
               y_data_list[tem_num] = 0;
            }
            _sum += parseFloat(y_data_list[tem_num]);
        }

        //计算百分比
        for(var tem_num2 in y_data_list){
            y_data_list[tem_num2] = Math.round(parseFloat((parseFloat(y_data_list[tem_num2])/_sum).toFixed(2))*100);
        }
    }

    //数据或者百分比存入列表
    for(var i=0;i<y_data_list.length;i++){
        _data.push({'label':x_data_list[i], 'value':y_data_list[i]});
    }

    Morris.Donut({
        element: div_id,
        data: _data,
        colors: ["#30a1ec", "#76bdee", "#c4dafe"],
        formatter: function (value) {
            if (is_percent === 'yes') {
                return value.toString() + '%'
            } else {
                return value.toString()
            }
        }
    })
}

//调用环形图函数
_div_id = 'hero-donut';
_label_list = ['标签1', '标签2', '标签3', '标签4', '标签5'];
_data_list = [31,42,53,64,75];
make_donut(_div_id,_label_list,_data_list,'yes');


//折线图函数
function make_line(div_id, x_data_list, y_data_list) {
    if(!is_eq_length(x_data_list,y_data_list)){
        return
    }
    //写_data列表套字典的形式
    var _data = [], _xkey, _ykeys=[], _ylabel=[];
    for(var i=0;i<x_data_list.length;i++){
        var tem_map={};
        tem_map['label'] = x_data_list[i];
        for(var j in y_data_list[i]){
            tem_map[j] = y_data_list[i][j];
        }
        _data.push(tem_map);
    }

    //写_xkey和_ykey
    _xkey = 'label';
    var _xlabel = x_data_list;
    for(var i in y_data_list[0]){
        _ykeys.push(i);
        _ylabel.push(i);
    }
    //console.log(_data);
    //折线图
    Morris.Line({
        element: 'hero-graph',
        data: _data,
        xkey: _xkey,
        xLabels: "month",
        ykeys: _ykeys,
        labels: _ylabel
    });
}

//调用折线图函数
_div_id = 'hero-graph';
_label_list = ['2013-04', '2013-03', '2013-02', '2013-01', '2012-12', '2012-11', '2012-10', '2012-09'];
_data_list = [[2407,660],[3351,729],[2469,1318],[2246,461],[3171,1676],[2155,681],[1226,620],[2245,500]];
make_line(_div_id,_label_list,_data_list);


//面积图
function make_area(div_id, x_data_list, y_data_list) {
    if(!is_eq_length(x_data_list,y_data_list)){
        return
    }

    //写_data
    var _data = [], _xkey, _ykeys=[], _xlabel=[], _ylabel=[];
    for(var i=0;i<x_data_list.length;i++){
        var tem_map = {};
        tem_map['label'] = x_data_list[i];
        for(var j=0;j<y_data_list[i].length;j++ ){
            tem_map[j] = y_data_list[i][j];
        }
        _data.push(tem_map);
    }

    //写_xkey,_ykeys
    _xkey = 'label';
    for(var j=0;j<y_data_list[0].length;j++){
        _ykeys.push(j);
        _ylabel.push(j);
    }

    //面积图
    Morris.Area({
        element: div_id,
        data: _data,
        xkey: _xkey,
        ykeys: _ykeys,
        labels: x_data_list,
        lineWidth: 2,
        hideHover: 'auto',
        lineColors: ["#81d5d9", "#a6e182", "#67bdf8"]
    });
}

//调用面积图函数
var _div_id = 'hero-area';
var _label_list = ['2010 Q1', '2010 Q2', '2010 Q3', '2010 Q4', '2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4','2012 Q1','2012 Q2'];
var _data_list = [[2666,null,2647],[2778,2294,2441],[4912,1969,2501],[3767,3597,5689],[6810,1914,2293],
    [5670,4293,1881],[4820,3795,1588],[15073,5967,5175],[10687,4460,2028],[8432,5713,1791]];
make_area(_div_id,_label_list,_data_list);

//生成旋钮图
$(".knob").knob();


//图形格式
function labelFormatter(label, series) {
    return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" + label + "<br/>" + Math.round(series.percent) + "%</div>";
}


//画饼图
function make_pie(pie_div_id,x_data_list,y_data_list) {
    if(!is_eq_length(x_data_list,y_data_list)){
        return
    }

    //写_data
    var _data = [];
    for(var i=0;i<x_data_list.length;i++){
        var tem_map={};
        tem_map['label'] = x_data_list[i];
        tem_map['data'] = y_data_list[i];
        _data.push(tem_map);
    }

    ////饼图1
    $.plot("#"+pie_div_id, _data, {
        series: {
            pie: {
                show: true,
                radius: 1,
                label: {
                    show: true,
                    radius: 3/4,
                    formatter: labelFormatter,
                    background: {
                        opacity: 0.5,
                        color: '#000'
                    }
                }
            }
        },
        legend: {
            show: false
        }
    });
}

x_data_list = ['标签1','标签2','标签3','标签4','标签5','标签6'];
y_data_list = [1,2,3,4,5,6];
var pie_div_id1 = 'piechart1';
var pie_div_id2 = 'piechart2';
make_pie(pie_div_id1,x_data_list,y_data_list);
make_pie(pie_div_id2,x_data_list,y_data_list);