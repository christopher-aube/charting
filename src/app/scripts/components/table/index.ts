import render from '../ults/renderer'
import Handlebars from 'handlebars'

Handlebars.registerHelper('tableColumnValue', (item, column):string => {
    let value = ''

    if (item.hasOwnProperty(column.pointer)) {
        value = item[column.pointer]
    }

    return value
})

const template:string =
`
<thead class="table--header">
    <tr class="table--header--row">
    {{#each columns}}
        <th>{{{label}}}</th>
    {{/each}}
    </tr>
</thead>
<tbody class="table--body>
    {{#each items as | item |}}
        <tr class="table--body--row">
            {{#each ../columns as | column |}}
                <td>{{tableColumnValue item column}}</td>
            {{/each}}
        </tr>
    {{/each}}
</tbody>
`

export function create(
    selector: string,
    data: any,
    columns: Array<{
        label: string,
        pointer: string
    }>
) {
    const elem:HTMLElement = document.querySelector(selector)

    render(
        elem,
        template,
        {
            columns: columns,
            items: data
        }
    )
}

export default {
    create
}