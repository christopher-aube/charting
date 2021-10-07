import Highcharts from 'highcharts'
import { JsonFilter } from '../../types';
import { DropdownItem } from '../dropdown/types'

export type ResultPoint = {
    [key: string]: string | number | null
}

export type ChartSeries =
    Highcharts.SeriesAreaOptions |
    Highcharts.SeriesArearangeOptions |
    Highcharts.SeriesAreasplineOptions |
    Highcharts.SeriesBarOptions |
    Highcharts.SeriesBubbleOptions |
    Highcharts.SeriesColumnOptions |
    Highcharts.SeriesLineOptions |
    Highcharts.SeriesPieOptions |
    Highcharts.SeriesScatterOptions

export type Result = {
    series: Array<ChartSeries>,
    categories: Array<string>
}

export type DataPoint = {
    point: string,
    field: string
}

export type BuildOpts = {
    series: {
        list: Array<string>,
        filter ?: JsonFilter
    },
    categories: {
        list: Array<string>,
        filter: JsonFilter
    },
    points: Array<DataPoint>
}

export type Config = {
    series: {
        field ?: string,
        name ?: string
    },
    categories: {
        field: string,
        values ?: Array<string>
    },
    points: Array<DataPoint>
}

export type ChartUpdated = {
    type: DropdownItem,
    axisX: DropdownItem,
    axisY: DropdownItem
}