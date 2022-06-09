import React from 'react'
import { useTheme } from '@mui/system'
import ReactEcharts from 'echarts-for-react'

const MetricChart = ({ height, color = [], values = []}) => {
    const theme = useTheme()

    const option = {
        grid: {
            top: '5%',
            bottom: '5%',
            left: '5%',
            right: '5%',
        },
        legend: {
            itemGap: 15,
            icon: 'circle',
            textStyle: {
                color: theme.palette.text.secondary,
                fontSize: 10,
                fontFamily: 'roboto',
            },
        },
        tooltip: {},
        xAxis: {
            type: 'category',
            data: values,
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                color: theme.palette.text.secondary,
                fontSize: 10,
                fontFamily: 'roboto',
            },
        },
        yAxis: {
            type: 'value',
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                // show: false
                lineStyle: {
                    color: theme.palette.text.secondary,
                    opacity: 0.15,
                },
            },
            axisLabel: {
                color: theme.palette.text.secondary,
                fontSize: 10,
                fontFamily: 'roboto',
            },
        },
        series: [
            {
                data: [30, 40, 20, 50, 40],
                type: 'line',
                stack: 'Sum',
                name: 'Sum',
                smooth: true,
                symbolSize: 4,
                lineStyle: {
                    width: 4,
                },
            },
            {
                data: [20, 50, 15, 50, 30],
                type: 'line',
                stack: 'Avg',
                name: 'Avg',
                smooth: true,
                symbolSize: 4,
                lineStyle: {
                    width: 4,
                },
            },
        ],
    }
    option.xAxis.data = values
    console.log( values)

    return (

    <ReactEcharts
        style={{height: height}}
        option={{
            ...option,
            // color: [...color],
        }}
    />

    )
}

export default MetricChart
