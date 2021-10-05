import Handlebars from 'handlebars'

function render(
    elem: HTMLElement,
    template: string,
    options ?: any
) {
    const view = Handlebars.compile(template)(options)

    elem.innerHTML = view;
}

export default render