layui.use(['form', 'layer', 'jquery', 'laydate'],
    function () {
        $ = layui.jquery;
        var form = layui.form
            , layer = layui.layer
            , laydate = layui.laydate;
        //日期
        laydate.render({
            elem: '#birthday',
            trigger: 'click'
        });

        //监听提交
        form.on('submit(edit)',
            function (data) {
                data = data.field;

                //发异步，把数据提交给java
                //提交之前，需要重新设置爱好
                //拿到复选框的所有的title的值
                let arr=[];
                $('input:checkbox[name=hobby]:checked').each(function() {
                    // console.log($(this).attr('checked'),11111)
                    // if ($(this).attr('checked') ==true) {
                    // 每次只能拿一个，需要将所有的值全部放在一起，则需要数组
                    //   val表示拿到value的值，
                    arr.push($(this).attr("title")) ;
                    // }
                });
                console.log(arr)
                data.hobby =arr.toLocaleString();
                data.id=sessionStorage.getItem("userId");
                console.log(data);
                let res = myAjax("http://localhost:8080/user/update", data);
                console.log(res);

                if (res != undefined && res.count == 1) {
                    layer.alert("更新成功", {
                            icon: 6
                        },
                        function () {
                            //关闭当前frame

                            xadmin.close();

                            // 可以对父窗口进行刷新 && res.count == 1
                            xadmin.father_reload();

                        });
                } else {
                    layer.alert("更新失败");
                }

                return false;
            });
    });
$(function () {
    let id = sessionStorage.getItem("userId");
    let res = myAjax("http://localhost:8080/user/findById", {id: id}, 'get');
//   将查询出来的数据进行赋值填充
    setData(res.data);
});

//赋值
function setData(data) {
    console.log(data);
//得到当前的div对象，对对象进行赋值
//     document.getElementsByName("username")[0].innerText=data.username;
//     document.getElementById("username").innerText=data.username;
    $("#username").val(data.username);
    $("#password").val(data.password);
    // $("input[name=username]")
    $("#email").val(data.email);
    $("#birthday").val(data.birthday);
    $("#sex").val(data.sex);
    //爱好
    let hobby = data.hobby;
    let arr = hobby.split(",");
    $('input:checkbox[name=hobby]').each(function () {
        // if ($(this).attr("title").match(hobby)) {//hobby包含title
        //     $(this).attr("checked", true);
        // }
        for (let i = 0; i < arr.length; i++) {
            if ($(this).attr("title") == arr[i]) {
                $(this).attr("checked", true);
            }
        }
    });
    $('input:radio[name=enable][value=' + data.enable + ']').attr("checked", true);
    layui.form.render();

}