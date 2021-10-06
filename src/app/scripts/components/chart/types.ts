import { JsonFilter } from '../../types';

export type Series = {
    name: string,
    data: Array<any>
}

export type Result = {
    series: Array<Series>,
    catergories: Array<string>
}

export type DataPoint = {
    point: string,
    field: string
}

export type ResultPoint = {
    [key: string]: string | number | null
}

export type BuildOpts = {
    series: {
        list: Array<string>,
        filter ?: JsonFilter
    },
    catergories: {
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
    catergories: {
        field: string,
        values ?: Array<string>
    },
    points: Array<DataPoint>
}