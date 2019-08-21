$(function () {
    var selectedPersonInfo;
    var treeNode = JSON.parse(window.localStorage.getItem('treeNodeInfo'));
    $.ajax({
        type: 'POST',
        url: './archiveManagement.php',
        dataType: 'json',
        async: false,
        data: {
            'id': treeNode.personId,
            'flag': 1
        },
        success:function (data) {
            selectedPersonInfo = data;
        },
        error:function () {
            alert('错误了！');
        }
    });

    /*显示档案管理信息*/
    $('#name').val(selectedPersonInfo[0].name);
    $('#idNumber').val(selectedPersonInfo[0].personIDNum);
    if(selectedPersonInfo[0].gender == 1){
        $('#genderSelect').val('男');
    }else{
        $('#genderSelect').val('女');
    }
    $('#phoneNumber').val(selectedPersonInfo[0].phoneNum);
    $('#jobNumber').val(selectedPersonInfo[0].jobNum);
    $('#position').val(selectedPersonInfo[0].jobPosition);
    $('#school').val(selectedPersonInfo[0].school);
    $('#s_province').append($('<option>', {
        text: selectedPersonInfo[0].familyAdd_province,
        selected: true
    }));

    $('#s_city').append($('<option>', {
        text: selectedPersonInfo[0].familyAdd_city,
        selected: true
    }));

    $('#eduBack').val(selectedPersonInfo[0].eduBackground);

    $('#4321').append($('<option>', {
        text: selectedPersonInfo[0].nativePlace_province,
        selected: true
    }));

    $('#1234').append($('<option>', {
        text: selectedPersonInfo[0].nativePlace_city,
        selected: true
    }));
    $("input[type=radio][name=options]").val([selectedPersonInfo[0].politicsBackground]);

    $('#entryTime').val(selectedPersonInfo[0].entryTime);
    $('#demo1').attr('src', selectedPersonInfo[0].photo); //图片链接（base64）

    //点击修改按钮实现表格可编辑
    $('#archivesChange').unbind('click').bind('click',function () {
        alert('你现在可以修改啦！');
        $('input').attr("disabled",false);
        $('select').attr('disabled',false);
    });

    //点击保存按钮将修改的数据保存到数据库中
    $('#archivesSave').unbind('click').bind('click',function () {
        // 获取当前选中的结点
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        var currentNode = zTree.getSelectedNodes()[0];

        //尝试修改数据库中的数据
        $('#saveConfirm').unbind('click').bind('click',function () {
            $.ajax({
                type: 'POST',
                url: './archiveManagement.php',
                dataType: 'json',
                async: false,
                data:{
                    'name': $('#name').val(),
                    'personIDNum': $('#idNumber').val(),
                    'gender': $('#genderSelect').val(),
                    'phoneNum': $('#phoneNumber').val(),
                    'jobNum': $('#jobNumber').val(),
                    'jobPosition': $('#position').val(),
                    'school': $('#school').val(),
                    'familyAdd_province': $('#s_province').val(),
                    'familyAdd_city': $('#s_city').val(),
                    'eduBackground': $('#eduBack').val(),
                    'nativePlace_province': $('#s_province1').val(),
                    'nativePlace_city': $('#s_city1').val(),
                    'politicsBackground': $("input[type=radio][name=options]:checked").val(),
                    'entryTime': $('#entryTime').val(),
                    'id': currentNode.personId,
                    'flag': 2
                },
                success:function (data) {
                    zNodes = data;
                },
                error:function () {
                    alert('失败了');
                }
            });
            $('#modalSave').modal('toggle');
        });
        $('.main input').attr("disabled",true);
        $('select').attr('disabled',true);
    });

//    图片上传
    layui.use('upload', function(){
        var $ = layui.$
            ,upload = layui.upload;
        var uploadInst = upload.render({
            elem: '#upPhoto'

            ,url: './archiveManagement.php',
            method: 'POST',
            data:{
                'flag': 8,
                'id': function () {
                    try {
                        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                        var currentNode = zTree.getSelectedNodes()[0];
                        return currentNode.personId;
                    }catch (e) {
                        alert('未选择人员')
                    }
                }

            }
            ,before: function(obj){
                //预读本地文件示例，不支持ie8
                obj.preview(function(index, file, result){
                    $('#demo1').attr('src', result); //图片链接（base64）
                });
            }
            ,done: function(res){
                //如果上传失败
                if(res.code > 0){
                    return layer.msg('上传失败');
                }
                //上传成功
                console.log(res)
            }
        });
    });

    // //城市联动
    _init_area();
    _init_area1();

    layui.use('laydate', function(){
        var laydate = layui.laydate;

        //常规用法
        laydate.render({
            elem: '#entryTime'
        });
    });

});