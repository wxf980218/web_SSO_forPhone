$(function(){

    //档案管理界面JS
    var curMenu = null, zTree_Menu = null;
    var setting = {
        view: {
            showIcon: false,
            showLine: false,
            selectedMulti: false,
            dblClickExpand: false,
            addHoverDom: addHoverDom,   //增加
            removeHoverDom: removeHoverDom, //删除
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        edit: {
            enable: true,
            showRemoveBtn: true,
        },
        callback: {
            beforeClick: beforeClick,
            beforeRemove: beforeRemove,
            onClick: ztreeOnclick,
            beforeDrop: zTreeBeforeDrop            //拖拽函数
        }
    };

    var zNodes ;     /*定义全局变量，用来生成树*/
    var treeNodeInfo = null; /*定义全局变量，保存结点信息*/
    //从数据库获取数据
    $.ajax({
        type: 'POST',
        url: './archiveManagement.php',
        dataType: 'json',
        async:false,
        data:{
            'flag': 0

        },
        success:function (data) {
            zNodes = data;              //为zNode赋值
            // console.log(zNodes);
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        }
    });

    $.fn.zTree.init($("#treeDemo"), setting, zNodes);  //初始化

    //档案按钮
    $('#btnAr').unbind('click').bind('click',function () {
       if(treeNodeInfo ===null){
           alert('你没有选中结点！');
       }else{
           if(treeNodeInfo.level!=2){
               alert('结点不正确！');
           }else{
               window.location.href = 'archivesManagement.html';
           }
       }
    });


    // 添加新结点
    function addHoverDom(treeId, treeNode) {
        var newId = parseInt(((new Date()).valueOf())/1000);         //生产时间戳作为新节点的id
        var sObj = $("#" + treeNode.tId + "_span");
        if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
        var addStr = "<span class='button add' id='addBtn_" + treeNode.tId //id
            + "' title='添加' onfocus='this.blur();'></span>";  //添加按钮
        sObj.after(addStr);
        var btn = $("#addBtn_"+treeNode.tId);
        if (btn) btn.bind("click", function(){
            $("#modalAdd").modal({});        //调用添加模态框
            $('.closeModal,#modalAddconfirm').unbind('click').bind('click',function (event) {
                if(event.target.id == 'modalAddconfirm'){
                    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                    //尝试使用 ajax 添加结点
                    $.ajax({
                        type: 'POST',
                        url: './archiveManagement.php',
                        dataType: 'json',
                        async: false,
                        data: {
                            'id': treeNode.personId,
                            'deptId': newId,
                            'deptPid': treeNode.id,
                            'deptName': $('#addInput').val(),
                            'flag': 4
                        },
                        success:function (data) {
                            zNodes = data;
                            // console.log(data);
                        },
                        error:function () {

                            alert('操作失败!');
                        }
                    });

                    $.fn.zTree.init($("#treeDemo"), setting, zNodes);           //重新加载ztree树
                    zTree.selectNode(zTree.getNodeByParam("id",newId ),true);   //设置结点为选中状态
                    ztreeOnclick(event,'treeDemo',zTree.getNodeByParam("id",newId ));//将被选中的结点信息渲染到右边表格
                }

                $('#addInput').val('');
                $('#modalAdd').modal('toggle')          /*关闭模态框*/
            });

            return false;
        });
    }


    function removeHoverDom(treeId, treeNode) {
        $("#addBtn_"+treeNode.tId).unbind().remove();
    }

    //单击展开
    function beforeClick(treeId, treeNode) {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        zTree.expandNode(treeNode);
    }



    function ztreeOnclick(event,treeId, treeNode){
        treeNodeInfo = treeNode;
        window.localStorage.setItem('treeNodeInfo',JSON.stringify(treeNodeInfo));
        //尝试从oss_archivesmanagementtable表中获取一个人的记录
    }





    //删除节点操作
    function beforeRemove(treeId, treeNode) {
        $("#modalDel").modal({});   //调用bootstrap模态框
        $('#modalBody').append("确定删除" + treeNode.name + "?");       //为模态框动态添加内容
        $('.close,.closeModal,#confirm').unbind('click').bind('click',function (event) {
            if(event.target.id == 'confirm'){
                var zTree = $.fn.zTree.getZTreeObj(treeId);
                zTree.removeNode(treeNode);
                onRemove(treeNode);   //将删除的结点信息从数据库中删除
            }else if(event.target.class == 'close'){
                $('#modalBody').empty();
            }
            $('#modalBody').empty();                /*关闭模态框时将模态框内容置空*/
            $('#modalDel').modal('toggle') ;         /*关闭模态框*/
            return true;
        });
        return false;
    }
    //将删除的结点从数据库中删除
    function onRemove(treeNode) {
        console.log(treeNode.personId);
        $.ajax({
            type: 'POST',
            url: './archiveManagement.php',
            dataType: 'json',
            async: false,
            data:{
                'id': treeNode.personId,
                'deptId': treeNode.id,
                'flag': 3
            },
            success:function (data) {
                zNodes = data;
            },
            error:function () {
                alert('删除失败');
            }
        })
    }

    //拖拽结点
    function zTreeBeforeDrop(treeId, treeNodes, targetNode, moveType){

        $.ajax({
            type: 'POST',
            url: './archiveManagement.php',
            async: false,
            data:{
                'id': treeNodes[0].id,
                'deptPid': targetNode.pId,
                'flag': 5
            },
            success:function(data){
                console.log(data);
            },
            error:function () {
                alert('操作失败');
            }
        })

    }


    //搜索框回车进行搜索
    $('#searchContent').bind('keydown',function (event) {
        var event = window.event || arguments.callee.caller.arguments[0];
        if(event.keyCode == 13){
            search();
        }
    });

    //搜索框抖动动画
    jQuery.fn.shake = function (intShakes /*Amount of shakes*/, intDistance /*Shake distance*/, intDuration /*Time duration*/) {
        this.each(function () {
            var jqNode = $(this);
            jqNode.css({ position: 'relative' });
            for (var x = 1; x <= intShakes; x++) {
                jqNode.animate({ left: (intDistance * -1) }, (((intDuration / intShakes) / 4)))
                    .animate({ left: intDistance }, ((intDuration / intShakes) / 2))
                    .animate({ left: 0 }, (((intDuration / intShakes) / 4)));
            }
        });
        return this;
    };

    //搜索框搜索函数
    function search(){
        console.log(zNodes);
        let flag = false;
        var searchContent = $('#searchContent').val();
        //非数字字符串类型判断为以名字进行搜索
        if(typeof(searchContent) == 'string'&& !(/^\d+$/.test(searchContent))){
            zNodes.forEach(function (item) {
                if(searchContent == item.name){
                    //根据名字获取某个结点
                    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                    var treeNode = zTree.getNodeByParam("name",searchContent);
                    //设置结点为选中状态
                    zTree.selectNode(treeNode);
                    //调用ztreeOnclick 函数使结点信息渲染到右侧表格
                    ztreeOnclick(event,'treeDemo',treeNode);
                    flag = true;
                }
            })
        }else if(/^\d+$/.test(searchContent)){        /*数组类型字符串以工号进行搜寻*/
            zNodes.forEach(function (item) {
                if(searchContent == item.personId){

                    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                    var treeNode = zTree.getNodeByParam("personId",searchContent);
                    //设置结点为选中状态
                    zTree.selectNode(treeNode);
                    //调用ztreeOnclick 函数使结点信息渲染到右侧表格
                    ztreeOnclick(event,'treeDemo',treeNode);
                    flag = true;
                }
            })
        }
        if(flag == false){
            $('#searchContent').val('');
            $('#searchContent').attr('placeholder','请输入正确的名字或工号');
            $("#searchContent").shake(2, 10, 400);        /*调用抖动动画*/
        }
    }


});



