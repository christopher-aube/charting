import { DropdownConfig, DropdownHandler, DropdownHandlerList } from "./types"
import render from '../ults/renderer'
import list from '../ults/list'
import template from './template'

let dropdownList: DropdownHandlerList = []

document.addEventListener('click', (ev: MouseEvent) => {
    if (dropdownList.length === 0) { return }

    const target:HTMLElement = ev.target as HTMLElement

    dropdownList.forEach((
        handler: DropdownHandler
    ) => {

        if (
            handler.isMenuOpen &&
            !handler.elem.contains(target) &&
            !target.isSameNode(handler.elem)
        ) {
            handler.isMenuOpen = false
            handler.elem.classList.remove('open')
            handler.elem.setAttribute('aria-expanded', 'false')
        }
    })
})

export default (
    selector: string,
    config: DropdownConfig,
) => {

    function getDropElem(elemSelector ?: string):HTMLElement {
        let querySelector = selector

        if (elemSelector) {
            querySelector += ' ' + elemSelector
        }

        return document.querySelector(querySelector)
    }

    function getDropElems(elemSelectors: string):NodeListOf<HTMLElement> {
        const querySelector = selector + ' ' + elemSelectors

        return document.querySelectorAll(querySelector)
    }

    let elem:HTMLElement = getDropElem()
    let selectedIndex:number = list.indexOf(config.items, 'selected', true)

    if (selectedIndex !== -1) {
        config.selectedItem = config.items[selectedIndex]
    }

    render(elem, template, config)
    
    let btn:HTMLElement = getDropElem('.dropdown--button')
    let btnVal:HTMLElement = getDropElem('.dropdown--button--value')
    let listItemms = getDropElems('.dropdown--item')
    let dropdownHandler: DropdownHandler = {
            isMenuOpen: false,
            elem: getDropElem('.dropdown')
        }

    dropdownList.push(dropdownHandler)

    function closeMenu(
        ev ?: MouseEvent | FocusEvent
    ) {
        dropdownHandler.elem.classList.remove('open')
        dropdownHandler.elem.setAttribute('aria-expanded', 'false')
        dropdownHandler.isMenuOpen = false
    }

    function openMenu(
        ev ?: MouseEvent | FocusEvent
    ) {
        dropdownHandler.elem.classList.add('open')
        dropdownHandler.elem.setAttribute('aria-expanded', 'true')
        dropdownHandler.isMenuOpen = true
    }

    function toggleMenu(
        ev ?: MouseEvent | FocusEvent
    ) {
        if (dropdownHandler.isMenuOpen) {
            closeMenu(ev)
        } else {
            openMenu(ev)
        }
    }

    btn.onclick = toggleMenu

    function selectItem(
        this: GlobalEventHandlers,
        ev: MouseEvent
    )  {
        const item: HTMLElement = this as HTMLElement
        const itemIndex:number = parseInt(item.getAttribute('data-index'))
        let itemData = config.items[itemIndex]
        let prevItem:HTMLElement = document.querySelector('.dropdown--item[data-index="'+selectedIndex+'"]')

        if (prevItem) {
            prevItem.setAttribute('aria-selected', 'false')
        }

        config.selectedItem.selected = false
        itemData.selected = true
        config.selectedItem = itemData
        selectedIndex = itemIndex
        item.setAttribute('aria-selected', 'true')

        if (itemData.value === null) {
            dropdownHandler.elem.classList.remove('selected')
            btnVal.innerHTML = ''
        } else {
            dropdownHandler.elem.classList.add('selected')
            btnVal.innerHTML = itemData.label
        }

        closeMenu(ev)
    }

    listItemms.forEach((item: HTMLElement) => {
        item.onclick = selectItem
    })
}