$(function () {
    //全局变量
    //定义全局结点,结点在JSON中的下标
    var treeNodeInfo = JSON.parse(localStorage.getItem("treeNodeInfo"));
    var index;
    var appraisalJson;
    //通过回调函数获取日期（年、月）
    var year,month,tableYear="",tableMonth="",tableID=1;


    $.get("./conn2.php",function (data,status) {
        //data为object
        appraisalJson = data;
        if(treeNodeInfo===null){
            alert('没有结点信息！');
        }else{
            console.log(treeNodeInfo);
            setTimeout(getSelectedInfo(),2000);
        }
    });

    //等获取appraisalJson后的数据再执行函数
    setTimeout(drawChart(),2000);
    function draw(year,month,treeNodeInfo) {
        if(treeNodeInfo.level == 2&&treeNodeInfo!=null){
            //判断日期
            for(var i=0;i<appraisalJson.length;i++){
                tableYear = appraisalJson[i].yearMonth.split('.')[0];
                tableMonth = appraisalJson[i].yearMonth.split('.')[1];
                tableID = appraisalJson[i].id;
                if(year==tableYear&&month==tableMonth&&treeNodeInfo.id==tableID){
                    //更新chart信息
                    // 基于准备好的dom，初始化echarts实例
                    var myChart = echarts.init($("#drawChart").get(0),'dark');  //jQuery对象转换成dom对象

                    // 指定图表的配置项和数据
                    var option = {
                        // title: {
                        //     text: '考评管理——月考评图'
                        // },
                        legend: {
                            // data: ['单项数据', '合计数据'],
                            // align: 'left'
                        },
                        // toolbox: {
                        //     // 右上方功能键,
                        //     feature: {
                        //         //数据显示
                        //         magicType: {
                        //             type: ['stack', 'tiled']
                        //         },
                        //         //数据视图
                        //         dataView: {},
                        //         //保存图像
                        //         saveAsImage: {
                        //             pixelRatio: 2
                        //         }
                        //     }
                        // },
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
                    return;
                }else{
                    continue;
                }
            }
            //没有找到
            alert(year+'年'+month+'月'+"还没有考评表！");
            return;
        }else{
            return;
        }
    }
    //appraisalChart网页JS
    function drawChart(){
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
                    treeNodeInfo = JSON.parse(localStorage.getItem("treeNodeInfo"));
                    if(treeNodeInfo==null){
                        return;
                    }else{
                        draw(year,month,treeNodeInfo);
                    }
                }
            });
        });
    }

    //跳转页面，直接显示信息
    function getSelectedInfo(){
        year = window.localStorage.getItem('year');
        month = window.localStorage.getItem('month');
        $('input.layui-input').attr('placeholder',year+"-"+month);
        draw(year,month,treeNodeInfo);
    }

    $('#back').unbind('click').bind('click',function () {
       window.location.href = "appraisalManagement.html" ;
    });
});

