$(function () {//页面加载完成执行里面的代码

//    如果想对某个标签赋值，则需要拿到对象，js通过id来拿
//     let username = "supeng";//这里面的登录名，应该是登录成功后将值传递到这个页面
    //怎么拿到url的值？
    // let url = 'http://localhost:8080/html/index.html?name=supeng&age=18';
    //首先以？隔开 ，得到两个字符，取右边的字符串name=supeng&age=18&sex=男
    // let arrayUrl = url.split('?');
    // console.log(arrayUrl, 'arrayUrl');
    // let value = arrayUrl[1];
    //以&隔开，取得多个字符串name=supeng，age=18，sex=男
    // let valueArray = value.split("&");
    // 对每个字符串进行 用=隔开，判断 左边为name的，则取name对应的值
    // for (let i = 0; i < valueArray.length; i++) {
    //     //name=supeng,以等号隔开，得到一个数组
    //     console.log(valueArray[i], 'valueArray[i]');
    //     let keyArray = valueArray[i].split('=');
    //     console.log(keyArray, 'keyArray');
    //     if (keyArray[0] == 'name') {
    //         console.log(keyArray[1],'--------------------------------');
    //         document.getElementById("loginName").innerHTML = keyArray[1];
    //     }
    // }

    // innerHTML和innerTEXT的区别？
    let username = sessionStorage.getItem("loginName");
    document.getElementById("loginName").innerHTML = username;
    //设定了一个定时器
    setInterval("setLoginTime()", "1000");
    // setLoginTime();

});
// 一个方法里面做一件事情
// 单一职责
//如果想要每一秒取读取，则需要每一秒取执行方法
// 有没有每一秒执行的方法？
function setLoginTime() {
//如果想要显示时间，则需要每一秒读取系统时间
//    怎么来读取系统时间，而且格式必须有年月日时分秒?
//     let time=new Date();
    // console.log(time.getDay()+"/"+(time.getMonth()+1)+"/"+time.getDate());
    let time1 = new Date().format("yyyy-MM-dd hh:mm:ss");//拿到系统时间

    $("#loginTime").html(time1);
}


Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}