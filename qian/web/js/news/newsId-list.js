$(function () {
    findNewsList();
});

function findNewsList() {
    let res = myAjax("http://localhost:8080/news/findNewId", {enable: 1}, 'get');
//    需要对select赋值
    setNewsList(res.data);
}

function setNewsList(data) {
    layui.use(['form', 'layer', 'jquery', 'laydate'],
        function () {
            $ = layui.jquery;
            var form = layui.form;
            let html = '';
            for (let i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].id + '">' + data[i].name + '</option>';
            }
            $("#newsTypeName").html(html);

            form.render();
        });
}