import Highcharts from 'highcharts'
import { JsonFilter } from '../../types';
import { DropdownItem } from '../dropdown/types'

export type ResultPoint = {
    [key: string]: string | number | null
}

interface CustomSeriesAreaOptions extends Highcharts.SeriesAreaOptions {
    colorByPoint ?: boolean
}

interface CustomSeriesArearangeOptions extends Highcharts.SeriesArearangeOptions {
    colorByPoint ?: boolean
}

interface CustomSeriesAreasplineOptions extends Highcharts.SeriesAreasplineOptions {
    colorByPoint ?: boolean
}

interface CustomSeriesBubbleOptions extends Highcharts.SeriesBubbleOptions {
    colorByPoint ?: boolean
}

interface CustomSeriesLineOptions extends Highcharts.SeriesLineOptions {
    colorByPoint ?: boolean
}

interface CustomSeriesPieOptions extends Highcharts.SeriesPieOptions {
    colorByPoint ?: boolean
}

interface CustomSeriesScatterOptions extends Highcharts.SeriesScatterOptions {
    colorByPoint ?: boolean
}

export type ChartSeries =
    CustomSeriesAreaOptions |
    CustomSeriesArearangeOptions |
    CustomSeriesAreasplineOptions |
    Highcharts.SeriesBarOptions |
    CustomSeriesBubbleOptions |
    Highcharts.SeriesColumnOptions |
    CustomSeriesLineOptions |
    CustomSeriesPieOptions |
    CustomSeriesScatterOptions

export interface CustomHighchartsOptions extends Highcharts.Options {
    series: Array<ChartSeries>
}

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