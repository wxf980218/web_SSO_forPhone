var setting = {
    view:{
        dblClickExpand: false
    },
    check: {
        enable: true
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback:{
        beforeClick: beforeClick,
    }
};
var zCheckNodes;  /*定义全局变量 用于保存树节点数据*/


function beforeClick(treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("treeCheck");
    zTree.expandNode(treeNode);
}

var checkedNodes;                    //定义全局变量用于存储被选中的人员名单
//工资管理界面导入人员名单
$('#importPersion').unbind('click').bind('click',function () {
    $.ajax({
        type: 'POST',
        url: './archiveManagement.php',
        dataType: 'json',
        async: false,
        data:{
            'flag': 0
        },
        success:function (data) {
            zCheckNodes = data;
            $.fn.zTree.init($("#treeCheck"), setting, zCheckNodes);     //初始化树
        },
        error:function () {
            console.log('操作失败！')
        }
    });
    $('#confimImport').unbind('click').bind('click',function () {
        var checkedId = [];               //记录被选择的人的ID
       var zTreeObj = $.fn.zTree.getZTreeObj("treeCheck");
       checkedNodes = zTreeObj.getCheckedNodes();
       for(let i=0; i < checkedNodes.length; i++){
           if(checkedNodes[i].pId < 10){
               checkedNodes.splice(i,1);
               i--;
           }
       }
       var td = '';
       var td1 = '<tr>';
       var m = 1;
       for(let i = 0; i < $('.checkbox').length;i++){
           if($('.checkbox:eq('+i+')').prop('checked')){
               //选中
               if(m<=5){
                   td = td +  '<td>√</td>';
                   m++;
               }
               else{
                   td1 = td1 +'<td>√</td>';
               }
           }else{
               //未选中
               if(m<=5){
                   td = td + '<td></td>';
                   m++;
               }
               else{
                   td1 = td1 +'<td></td>';
               }
           }
       }
       for(let i = 0;i < checkedNodes.length; i++){
           //向后台发起 ajax 请求获取工号
           $.ajax({
               type: 'POST',
               url: './archiveManagement.php',
               // dataType: 'json',
               async: false,
               data:{
                   'id': checkedNodes[i].personId,
                   'flag': 6
               },
               success:function (data) {
                   checkedNodes[i].jobNum = data;
               },
               error:function () {
                    alert('操作失败!')
               }
           });
           $("#peopleTable").append(
               '<tr>' +
               '<td class = "personId">'+ checkedNodes[i].jobNum + '</td><td>'+ checkedNodes[i].name + td +td1+'<td><img src = "imgs/delete.png" class = "peopleDel" title = "删除"></td></tr>'
           );
           $('.peopleDel').unbind('click').bind('click',function () {
               $(this).parents("tr").remove();              //使用 parents() 方法寻找其祖先结点 ,等效于 $(this).parent().parent().remove()
           })
       }
        $('#myModalImport').modal('toggle')
    })
});

//导入人员确定按钮
$('#peopleImportConfirm').unbind('click').bind('click',function () {
    //保存需要导入的属性
    checkedProperty = [];    //保存选择的属性
    length = 0;
    for(let i = 0; i < $('.checkbox').length;i++){
        if($('.checkbox:eq('+i+')').prop('checked')){
            checkedProperty[length++] = $('.checkbox:eq('+i+')').prop('title');
        }
    }
    var checkedArr = [];                //用来保存需要导入的人的工号
    var checkedArrLength = 0;           //checkedArr数组的长度
    $('#peopleTable tr').each(function () {
        if($(this).children('td:eq(0)').text() != ''){
            checkedArr[checkedArrLength++] = $(this).children('td:eq(0)').text();
        }
    });
    //尝试向后台发起 ajax 请求 将工资批量导入数据库表中
    if(checkedArr.length != 0 && checkedProperty.length != 0){
        $('#modalImport').modal({});                         //打开模态框
        $('#importConfirm').unbind('click').bind('click',function () {
            $.ajax({
                type: 'POST',
                url: './archiveManagement.php',
                // dataType: 'json',
                async: true,
                data:{
                    'checkedNodes': checkedArr,
                    'checkedProperty': checkedProperty,
                    'selectedPersonJobNum': $('#salarySlipTable').find('td:first').text(),
                    'flag': 7
                },
                success:function (data) {
                    console.log(data)
                },
                error:function () {
                    console.log('操作失败！！！！！！！！！！')
                }
            });
            $('#modalImport').modal('toggle')          /*关闭模态框*/
        })
    }
    else{
        alert('请选择属性')
    }

});
//form表单样式
layui.use(['layer', 'form'], function(){
    var layer = layui.layer
        ,form = layui.form;
});
