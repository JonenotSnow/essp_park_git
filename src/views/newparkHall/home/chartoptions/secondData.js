export const secondData = {

    title: {
        text: 'R&D投入(亿元)',
        textStyle:{
            color:"#10b5ff",
            fontWeight:'normal'
        },
        padding:[15, 0, 0, 40 ]
    },
    tooltip: {
        trigger: 'axis'
    },
    calculable : true,
    legend: {
        data:['']
    },
    xAxis: {
        data: ["2013","2014","2015","2016","2017"],
        axisLine:{
            lineStyle :{
                color: '#CECECE'
            }
        }
    },
    yAxis: {
        
    
            type : 'value',
            axisLine:{
                lineStyle :{
                    color: '#CECECE'
                }
            }
        
    },
    series: [{
        name: '',
        type: 'line',
        smooth: 0.2,
        color:['#66AEDE'],
        data: [5, 20, 36, 10, 10]
    }]
};

