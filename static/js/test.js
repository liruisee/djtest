$.ajax({
      type:"post",
      data: {'key':'12', 'value':'23'},
      url: "/myapp/ajax_post",
      async:true,
      success: function(ret){
          var key = ret['key'];
          var value = ret ['value'];
          var ajax_post = $(".ajax_post");
          ajax_post.empty();
          ajax_post.append(parseInt(key) + parseInt(value));
     },
     error: function(){
         alert("false");
     }
 });