import { ChartUpdated } from './types'
import { DropdownConfig } from '../dropdown/types'
import dropdown from "../dropdown/index"

export function init() {
    const selectors = {
            chartType: '#chart--control--chartType',
            axisX: '#chart--control--axisX',
            axisY: '#chart--control--axisY',
            update: '#chart--control-update'
        }
    let updateBtn:HTMLElement = document.querySelector(selectors.update)
    let typeConfig:DropdownConfig = {
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
                },
                {
                    label: 'Line',
                    value: 'line'
                },
                {
                    label: 'Area',
                    value: 'area'
                },
                {
                    label: 'Pie',
                    value: 'pie'
                }
            ]
        }
    let axisXConfig:DropdownConfig = {
            label: 'X Axis',
            items: [
                {
                    label: 'Medication',
                    value: 'name',
                    selected: true
                },
                {
                    label: 'Manufacture',
                    value: 'manufacturer_name'
                }
            ]
        }
    let axisYConfig:DropdownConfig = {
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

    dropdown(selectors.chartType, typeConfig)
    dropdown(selectors.axisX, axisXConfig)
    dropdown(selectors.axisY, axisYConfig)

    updateBtn.onclick = () => {
        const event:CustomEvent = new CustomEvent<ChartUpdated>('chart-updated', {
            bubbles: true,
            detail: {
                type: typeConfig.selectedItem,
                axisX: axisXConfig.selectedItem,
                axisY: axisYConfig.selectedItem
            }
        })
        
        window.dispatchEvent(event)
    }
}

export default {
    init
}