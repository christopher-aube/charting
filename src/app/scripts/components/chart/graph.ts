import * as Highcharts from 'highcharts';
import { RawData, CustomEvent } from '../../types';
import { Config, Result, ChartUpdated } from './types';
import translator from './translator';

export function create(
    selector: string,
    data: Array<RawData>,
    opts: Config,
): void {
    const charData: Result = translator(data, opts)
    const chartElem: HTMLElement = document.querySelector(selector)

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
            series: charData.series,
            xAxis: {
                categories: charData.categories
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

    console.log('chartData', charData)
    let chart = new Highcharts.Chart(chartOpts)

    function handlerChartUpdated(
        ev: CustomEvent<ChartUpdated>
    ) {
        const detail = ev.detail
        console.log('updated', detail)
    }

    window.addEventListener('chart-updated', (handlerChartUpdated) as EventListener)
}

export default {
    create
}