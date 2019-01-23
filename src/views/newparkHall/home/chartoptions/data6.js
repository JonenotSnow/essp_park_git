
    export let data5 = {
        // backgroundColor: '#FBFBFB',
        title: {
            text: '技术合同登记额(亿元)',  // 别傻傻的又改回去了，谁改回去，我就弄死谁
            textStyle:{
                color:"#10b5ff",
                fontWeight:'normal'
            },
            padding:[15, 0, 0, 55 ]
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
        },
        calculable : true,
        xAxis :
            {
                axisLine:{
                  lineStyle :{
                      color: '#CECECE'
                  }
                },
                data: ["2013","2014","2015","2016","2017"],

            }
        ,
        yAxis : [
            {

                type : 'value',
                axisLine:{
                    lineStyle :{
                        color: '#CECECE'
                    }
                }
            }
        ],
        grid:{
            left:'15%'
        },
        series : [
            {
                name:'',
                type:'line',
                smooth: 0.2,
                color:['#66AEDE'],
                data:[6.3, 5.8, 7.1,9.3, 15.4]
            }
        ]
    }
