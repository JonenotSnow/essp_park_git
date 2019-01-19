export let data1 = {

    title: {
        text: '企业研究与发展(R&D)经费支出(亿元)',
        textStyle:{
            color:"#10b5ff",
            fontWeight:'normal'
        },
        padding:[15, 0, 0, 55 ]
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
    grid:{
        left:'15%'
    },
    series: [{
        name: '',
        type: 'line',
        smooth: 0.2,
        color:['#66AEDE'],
        data: [42.3, 46.6, 51.5, 57, 61.3]
    }]
};

