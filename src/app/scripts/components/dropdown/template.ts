export const template =
`
<div class="control dropdown {{#if selectedItem}}selected{{/if}}">
    <button
        type="menu"
        class="dropdown--button"
        aria-haspopup="listbox"
        aria-expanded="false"
        aria-labelledby="dropdown--button--label dropdown--button--value"
    >
        <div class="dropdown--button--label">{{{label}}}</div>
        <div class="dropdown--button--value">{{#if selectedItem}}{{{selectedItem.label}}}{{/if}}</div>
    </button>
    
    <div class="dropdown--menu">
        <ul class="dropdown--list" role="listbox">
            {{#each items}}
                <li
                    class="dropdown--item"
                    role="option"
                    data-index="{{@index}}"
                    aria-selected="{{{selected}}}"
                >
                    <div class="dropdown--item--label">{{{label}}}</div>
                </li>
            {{/each}}
        </ul>
    </div>
</div>
`

export default template