layui.use(['table'], function () {
    var table = layui.table
        , form = layui.form;


    page({});
    //监听单元格事件11
    table.on('tool(demo)', function (obj) {
        var data = obj.data;
        if (obj.event === 'del') {
            layer.confirm('真的删除行么', function (index) {
                let res = myAjax("http://localhost:11111/api/p/product/delete", {id: data.id});
                console.log(res);
                if (res.count == 1) {
                    obj.del();
                    layer.close(index);
                    layer.msg("删除成功");
                } else {
                    layer.msg("删除失败");
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
    form.on('switch(enableDemo)', function () {
        let data={
            id:this.value
        };
        console.log(data);
        $.ajax({
            url: "http://localhost:11111/api/p/product/enable",
            type: 'get',
            data: data,
            crossDomain:true,
            xhrFields: {
                withCredentials: true
            },
            // async: false,
            dataType: 'json',
            success: function (data) {
                console.log(data);

            }
        });
    });
});
//图片问题
function page(data) {
    // console.log(data);
    layui.use(['table'], function () {
        var table = layui.table
            , form = layui.form;
        table.render({
            elem: '#test'
            , url: 'http://localhost:11111/api/p/product/findAll'
            , method: 'get'
            , cellMinWidth: 80
            , where: data//传递到后台的值
            , page: true
            , cols: [[
                {field: 'id', title: 'ID', width: 100, unresize: true, sort: true}
                , {field: 'name', title: '律师服务产品名称'}
                , {field: 'price', title: '价格'}
                , {field: 'normalPrice', title: '正常价'}
                , {field: 'serviceTypeName', title: '律师服务类型'}
                , {field: 'content', title: '详细描述'}
                , {
                    field: 'imgHref', title: '产品图片', width: 130, style: 'height:100px;padding:0',
                    templet: function (data) {
                        let html = "";
                        if (data.imgHref != null) {
                            html = "<img alt='图片' src='" + data.imgHref + "' style='height: 30px; width: 30px;' onclick=''/>";
                        } else {
                            html = "<i class=\"layui-icon layui-icon-face-cry\" style=\"font-size: 25px; color: #ff0008;\"></i>";
                        }
                        return html;
                    }
                }
                // , {field: 'imgHref', title: '产品图片', minWidth: 120, sort: true, templet: '<div><img src="{{d.imgHref}}" width="30" height="30" ></div>'}
                , {field: 'enable', title: '状态', templet: '#switchTpl', sort: true}
                , {fixed: 'right', title: '操作', width: 200, align: 'center', toolbar: '#barDemo'}
            ]]

        });
    });
}