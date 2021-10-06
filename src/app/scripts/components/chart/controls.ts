import { AppData } from "../../types"
import render from '../ults/renderer'

export function init() {
    const selectors = {
            chartType: '#chart--control--chartType',
            axisX: '#chart--control--axisX',
            axisY: '#chart--control--axisY',
            update: '#chart--control-update'
        }
    
    let typeElem:HTMLElement = document.querySelector(selectors.chartType)
    let xElem:HTMLElement = document.querySelector(selectors.axisX)
    let yElem:HTMLElement = document.querySelector(selectors.axisY)
    let update:HTMLButtonElement = document.querySelector(selectors.update)


}

export default {
    init
}