$(function () { //代表页面加载完成执行里面的代码
    layui.use(['form', 'layer'], function () {// 因为我们用的是layui框架 ，所以需要加载里面的方法
        var form = layui.form;//得到form表单，有点想Java实例化对象
        // let layer=layui.layer;
        //layui的弹出框
        // layer.msg('玩命卖萌中', function(){
        //   //关闭后的操作
        //     console.log(11111111)
        //   });
        //自定义验证规则

        form.verify({
            username: [/[a-zA-Z]\w{5,15}/, "以字母开头的后面跟5到15个字母，数字，下划线"],
            password: [/(.+){6,12}$/, '密码必须6到12位']

        });
        //监听提交,默认onclick事件
        form.on('submit(login)', function (data) {
            // console.log(11);
            // alert(888)
            // data 得到当前form表单所有数据
            // console.log(data);
            //data.field 我们需要提交后台的值
            //JSON.stringify(data.field) 将data.field转换为字符串
            // layer.msg(JSON.stringify(data.field), function () {
            //     location.href = '/html/index.html'
            // });
            console.log(data.field);
            let username = data.field.username;
            //将数据传递给Java后台：
            // 需要用到ajax
            $.ajax({
                url: 'http://win10-2018bmpka:11111/api/a/user/login',//对应Java的注解地址
                data: JSON.stringify(data.field),//传递给Java的数据
                contentType: "application/json;charset=UTF-8",
                crossDomain:true,
                xhrFields: {
                    withCredentials: true
                },
                type: 'post',//对应servlet里面的方法get/post
                dataType: 'json',//java后台传递给前端的格式
                success: function (data) {//如果执行成功，data就是Java传递给前端的值
                    console.log(data);

                    if (data.data === 'codeErr') {
                        layer.msg('验证码不正确');
                    }
                    if (data.message === 'failed') {
                        layer.msg('用户名或者密码不正确');
                    }
                    if (data.message === 'success') {
                        layer.msg('登陆成功，即将跳转到后台管理页面', function () {
                            tokenHeader=data.data.tokenHead;
                            access_token=data.data.access_token;
                            sessionStorage.setItem("tokenHeader", tokenHeader);
                            sessionStorage.setItem("access_token", access_token);
                            console.log(tokenHeader);
                            console.log(access_token);

                            //页面之间相互传值
                            //1.get方式，url携带参数    loca
                            //
                            // tion.href = '/html/index.html?name=' + username;
                            //怎么拿到用户名输入文本的值？
                            // 1) 通过data.field.username拿值
                            //2）document.getElementsByName("username")[0].value;
                            //3)document.getElementById("username").value;
                            //2.通过cookie 淘汰，很多浏览器都不支持cookie
                            //3.h5技术
                            // Java 两个页面进行传值  session  application
                            //js  session  local
                            sessionStorage.setItem("loginName", username);
                            // localStorage.setItem("loginName", username);
                            location.href = '/html/index.html';
                        });

                    }
                }
            });
            return false;//表示不刷新页面
        });
    });
})

function freshCode(obj) {
//    等于重新加载这个图片，那么需要重新访问/code
//    怎么来得到当前的图片对象，就是对图片的src进行重新赋值
//     console.log(11);
    //如果每次访问后台的地址是一样的，则每次访问都是拿缓冲里面的数据
    // 需要修改访问地址，一边情况下加参数
    //这个参数应该每次不一样
    //1.可以加随机数，
    // let rondom=Math.random();
    // //2.可以加时间毫秒数
    let date = new Date();
    // date.getMilliseconds();
    // document.getElementById("code").src="/code?ie="+date.getMilliseconds();
    // console.log(22);
    // $("#code").src="/code?ie="+date.getMilliseconds();
    //js不能和jQuery混用
    // $("#code").attr("src","/code?ie="+date.getMilliseconds());
    // 如果没有id呢？
    // obj.src="/code?ie="+date.getMilliseconds();
    $(obj).attr("src", "http://win10-2018bmpka:11111/api/code/code/checkCode?ie=" + date.getMilliseconds());
}