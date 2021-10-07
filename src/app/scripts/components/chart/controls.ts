import dropdown from "../dropdown/index"

export function init() {
    const selectors = {
            chartType: '#chart--control--chartType',
            axisX: '#chart--control--axisX',
            axisY: '#chart--control--axisY',
            update: '#chart--control-update'
        }

    dropdown(
        selectors.chartType,
        {
            label: 'Chart Type',
            items: [
                {
                    label: 'Column',
                    value: 'column',
                    selected: true
                },
                {
                    label: 'Bar',
                    value: 'bar'
                }
            ]
        }
    )
}

export default {
    init
}