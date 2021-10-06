import { RawData } from '../../types';
import { BuildOpts, Series, DataPoint, Result, Config, ResultPoint } from './types';
import jsonFilter from '../ults/json-filter'
import jsonPointer from '../ults/json-pointer'

function extractUniques(
    data: Array<RawData>,
    field: string
): Array<any> {
    let value: any
    let entries: Array<any> = []

    data.forEach((entity) => {
        value = jsonPointer(entity, field)

        if (entries.indexOf(value) === -1) {
            entries.push(value)
        }
    })

    return entries
}

function getPointValue(
    point: DataPoint,
    data: Array<RawData>
): string | number | null {
    let res: string | number | null
    let val: string | number | null

    data.forEach((entity) => {
        val = jsonPointer(entity, point.field)

        if (val === undefined) {
            res = null
        } else {
            
            switch (typeof val) {
                case 'string':
                    res = val
                    break;
                case 'number':
                    if (res === undefined) { res = val }
                    if (typeof res === 'number') { res += val}
                    break;
            }
        }
    })

    return res
}

function buildSeries(
    opts: BuildOpts,
    data: Array<RawData>
): Array<Series> {
    let result: Array<Series> = []
    let seriesData: Array<any>

    function processData(
        catData: Array<RawData>
    ): ResultPoint {
        let res: ResultPoint = {}

        opts.points.map((
            point: DataPoint
        ) => {
            res[point.point] = getPointValue(point, catData)
        })

        return res
    }

    function formatData(
        entities: Array<RawData>
    ): Array<ResultPoint> {
        return opts.catergories.list.map((
            cat: string
            ) => {
                opts.catergories.filter.value = cat

                return processData(
                    jsonFilter.matchAll(
                        entities,
                        [
                            opts.catergories.filter
                        ]
                    )
                )
            }
        )
    }

    opts.series.list.forEach((name) => {

        if (opts.series.hasOwnProperty('filter')) {
            opts.series.filter.value = name;
            seriesData = formatData(jsonFilter.matchAll(data,[opts.series.filter]))
        } else {
            seriesData = formatData(data)
        }

        result.push({
            name: name,
            data: seriesData
        })
    });

    return result
}

export default (
    data: Array<RawData>,
    opts: Config
): Result => {
    let results: Result = {
            series: [],
            catergories: []
        }
    let catergoriesList: Array<string>
    let seriesList: Array<string>
    
    // setting catergories build config
    if (
        opts.catergories.hasOwnProperty('values') &&
        Array.isArray(opts.catergories.values)
    ) {
        catergoriesList = opts.catergories.values
    } else {
        catergoriesList = extractUniques(data, opts.catergories.field)
    }

    // setting series build config
    if (
        opts.series.hasOwnProperty('name') &&
        typeof opts.series.name === 'string'
    ) {
        seriesList = [opts.series.name]
    } else if (
        opts.series.hasOwnProperty('field') &&
        typeof opts.series.field === 'string'
    ) {
        seriesList = extractUniques(data, opts.series.field)
    }

    let buildOpts: BuildOpts = {
            catergories: {
                list: catergoriesList,
                filter: {
                    field: opts.catergories.field,
                    op: 'EQ',
                    value: ''
                }
            },
            series: {
                list: seriesList
            },
            points: opts.points
        }

    if (buildOpts.series.list.length > 1) {
        buildOpts.series.filter = {
            field: opts.series.field,
            op: 'EQ',
            value: ''
        }
    }

    results.series = buildSeries(buildOpts, data)
    results.catergories = buildOpts.catergories.list
    return results
} 