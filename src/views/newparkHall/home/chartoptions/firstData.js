export let data0= {
    // backgroundColor: '#FBFBFB',
        title: {
            text: '研究与发展（R&D）人员数（万人）',
            textStyle:{
                color:"#10b5ff",
                fontWeight:'normal'
            },
            padding:[15, 0, 0, 40 ]
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
                data: ["2013","2014","2015","2016","2017"]
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
                data:[1.9, 2.3, 2.2, 2.5, 2.2]
            }
        ]
};
