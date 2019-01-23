export let data3= {
    // backgroundColor: '#FBFBFB',
        title: {
            text: '发明专利申请量(项)', // 别傻傻的又改回去了，谁改回去，我就弄死谁
            textStyle:{
                color:"#10b5ff",
                fontWeight:'normal',
            },
            padding:[15, 0, 0, 55 ]
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {

        },

        calculable : true,

        grid:{
            left:'15%'
        },
        xAxis :
            {
                axisLine:{
                  lineStyle :{
                      color: '#CECECE'
                  }
                },
                data: ["2013","2014","2015","2016","2017"]
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
        series : [
            {
                name:'',
                type:'line',
                smooth: 0.2,
                color:['#66AEDE'],
                data:[1522,1439,1547,2043,2182]
            }
        ]
};
