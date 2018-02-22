//ajax get请求数据
function ajax_get_page(url,data,thead_id,tbody_id) {
    $.ajax({
        type:'get',
        url:url,
        data:data,
        async:false,
        success:function (ret) {
            write_table(ret,thead_id,tbody_id,500);
        }
    })
}

//写table数据
function write_table(res_data,thead_id,tbody_id,timeout) {
    var head_list = res_data['head_list'];
    var data_list = res_data['data_list'];
    var thead_obj = $("#"+thead_id);
    var tbody_obj = $("#"+tbody_id);
    thead_obj.empty();
    tbody_obj.empty();
    setTimeout(function () {
        //写表head
        var tem_str="<tr>";
        for(var tem_head in head_list){
            tem_str+="<th style='white-space:nowrap;text-align:center;vertical-align:middle'>" + head_list[tem_head] + "</th>";
        };
        tem_str+="</tr>";
        thead_obj.append(tem_str);

        //写表body
        tem_str="";
        for(var row in data_list){
            tem_str+="<tr>";
            for(var data in data_list[row]){
                tem_str+="<td style='white-space:nowrap;text-align:center;vertical-align:middle'>"+data_list[row][data]+"</td>"
            }
            tem_str+="</tr>"
        }
        tbody_obj.append(tem_str);
    },timeout)
}