// $(function () {
//     findAll({page: 1, limit: 10});
//
// });
//----------------------------------------------------------------------------
// function findAll(data) {
//     $.ajax({
//         url: 'http://localhost:8080/user/findAll',
//         data: data,
//         type: 'get',
//         dataType: 'json',
//         success: function (res) {
//             console.log(res);
//             setList(res.data);
//         }
//     });
// }
//
// function setList(data) {
//     //里面的数据都是来源于数据库，所以，需要查询后台
//     //就像登录一样，我们需要在后台得到数据，则，需要通过ajax
//     let html = '';
//     for (let i = 0; i < data.length; i++) {
//         html += '<tr>\n' +
//             '\n' +
//             '<td>' + data[i].id + '</td>\n' +
//             '<td>' + data[i].username + '</td>\n' +
//             '<td>' + (data[i].sex == undefined ? '' : data[i].sex) + '</td>\n' +
//             '<td>' + (data[i].phone == undefined ? '' : data[i].phone) + '</td>\n' +
//             '<td>' + (data[i].address == undefined ? '' : data[i].address) + '</td>\n' +
//             '<td>' + (data[i].birthday == undefined ? '' : data[i].birthday) + '</td>\n' +
//             '<td>' + (data[i].hobby == undefined ? '' : data[i].hobby) + '</td>\n' +
//             '<td class="td-status">\n' +
//             '<span class="layui-btn layui-btn-normal layui-btn-mini ' + (data[i].enable == 1 ? '' : 'layui-btn-disabled') + ' ">' + (data[i].enable == 1 ? '已启用' : '已停用') + '</span></td>\n' +
//             '<td class="td-manage">\n' +
//             '<a onclick="member_stop(this,\'10001\')" href="javascript:;"  title="' + (data[i].enable == 1 ? '启用' : '停用') + '">\n' +
//             '<i class="layui-icon">' + (data[i].enable == 1 ? '&#xe601;' : '&#xe62f;') + '</i>\n' +
//             '</a>\n' +
//             '<a title="编辑"  onclick="memberEdit(' + data[i].id + ')" href="javascript:;">\n' +
//             '<i class="layui-icon">&#xe642;</i>\n' +
//             '</a>\n' +
//             '<a onclick="xadmin.open(\'修改密码\',\'member-update-pass.html\',600,400)" title="修改密码" href="javascript:;">\n' +
//             '<i class="layui-icon">&#xe631;</i>\n' +
//             '</a>\n' +
//             '<a title="删除" onclick="member_del(this,' + data[i].id + ')" href="javascript:;">\n' +
//             '<i class="layui-icon">&#xe640;</i>\n' +
//             '</a>\n' +
//             '</td>\n' +
//             '</tr>';
//     }
//
//     $("#tbody").html(html);
// }
//
// function memberEdit(id) {
//     sessionStorage.setItem("userId", id);
//     xadmin.open('编辑', 'member-edit.html', 600, 400);
// }
//
// layui.use(['laydate', 'form'], function () {
//     var laydate = layui.laydate;
//     var form = layui.form;
//
//
//     // 监听全选
//     form.on('checkbox(checkall)', function (data) {
//
//         if (data.elem.checked) {
//             $('tbody input').prop('checked', true);
//         } else {
//             $('tbody input').prop('checked', false);
//         }
//         form.render('checkbox');
//     });
//
//     //执行一个laydate实例
//     laydate.render({
//         elem: '#start' //指定元素
//     });
//
//     //执行一个laydate实例
//     laydate.render({
//         elem: '#end' //指定元素
//     });
//
//
// });
//
// /*用户-停用*/
// function member_stop(obj, id) {
//     layer.confirm('确认要停用吗？', function (index) {
//
//         if ($(obj).attr('title') == '启用') {
//
//             //发异步把用户状态进行更改
//             $(obj).attr('title', '停用')
//             $(obj).find('i').html('&#xe62f;');
//
//             $(obj).parents("tr").find(".td-status").find('span').addClass('layui-btn-disabled').html('已停用');
//             layer.msg('已停用!', {icon: 5, time: 1000});
//
//         } else {
//             $(obj).attr('title', '启用')
//             $(obj).find('i').html('&#xe601;');
//
//             $(obj).parents("tr").find(".td-status").find('span').removeClass('layui-btn-disabled').html('已启用');
//             layer.msg('已启用!', {icon: 5, time: 1000});
//         }
//
//     });
// }
//
//
// function delAll(argument) {
//     var ids = [];
//
//     // 获取选中的id
//     $('tbody input').each(function (index, el) {
//         if ($(this).prop('checked')) {
//             ids.push($(this).val())
//         }
//     });
//
//     layer.confirm('确认要删除吗？' + ids.toString(), function (index) {
//         //捉到所有被选中的，发异步进行删除
//         layer.msg('删除成功', {icon: 1});
//         $(".layui-form-checked").not('.header').parents('tr').remove();
//     });
// }
//
// /*用户-删除*/
// function member_del(obj, id) {
//     layer.confirm('确认要删除吗？', function (index) {
//         //发异步删除数据
//         $.ajax({
//             url: 'http://localhost:8080/user/delete',
//             data: {id: id},
//             type: 'post',
//             dataType: 'json',
//             success: function (res) {
//                 console.log(res);
//                 if (res.count == 1) {
//                     $(obj).parents("tr").remove();
//                     layer.msg('已删除!', {icon: 1, time: 1000});
//                 } else {
//                     layer.msg('删除失败!', {icon: 1, time: 1000});
//                 }
//
//             }
//         });
//
//     });
// }
//
//
// layui.use(['laypage', 'layer', 'form'], function () {
//     var laypage = layui.laypage
//         , layer = layui.layer;
//     var form = layui.form;
//     //完整功能
//     // let res=myAjax("/backhttp://localhost:8080/user/count",{},'get');
//     page({});
//     //监听提交
//     form.on('submit(sreach)',
//         function (data) {
//             data = data.field;
//
//             //发异步，把数据提交给java
//             //提交之前，需要重新设置爱好
//             //拿到复选框的所有的title的值
//             let arr = [];
//             $('input:checkbox[name=hobby]:checked').each(function () {
//                 // console.log($(this).attr('checked'),11111)
//                 // if ($(this).attr('checked') ==true) {
//                 // 每次只能拿一个，需要将所有的值全部放在一起，则需要数组
//                 //   val表示拿到value的值，
//                 arr.push($(this).attr("title"));
//                 // }
//             });
//
//             data.hobby = arr.toLocaleString();
//             console.log(data);
//
//             //查询所有
//             page(data);
//
//             return false;
//         });
// });
// function page(data) {
//     layui.use(['laypage', 'layer'], function () {
//         var laypage = layui.laypage
//             , layer = layui.layer;
//         //完整功能
//         // let res=myAjax("/backhttp://localhost:8080/user/count",{},'get');
//         laypage.render({
//             elem: 'page'
//             , count: myAjax("http://localhost:8080/user/count", data, 'get').count
//             , layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip']
//             , jump: function (obj) {
//                 console.log(obj)
//                 // let page = {page: obj.curr, limit: obj.limit};
//                 //涉及到对象相加data+page;
//                 data.page=obj.curr;
//                 data.limit=obj.limit;
//                 findAll(data);
//             }
//         });
//     });
// }