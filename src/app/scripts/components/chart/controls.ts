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

    dropdown(
        selectors.axisX,
        {
            label: 'X Axis',
            items: [
                {
                    label: 'Medication',
                    value: 'name',
                    selected: true
                },
                {
                    label: 'Manufacture',
                    value: 'manufacture_name'
                }
            ]
        }
    )

    dropdown(
        selectors.axisY,
        {
            label: 'Y Axis',
            items: [
                {
                    label: 'Amount',
                    value: 'amount',
                    selected: true
                },
                {
                    label: 'Strength',
                    value: 'strength'
                }
            ]
        }
    )
}

export default {
    init
}