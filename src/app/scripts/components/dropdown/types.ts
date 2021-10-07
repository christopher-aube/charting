export type DropdownItem = {
    label: string,
    value: any,
    selected ?: boolean
}

export type DropdownConfig = {
    label: string,
    items: Array<DropdownItem>,
    selectedItem ?: DropdownItem
}

export type DropdownHandler = {
    isMenuOpen: boolean,
    elem: HTMLElement
}

export type DropdownHandlerList = Array<DropdownHandler>