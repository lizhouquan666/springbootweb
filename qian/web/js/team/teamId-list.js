$(function () {
    findTeamList();
});

function findTeamList() {
    let res = myAjax("/back/teamType/findAll", {enable: 1}, 'get');
//    需要对select赋值
    setTeamList(res.data);
}

function setTeamList(data) {
    layui.use(['form', 'layer', 'jquery', 'laydate'],
        function () {
            $ = layui.jquery;
            var form = layui.form;
            let html = '';
            for (let i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].id + '">' + data[i].name + '</option>';
            }
            $("#teamTypeName").html(html);

            form.render();
        });
}