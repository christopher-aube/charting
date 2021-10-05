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
            '#chart--table .table',
            data,
            [
                {
                    label: 'Name',
                    pointer: 'name'
                }
            ]
        )
    })
}

;(() => {
    getMeds()
})()