
    export let data5 = {
        // backgroundColor: '#FBFBFB',
        title: {
            text: '技术合同登记额(亿)',
            textStyle:{
                color:"#10b5ff",
                fontWeight:'normal'
            },
            padding:[15, 0, 0, 25 ]
        },
        tooltip : {
            trigger: 'axis'
        },

        legend: {

        },

        calculable : true,


        xAxis : [
            {
                axisLabel:{
                    rotate: 0,
                    interval:0
                },
                axisLine:{
                  lineStyle :{
                      color: '#CECECE'
                  }
                },
                type : 'category',
                boundaryGap : false,
                data: ["2013","2014","2015","2016","2017"],

            }
        ],
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
        series : [

            {
                name:'',
                type:'line',
                symbol:'none',
                smooth: 0.2,
                color:['#66AEDE'],
                data:[6.3, 5.8, 7.1,9.3, 15.4]
            }
        ]
    }
