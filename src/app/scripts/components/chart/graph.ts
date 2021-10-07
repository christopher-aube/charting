import * as Highcharts from 'highcharts';
import { RawData, CustomEvent } from '../../types';
import { Config, Result, ChartUpdated } from './types';
import translator from './translator';

export function create(
    selector: string,
    data: Array<RawData>,
    opts: Config,
): void {
    const chartElem: HTMLElement = document.querySelector(selector)

    let chartData: Result = translator(data, opts)
    let chartOpts: Highcharts.Options = {
            colors: [
                '#009e4d',
                '#6059BD',
                '#449DA6',
                '#8A3696',
                '#2C82D7',
                '#D7B710',
                '#AAADE3',
                '#006e22',
                '#14208E ',
                '#5957CE'
            ],
            credits: {
                enabled: false
            },
            chart: {
                height: '330px',
                type: 'column',
                renderTo: chartElem,
                marginTop: 20,
                backgroundColor: 'transparent'
            },
            series: chartData.series,
            xAxis: {
                categories: chartData.categories
            },
            title:{
                text:'',
                floating: true,
                margin: 0,
                y: 0
            }
        }

    if (chartOpts.series.length === 1) {
        chartOpts.legend = {
            enabled: false
        }
    }

    let chart = new Highcharts.Chart(chartOpts)

    function handlerChartUpdated(
        ev: CustomEvent<ChartUpdated>
    ) {
        const detail = ev.detail

        opts.categories.field = detail.axisX.value
        opts.points = [{ point: 'y', field: detail.axisY.value }]
        chartOpts.chart.type = detail.type.value
        chartData = translator(data, opts)
        chartOpts.xAxis = {
            categories: chartData.categories
        }
        chartOpts.series = chartData.series
        chart.update(chartOpts)
    }

    window.addEventListener('chart-updated', (handlerChartUpdated) as EventListener)
}

export default {
    create
}