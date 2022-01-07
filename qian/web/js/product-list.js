layui.use(['table'], function () {
    var table = layui.table
        , form = layui.form;


    page({});
    //监听单元格事件11
    table.on('tool(demo)', function (obj) {
        var data = obj.data;
        if (obj.event === 'del') {
            layer.confirm('真的删除行么', function (index) {
                let res = myAjax("/back/product/delete", {id: data.id});
                console.log(res);
                if (res.count == 1) {
                    obj.del();
                    layer.close(index);
                    layui.msg("删除成功");
                } else {
                    layui.msg("删除失败");
                }

            });
        }else if (obj.event === 'edit'){
            //编辑
            sessionStorage.setItem("productId", data.id);
            // console.log(sessionStorage.getItem("userId"))
            xadmin.open('编辑', 'product-edit.html', 600, 400);
        }
    });
    //监听提交
    form.on('submit(sreach)',
        function (data) {
            data = data.field;
            console.log(data);
            //查询所有
            page(data);
            return false;
        });
});

function page(data) {
    // console.log(data);
    layui.use(['table'], function () {
        var table = layui.table
            , form = layui.form;
        table.render({
            elem: '#test'
            , url: '/back/product/findAll'
            , cellMinWidth: 80
            , where: data//传递到后台的值
            , cols: [[
                {field: 'id', title: 'ID', width: 100, unresize: true, sort: true}
                , {field: 'name', title: '律师服务产品名称'}
                , {field: 'price', title: '价格'}
                , {field: 'normalPrice', title: '正常价'}
                , {field: 'serviceTypeName', title: '律师服务类型'}
                , {field: 'content', title: '详细描述'}
                , {field: 'imgHref', title: '产品图片', minWidth: 120, sort: true, templet: '<div><img src="{{d.imgHref}}" width="30" height="30" ></div>'}
                ,{field:'enable', title:'是否启用', width:85, templet: '#switchTpl', unresize: true}
                , {fixed: 'right', title: '操作', width: 200, align: 'center', toolbar: '#barDemo'}
            ]]
            , page: true
        });
    });
}