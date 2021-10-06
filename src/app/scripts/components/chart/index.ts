import * as Highcharts from 'highcharts';
import { RawData } from '../../types';
import { Config } from './types';
import translator from './translator';

export function create(
    selector: string,
    data: Array<RawData>,
    opts: Config,
): void {
    let chartOpts = {
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
                width: '96%'
            }
        }
    
    const charData = translator(data, opts)
    console.log('chartData', charData)
}