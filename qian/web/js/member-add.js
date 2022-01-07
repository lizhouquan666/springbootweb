layui.use(['form', 'layer', 'jquery', 'laydate'],
    function () {
        $ = layui.jquery;
        var form = layui.form,
            layer = layui.layer
            , laydate = layui.laydate;
        //日期
        laydate.render({
            elem: '#birthday',
            trigger: 'click'
        });
        //自定义验证规则
        form.verify({
            username: [/[a-zA-Z]\w{5,15}/, "以字母开头的后面跟5到15个字母，数字，下划线"],
            password: [/(.+){6,12}$/, '密码必须6到12位'],
            repass: function (value) {
                if ($('#L_pass').val() != $('#L_repass').val()) {
                    return '两次密码不一致';
                }
            }
        });

        //监听提交
        form.on('submit(add)',
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
                console.log(data);

                let res = myAjax("http://localhost:8080/user/add", data);
                console.log(res);

                if (res != undefined && res.count == 1) {
                    layer.alert("增加成功", {
                            icon: 6
                        },
                        function () {
                            //关闭当前frameres.count == 1

                            xadmin.close();

                            // 可以对父窗口进行刷新res != undefined &&
                            xadmin.father_reload();

                        });
                } else {
                    layer.alert("增加失败");
                }

                return false;
            });

    });