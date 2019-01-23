export let data4 = {

    title: {
        text: '高新技术企业数量(家)', // 别傻傻的又改回去了，谁改回去，我就弄死谁
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
        data: [126, 154, 190, 252, 429]
    }]
};

