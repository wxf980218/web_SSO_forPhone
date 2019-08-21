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

    if(treeNode.level == 2){
        //  工资导入界面的业务逻辑
        if($("#salarySlipTable").find("tr").length > 1){
            $("#salarySlipTable tr:last").remove();
        }
        $('#salarySlipTable').append(
            '<tr><td>'+ selectedPersonInfo[0].jobNum +'</td><td>'+ selectedPersonInfo[0].name +'</td><td>'+ selectedPersonInfo[0].level +'</td><td>'+ selectedPersonInfo[0].highTechSub +
            '</td><td>'+ selectedPersonInfo[0].leaveDeductMoney +'</td><td>'+ selectedPersonInfo[0].basicMoney +'</td></tr><tr><td>'+ selectedPersonInfo[0].houseSub +'</td><td>'
            + selectedPersonInfo[0].breakRuleDeductMoney +'</td><td>'+ selectedPersonInfo[0].overTimeMoney +'</td><td>'+  selectedPersonInfo[0].trafficMoney +'</td><td>'+ selectedPersonInfo[0].insuranceMoney
            +'</td><td>'+ selectedPersonInfo[0].salary +'</td><td>'+ selectedPersonInfo[0].realSalary +'</td></tr>'
        )
    }
});