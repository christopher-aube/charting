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
<thead class="chart--table--header">
    <tr class="chart--table--row">
    {{#each columns}}
        <th class="chart--table--cell {{{classes}}}">{{{label}}}</th>
    {{/each}}
    </tr>
</thead>
<tbody class="chart--table--body">
    {{#each items as | item |}}
        <tr class="chart--table--row">
            {{#each ../columns as | column |}}
                <td class="chart--table--cell {{{column.classes}}}">{{tableColumnValue item column}}</td>
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
        pointer: string,
        classes ?: string
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