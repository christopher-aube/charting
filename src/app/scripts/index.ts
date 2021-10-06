import "../styles/index.scss"
import models from './models/index'
import components from "./components/index"
import { AppData } from './types'

let data: AppData = {
    ready: false,
    manufacturers: [],
    medications: []
}

function isDataReady() {
    data.ready = (
        data.manufacturers.length > 0 &&
        data.medications.length > 0
    )
}

function getManus() {
    models.manufacturers.get().then((results) => {

        if (results instanceof Error) {
            console.error(results)
            return;
        }

        if (!Array.isArray(results)) {
            console.warn(results)
            return;
        }

        data.manufacturers = results
        isDataReady()
    })
}

function getMeds() {
    models.medications.get({ join: true }).then((results) => {
        
        if (results instanceof Error) {
            console.error(results)
            return;
        }

        if (!Array.isArray(results)) {
            console.warn(results)
            return;
        }

        components.table.create(
            '.chart--table--content',
            results,
            [
                {
                    label: 'Name',
                    pointer: 'name',
                    classes: 'col-xs-4 start-xs'
                },
                {
                    label: 'Manufacturer',
                    pointer: 'manufacturer_name',
                    classes: 'col-xs-4 start-xs'
                },
                {
                    label: 'Amount',
                    pointer: 'amount',
                    classes: 'col-xs-2 center-xs'
                },
                {
                    label: 'Strength',
                    pointer: 'strength',
                    classes: 'col-xs-2 center-xs'
                }
            ]
        )

        components.charting.create(
            '.chart--graph--content',
            results,
            {
                series: {
                    name: 'Med Amounts'
                },
                catergories: {
                    field: 'name'
                },
                points: [
                    {
                        point: 'y',
                        field: 'amount'
                    }
                ]
            }
        )

        data.medications = results
        isDataReady()
    })
}

;(() => {
    getMeds()
    getManus()
})()