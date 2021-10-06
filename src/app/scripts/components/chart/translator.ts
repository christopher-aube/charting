import { RawData } from '../../types';
import { BuildOpts, ChartSeries, DataPoint, Result, Config, ResultPoint } from './types';
import jsonFilter from '../ults/json-filter'
import jsonPointer from '../ults/json-pointer'

function extractUniques(
    data: Array<RawData>,
    field: string
): Array<string> {
    let value: any
    let entries: Array<string> = []

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
            let check

            if (typeof val === 'string') {
                check = parseFloat(val)

                if (!isNaN(check)) {
                    val = check
                }
            }
            
            switch (typeof val) {
                case 'string':
                    res = val
                    break;
                case 'number':

                    if (res === undefined) {
                        res = val
                    } else if (typeof res === 'number') {
                        res += val
                    }

                    break;
            }
        }
    })

    return res
}

function buildSeries(
    opts: BuildOpts,
    data: Array<RawData>
): Array<ChartSeries> {
    let result: Array<ChartSeries> = []
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
        return opts.categories.list.map((
            cat: string
            ) => {
                opts.categories.filter.value = cat

                return processData(
                    jsonFilter.matchAll(
                        entities,
                        [
                            opts.categories.filter
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
            data: seriesData,
            type: undefined
        })
    });

    return result
}

export default (
    data: Array<RawData>,
    opts: Config
): Result => {
    let categoriesList: Array<string>
    let seriesList: Array<string>
    
    // setting categories build config
    if (
        opts.categories.hasOwnProperty('values') &&
        Array.isArray(opts.categories.values)
    ) {
        categoriesList = opts.categories.values
    } else {
        categoriesList = extractUniques(data, opts.categories.field)
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
            categories: {
                list: categoriesList,
                filter: {
                    field: opts.categories.field,
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

    return {
        series: buildSeries(buildOpts, data),
        categories: buildOpts.categories.list
    }
} 