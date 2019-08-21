//appraisalManagement的数据自动填入
$(function () {
    // $('input').attr('data-role','none');
    // $("select").attr('data-role','none');
    //全局变量
    //定义全局结点,结点在JSON中的下标
    var treeNodeInfo = JSON.parse(window.localStorage.getItem('treeNodeInfo'));
    var appraisalJson;
    //通过回调函数获取日期（年、月）
    var year,month,tableYear="",tableMonth="",tableID=1;
    var flag1=0;


    $.get("./conn2.php",function (data,status) {
        //data为object
        appraisalJson = data;
        drawData();
    });

    function drawData(){
        //点击日期查询数据库信息
        layui.use('laydate', function(){
            var laydate = layui.laydate;
            //执行一个laydate实例
            laydate.render({
                elem: '#test3' //指定元素
                ,type: 'month'
                ,event:'focus'
                ,done:function (value,date) { //控件选择完毕的回调
                    year = JSON.stringify(date.year); //获取年
                    month = JSON.stringify(date.month); //获取月
                    window.localStorage.setItem('year',year);
                    window.localStorage.setItem('month',month);
                    // 判断结点
                    if (treeNodeInfo != null && treeNodeInfo.level == 2) {
                        for (var i = 0; i < appraisalJson.length; i++) {
                             tableYear = appraisalJson[i].yearMonth.split('.')[0];
                             tableMonth = appraisalJson[i].yearMonth.split('.')[1];
                             tableID = appraisalJson[i].id;
                            if (year == tableYear && month == tableMonth && treeNodeInfo.id == tableID) {
                                //更新表单信息
                                index = i;
                                $("#11z").val(appraisalJson[i].value111);
                                $("#11j").val(appraisalJson[i].value112);
                                $("#11bei").val(appraisalJson[i].value113);
                                $("#12z").val(appraisalJson[i].value121);
                                $("#12j").val(appraisalJson[i].value122);
                                $("#12bei").val(appraisalJson[i].value123);
                                $("#13z").val(appraisalJson[i].value131);
                                $("#13j").val(appraisalJson[i].value132);
                                $("#13bei").val(appraisalJson[i].value133);
                                $("#14z").val(appraisalJson[i].value141);
                                $("#14j").val(appraisalJson[i].value142);
                                $("#14bei").val(appraisalJson[i].value143);
                                $("#15z").val(appraisalJson[i].value151);
                                $("#15j").val(appraisalJson[i].value152);
                                $("#15bei").val(appraisalJson[i].value153);

                                $("#21z").val(appraisalJson[i].value211);
                                $("#21j").val(appraisalJson[i].value212);
                                $("#21bei").val(appraisalJson[i].value213);
                                $("#22z").val(appraisalJson[i].value221);
                                $("#22j").val(appraisalJson[i].value222);
                                $("#22bei").val(appraisalJson[i].value223);
                                $("#23z").val(appraisalJson[i].value231);
                                $("#23j").val(appraisalJson[i].value232);
                                $("#23bei").val(appraisalJson[i].value233);
                                $("#24z").val(appraisalJson[i].value241);
                                $("#24j").val(appraisalJson[i].value242);
                                $("#24bei").val(appraisalJson[i].value243);
                                $("#25z").val(appraisalJson[i].value251);
                                $("#25j").val(appraisalJson[i].value252);
                                $("#25bei").val(appraisalJson[i].value253);

                                $("#31z").val(appraisalJson[i].value311);
                                $("#31j").val(appraisalJson[i].value312);
                                $("#31bei").val(appraisalJson[i].value313);
                                $("#32z").val(appraisalJson[i].value321);
                                $("#32j").val(appraisalJson[i].value322);
                                $("#32bei").val(appraisalJson[i].value323);
                                $("#33z").val(appraisalJson[i].value331);
                                $("#33j").val(appraisalJson[i].value332);
                                $("#33bei").val(appraisalJson[i].value333);
                                $("#34z").val(appraisalJson[i].value341);
                                $("#34j").val(appraisalJson[i].value342);
                                $("#34bei").val(appraisalJson[i].value343);
                                $("#35z").val(appraisalJson[i].value351);
                                $("#35j").val(appraisalJson[i].value352);
                                $("#35bei").val(appraisalJson[i].value353);

                                $("#41z").val(appraisalJson[i].value411);
                                $("#41j").val(appraisalJson[i].value412);
                                $("#41bei").val(appraisalJson[i].value413);
                                $("#42z").val(appraisalJson[i].value421);
                                $("#42j").val(appraisalJson[i].value422);
                                $("#42bei").val(appraisalJson[i].value423);
                                $("#43z").val(appraisalJson[i].value431);
                                $("#43j").val(appraisalJson[i].value432);
                                $("#43bei").val(appraisalJson[i].value433);
                                $("#44z").val(appraisalJson[i].value441);
                                $("#44j").val(appraisalJson[i].value442);
                                $("#44bei").val(appraisalJson[i].value443);
                                $("#45z").val(appraisalJson[i].value451);
                                $("#45j").val(appraisalJson[i].value452);
                                $("#45bei").val(appraisalJson[i].value453);

                                $("#5z").val(appraisalJson[i].value51);
                                $("#5j").val(appraisalJson[i].value52);
                                $("#5bei").val(appraisalJson[i].value53);
                                return;
                                }else {
                                    continue;
                                }
                            }
                            //year和month在数组中没有找到
                             alert(year+'年'+month+'月'+"还没有考评表！");
                             $('input').val("");//置空
                             return;
                        }else{
                        $('input').val("");//置空
                        return;
                    }
                }
            });
        });
}


    //table修改函数
    $('#alter').unbind('click').bind('click',function () {
        $('.content').attr("disabled",false);
        $('input').removeAttr("disabled");
        alert('你现在可以修改/创建表格！');
    });

    //点击保存按钮将修改的数据保存到数据库中
    $('#save').unbind('click').bind('click',function () {
        $('.content,.remark').attr('disabled','disabled');
            //先判断数据库中是否有改用户、对应时间的记录
            if(year==tableYear&&month==tableMonth&&treeNodeInfo.id==tableID){
                //数据库中有该用户，将修改网页的表单值传入数据库中
                flag1 = 1;
                $.post("./conn3.php",{
                    id: tableID,
                    year: tableYear,
                    month:tableMonth,
                    flag:flag1,
                    VALUE111:$("#11z").val(),
                    VALUE112:$("#11j").val(),
                    VALUE113:$("#11bei").val(),
                    VALUE121:$("#12z").val(),
                    VALUE122:$("#12j").val(),
                    VALUE123:$("#12bei").val(),
                    VALUE131:$("#13z").val(),
                    VALUE132:$("#13j").val(),
                    VALUE133:$("#13bei").val(),
                    VALUE141:$("#14z").val(),
                    VALUE142:$("#14j").val(),
                    VALUE143:$("#14bei").val(),
                    VALUE151:$("#15z").val(),
                    VALUE152:$("#15j").val(),
                    VALUE153:$("#15bei").val(),

                    VALUE211:$("#21z").val(),
                    VALUE212:$("#21j").val(),
                    VALUE213:$("#21bei").val(),
                    VALUE221:$("#22z").val(),
                    VALUE222:$("#22j").val(),
                    VALUE223:$("#22bei").val(),
                    VALUE231:$("#23z").val(),
                    VALUE232:$("#23j").val(),
                    VALUE233:$("#23bei").val(),
                    VALUE241:$("#24z").val(),
                    VALUE242:$("#24j").val(),
                    VALUE243:$("#24bei").val(),
                    VALUE251:$("#25z").val(),
                    VALUE252:$("#25j").val(),
                    VALUE253:$("#25bei").val(),

                    VALUE311:$("#31z").val(),
                    VALUE312:$("#31j").val(),
                    VALUE313:$("#31bei").val(),
                    VALUE321:$("#32z").val(),
                    VALUE322:$("#32j").val(),
                    VALUE323:$("#32bei").val(),
                    VALUE331:$("#33z").val(),
                    VALUE332:$("#33j").val(),
                    VALUE333:$("#33bei").val(),
                    VALUE341:$("#34z").val(),
                    VALUE342:$("#34j").val(),
                    VALUE343:$("#34bei").val(),
                    VALUE351:$("#35z").val(),
                    VALUE352:$("#35j").val(),
                    VALUE353:$("#35bei").val(),

                    VALUE411:$("#41z").val(),
                    VALUE412:$("#41j").val(),
                    VALUE413:$("#41bei").val(),
                    VALUE421:$("#42z").val(),
                    VALUE422:$("#42j").val(),
                    VALUE423:$("#42bei").val(),
                    VALUE431:$("#43z").val(),
                    VALUE432:$("#43j").val(),
                    VALUE433:$("#43bei").val(),
                    VALUE441:$("#44z").val(),
                    VALUE442:$("#44j").val(),
                    VALUE443:$("#44bei").val(),
                    VALUE451:$("#45z").val(),
                    VALUE452:$("#45j").val(),
                    VALUE453:$("#45bei").val(),

                    VALUE51:$("#5z").val(),
                    VALUE52:$("#5j").val(),
                    VALUE53:$("#5bei").val()
                },function (data,status) {
                    alert("数据：\n"+data+"\n状态："+status);
                });
                 flag1 = 0;//复原
            }else{
                //没有找到，表明数据库中没有该用户，flag1=0
                //向数据库中添加新的记录，并在页面上显示
                $.post("./conn3.php",{
                    id: treeNodeInfo.id,
                    name:treeNodeInfo.name,
                    year: year,
                    month:month,
                    VALUE111:$("#11z").val(),
                    VALUE112:$("#11j").val(),
                    VALUE113:$("#11bei").val(),
                    VALUE121:$("#12z").val(),
                    VALUE122:$("#12j").val(),
                    VALUE123:$("#12bei").val(),
                    VALUE131:$("#13z").val(),
                    VALUE132:$("#13j").val(),
                    VALUE133:$("#13bei").val(),
                    VALUE141:$("#14z").val(),
                    VALUE142:$("#14j").val(),
                    VALUE143:$("#14bei").val(),
                    VALUE151:$("#15z").val(),
                    VALUE152:$("#15j").val(),
                    VALUE153:$("#15bei").val(),

                    VALUE211:$("#21z").val(),
                    VALUE212:$("#21j").val(),
                    VALUE213:$("#21bei").val(),
                    VALUE221:$("#22z").val(),
                    VALUE222:$("#22j").val(),
                    VALUE223:$("#22bei").val(),
                    VALUE231:$("#23z").val(),
                    VALUE232:$("#23j").val(),
                    VALUE233:$("#23bei").val(),
                    VALUE241:$("#24z").val(),
                    VALUE242:$("#24j").val(),
                    VALUE243:$("#24bei").val(),
                    VALUE251:$("#25z").val(),
                    VALUE252:$("#25j").val(),
                    VALUE253:$("#25bei").val(),

                    VALUE311:$("#31z").val(),
                    VALUE312:$("#31j").val(),
                    VALUE313:$("#31bei").val(),
                    VALUE321:$("#32z").val(),
                    VALUE322:$("#32j").val(),
                    VALUE323:$("#32bei").val(),
                    VALUE331:$("#33z").val(),
                    VALUE332:$("#33j").val(),
                    VALUE333:$("#33bei").val(),
                    VALUE341:$("#34z").val(),
                    VALUE342:$("#34j").val(),
                    VALUE343:$("#34bei").val(),
                    VALUE351:$("#35z").val(),
                    VALUE352:$("#35j").val(),
                    VALUE353:$("#35bei").val(),

                    VALUE411:$("#41z").val(),
                    VALUE412:$("#41j").val(),
                    VALUE413:$("#41bei").val(),
                    VALUE421:$("#42z").val(),
                    VALUE422:$("#42j").val(),
                    VALUE423:$("#42bei").val(),
                    VALUE431:$("#43z").val(),
                    VALUE432:$("#43j").val(),
                    VALUE433:$("#43bei").val(),
                    VALUE441:$("#44z").val(),
                    VALUE442:$("#44j").val(),
                    VALUE443:$("#44bei").val(),
                    VALUE451:$("#45z").val(),
                    VALUE452:$("#45j").val(),
                    VALUE453:$("#45bei").val(),

                    VALUE51:$("#5z").val(),
                    VALUE52:$("#5j").val(),
                    VALUE53:$("#5bei").val()
                },function (data,status) {
                    alert("数据：\n"+data+"\n状态："+status);
                });
                alert("创建成功！");
            }
        //动态刷新appraisalJson,并在页面上显示
        $.get("./conn2.php",function (data,status) {
            //data为object
            appraisalJson = data;
            console.log(appraisalJson);
            drawData();
        });
    });

    //趋势键
    $('#tendency').unbind('click').bind('click',function () {
        //如果没有选中信息，判错
        if(treeNodeInfo==null){
            alert('你还没有选中结点！');
        }else{
            treeNodeInfo.year = year;
            treeNodeInfo.month = month;
            localStorage.setItem('tendencyInfo',JSON.stringify(treeNodeInfo));
            window.location.href = "appraisalChart.html";
        }
    });

    //删除键
    layui.use('layer', function(){
        var $ = layui.jquery, layer = layui.layer;
        //触发事件
        var active ={
            confirmTrans: function(){
                //配置一个透明的询问框
                if(treeNodeInfo===undefined||year===undefined||month===undefined){
                    layer.msg('没有选择结点或时间！');
                }else{
                    //弹出信息将数据库的记录返回，调用conn3或者其他PHP，写delete语句
                    layer.msg('您确定删除<br>'+treeNodeInfo.name+year+'年'+month+'月'+"的<br>考评管理记录吗", {
                        time: 10000, //5s后自动关闭
                        btn: ['确定', '反悔了'],//每个按钮还可以增添函数
                        yes:function(index,layero){
                            $.post('./conn4.php',{
                                id:treeNodeInfo.id,
                                name:treeNodeInfo.name,
                                year:year,
                                month:month
                            },function (data,status) {
                                alert("删除成功！");
                                //动态刷新appraisalJson,并在页面上显示
                                $.get("./conn2.php",function (data,status) {
                                    //data为object
                                    appraisalJson = data;
                                    console.log(appraisalJson);
                                    drawData();
                                });
                            });
                            layer.close(index); //如果设定了yes回调，需进行手工关闭
                        }
                    });
                }
            }
        };

        $('#delete').on('click', function(){
            var othis = $(this), method = othis.data('method');
            active[method] ? active[method].call(this, othis) : '';
        });
    });

    //appraisalChart网页JS
    layui.use('laydate', function(){
        var laydate = layui.laydate;
        //执行一个laydate实例
        laydate.render({
            elem: '#test1' //指定元素
            ,type: 'month'
            ,event:'focus'
            ,done:function (value,date) { //控件选择完毕的回调
                year = JSON.stringify(date.year); //获取年
                month = JSON.stringify(date.month); //获取月
                if(treeNodeInfo!=null&&treeNodeInfo.level==2){
                    for(var i=0;i<appraisalJson.length;i++){
                        tableYear = appraisalJson[i].yearMonth.split('.')[0];
                        tableMonth = appraisalJson[i].yearMonth.split('.')[1];
                        tableID = appraisalJson[i].id;
                        if(year==tableYear&&month==tableMonth&&treeNodeInfo.id==tableID){
                                //更改eChart图标信息
                                // 基于准备好的dom，初始化echarts实例
                                var myChart = echarts.init($("#main").get(0),'dark');  //jQuery对象转换成dom对象

                                // 指定图表的配置项和数据
                                var option = {
                                    title: {
                                        text: '考评管理——月考评图'
                                    },
                                    legend: {
                                        // data: ['单项数据', '合计数据'],
                                        // align: 'left'
                                    },
                                    toolbox: {
                                        // 右上方功能键,
                                        feature: {
                                            //数据显示
                                            magicType: {
                                                type: ['stack', 'tiled']
                                            },
                                            //数据视图
                                            dataView: {},
                                            //保存图像
                                            saveAsImage: {
                                                pixelRatio: 2
                                            }
                                        }
                                    },
                                    tooltip: {},
                                    dataset:{
                                        dimensions:['item','1','2','3','4','合计'],
                                        source:[
                                            //第一张表的数据
                                            {item:'个人素质','1':appraisalJson[i].value111,
                                                '2':appraisalJson[i].value121,
                                                '3':appraisalJson[i].value131,
                                                '4':appraisalJson[i].value141},
                                            {item:'工作态度','1':appraisalJson[i].value211,
                                                '2':appraisalJson[i].value221,
                                                '3':appraisalJson[i].value231,
                                                '4':appraisalJson[i].value241},
                                            {item:'专业知识','1':appraisalJson[i].value311,
                                                '2':appraisalJson[i].value321,
                                                '3':appraisalJson[i].value331,
                                                '4':appraisalJson[i].value341},
                                            {item:'工作能力','1':appraisalJson[i].value411,
                                                '2':appraisalJson[i].value421,
                                                '3':appraisalJson[i].value431,
                                                '4':appraisalJson[i].value441},
                                            // //第二张表的数据
                                            {item:'个人素质','合计':appraisalJson[i].value151},
                                            {item:'工作态度','合计':appraisalJson[i].value251},
                                            {item:'专业知识','合计':appraisalJson[i].value351},
                                            {item:'工作能力','合计':appraisalJson[i].value451}

                                        ]
                                    },
                                    xAxis: [{type:'category', silent: false, splitLine: {show: false}, gridIndex: 0},
                                        {type:'category', silent: false, splitLine: {show: false}, gridIndex: 1}],
                                    yAxis: [{gridIndex: 0},{gridIndex: 1}],
                                    grid: [
                                        {bottom: '55%'},
                                        {top: '55%'}
                                    ],
                                    series: [
                                        //第一张表的数据
                                        {type:'bar',
                                            // name:'1',
                                            // data:[2,3,4,5]
                                        },
                                        {type:'bar',
                                            // name:'2',
                                            // data:[2,3,4,5]
                                        },
                                        {type:'bar',
                                            // name:'3',
                                            // data:[2,3,4,5]
                                        },
                                        {type:'bar',
                                            // name:'4',
                                            // data:[2,3,4,5]
                                        },
                                        //第二张表的数据
                                        {type:'bar',xAxisIndex: 1, yAxisIndex: 1},
                                    ],

                                    animationEasing: 'elasticOut',
                                    animationDelayUpdate: function (idx) {
                                        return idx * 5;
                                    }

                                };
                                // 使用刚指定的配置项和数据显示图表。
                                myChart.setOption(option);
                                return;
                            }
                        }
                        alert(year+"年"+month+"月"+"还没有考评表信息！");
                    }else{
                        alert("没有考评表信息！");
                    }

            }
        });
    });

});

