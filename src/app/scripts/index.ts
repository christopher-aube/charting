import "../styles/index.scss";
import models from './models/index'
import components from "./components/index";

function getMeds() {
    models.medications.get().then(function (data) {
        
        if (data instanceof Error) {
            console.log(data)
            return;
        }

        components.table.create(
            '.chart--table--content',
            data,
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
    })
}

;(() => {
    getMeds()
})()