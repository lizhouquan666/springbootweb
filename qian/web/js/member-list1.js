// $(function load() {
// //
// // });
// // layui.use('table', function () {
// //     var table = layui.table,
// //     form = layui.form;
// //     //监听工具条
// //     table.on('tool(demo)', function (obj) {
// //         var data = obj.data;
// //         if (obj.event === 'detail') {
// //             if (data.img != null) {
// //                 sessionStorage.setItem("picShow", data.img);
// //                 xadmin.open("图片", '/html/pic.html', 400, 450);
// //             } else {
// //                 layer.msg("没有图片,给我加！！！！");
// //             }
// //
// //             // layer.msg('ID：'+ data.id + ' 的查看操作');
// //         } else if (obj.event === 'del') {
// //             layer.confirm('真的删除行么', function (index) {
// //
// //                 let res = myAjax("/user/delete", {userId: data.id});
// //                 if (res.count == 1) {
// //                     obj.del();
// //                     layer.close(index);
// //                 } else {
// //                     layui.msg("删除失败");
// //                 }
// //
// //             });
// //         } else if (obj.event === 'edit') {
// //
// //             sessionStorage.setItem("userId", data.id);
// //             // console.log(sessionStorage.getItem("userId"))
// //             xadmin.open('编辑', 'member-edit.html', 600, 400);
// //         }
// //         //  else if(obj.event === 'editPass'){
// //         //
// //         //     xadmin.open('密码修改','/html/user/member-update-pass.html',600,400);
// //         // }
// //     });
// //     //1.4日
// //     page();
// //     form.on('submit(search)',
// //         function (data) {
// //             page(data.field);
// //             return false;
// //         });
// //
// //     form.on('switch(enableDemo)', function () {
// //         let data={
// //             id:this.value
// //         };
// //         console.log(data);
// //         $.ajax({
// //             url: "/user/enable",
// //             type: 'get',
// //             data: data,
// //             // async: false,
// //             dataType: 'json',
// //             success: function (data) {
// //                 console.log(data);
// //
// //             }
// //         });
// //     });
// //
// // });
// //
// // function page(data) {
// //     layui.use('table', function () {
// //         let table = layui.table,
// //             form = layui.form;
// //         table.render({
// //             elem: '#test'
// //             , url: '/user/findAll'
// //             , method: 'get'
// //             , cellMinWidth: 80
// //             , where: data
// //             , page: true
// //             , cols: [[
// //                 {field: 'id', width: 80, title: 'ID', sort: true}
// //                 , {field: 'username', width: 180, title: '用户名'}
// //                 , {field: 'sex', width: 80, title: '性别', sort: true}
// //                 , {field: 'phone', width: 150, title: '电话'}
// //                 , {field: 'birthday', title: '生日', width: 180, minWidth: 100, sort: true}
// //                 , {field: 'hobby', title: '爱好', sort: true}
// //                 , {
// //                     field: 'img', title: '图片', width: 130, style: 'height:100px;padding:0',
// //                     templet: function (data) {
// //                         let html = "";
// //                         if (data.img != null) {
// //                             html = "<img alt='图片' src='" + data.img + "' style='height: 30px; width: 30px;' onclick=''/>";
// //                         } else {
// //                             html = "<i class=\"layui-icon layui-icon-face-cry\" style=\"font-size: 25px; color: #ff0008;\"></i>";
// //                         }
// //                         return html;
// //                     }
// //                 }
// //                 , {field: 'enable', title: '状态', templet: '#switchTpl', sort: true}
// //                 , {fixed: 'right', title: '操作', width: 200, align: 'center', toolbar: '#barDemo'}
// //             ]]
// //         });
// //     });
// // }
// // //     table.render({
// // //         elem: '#test'
// // //         , url: '/user/findAll'
// // //         , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
// // //         , page: true
// // //         , cols: [[
// // //             {field: 'id', width: 80, title: 'ID', sort: true}
// // //             , {field: 'username', width: 180, title: '用户名'}
// // //             , {field: 'sex', width: 80, title: '性别', sort: true}
// // //             , {field: 'phone', width: 80, title: '电话'}
// // //             , {field: 'birthday', title: '生日', width: '30%', minWidth: 100} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
// // //             // , {field: 'enable', title: '状态', sort: true,templet:'<div>{{d.enable==1?"已启用":"已停用"}}</div>'}
// // //             , {field: 'enable', title: '状态', width: 150, templet: function (data) {
// // //                     return '<span class="layui-btn layui-btn-normal layui-btn-mini ' + (data.enable == 1 ? '' : 'layui-btn-disabled') + ' ">' + (data.enable == 1 ? '已启用' : '已停用') + '</span>';
// // //                 }
// // //             }
// // //             , {fixed: 'right', title: '操作', width: 200, align: 'center', toolbar: '#barDemo'}
// // //         ]]
// // //     });
// // // });


//-------------------------------------------------------------------------
$(function load() {

});
layui.use('table', function () {
    let table = layui.table,
        form = layui.form;
    //监听工具条
    table.on('tool(demo)', function (obj) {
        var data = obj.data;
        if (obj.event === 'detail') {

            if (data.img != null) {
                sessionStorage.setItem("picShow", data.img);
                xadmin.open("图片", '../pic.html', 400, 450);
            } else {
                layer.msg("没有图片,给我加！！！！");
            }
        } else if (obj.event === 'del') {
            console.log(data.id);
            layer.confirm('真的删除行么', function (index) {
                let res = myAjax("http://localhost:8080/user/delete", {id:data.id});
                if (res.count === 1) {
                    obj.del();
                    layer.close(index);
                } else {
                    layer.msg("删除失败");
                }
            });
        } else if (obj.event === 'edit') {

            sessionStorage.setItem("userId", data.id);
            xadmin.open('编辑', 'member-edit.html', 600, 400);
        }

    });
    page();
    form.on('submit(search)',
        function (data) {
            page(data.field);
            return false;
        });

    form.on('switch(enableDemo)', function () {
        let data={
            id:this.value
        };
        console.log(data);
        $.ajax({
            url: "http://localhost:8080/user/enable",
            type: 'get',
            data: data,
            // async: false,
            dataType: 'json',
            success: function (data) {
                console.log(data);

            }
        });
    });

});

function page(data) {
    layui.use('table', function () {
        let table = layui.table,
            form = layui.form;
        table.render({
            elem: '#test'
            , url: 'http://localhost:8080/user/findAll'
            , method: 'get'
            , cellMinWidth: 80
            , where: data
            , page: true
            , cols: [[
                {field: 'id', width: 80, title: 'ID', sort: true}
                , {field: 'username', width: 180, title: '用户名'}
                , {field: 'sex', width: 80, title: '性别', sort: true}
                , {field: 'phone', width: 150, title: '电话'}
                , {field: 'birthday', title: '生日', width: 180, minWidth: 100, sort: true}
                , {field: 'hobby', title: '爱好', sort: true}
                // , {
                //     field: 'img', title: '图片', width: 130, style: 'height:100px;padding:0',
                //     templet: function (data) {
                //         let html = "";
                //         if (data.img != null) {
                //             html = "<img alt='图片' src='" + data.img + "' style='height: 30px; width: 30px;' onclick=''/>";
                //         } else {
                //             html = "<i class=\"layui-icon layui-icon-face-cry\" style=\"font-size: 25px; color: #ff0008;\"></i>";
                //         }
                //         return html;
                //     }
                // }
                , {field: 'enable', title: '状态', templet: '#switchTpl', sort: true}
                , {fixed: 'right', title: '操作', width: 200, align: 'center', toolbar: '#barDemo'}
            ]]
        });
    });
}