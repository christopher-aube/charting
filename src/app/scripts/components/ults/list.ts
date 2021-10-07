import jsonPointer from './json-pointer'

type ListItem = {
    [key: string]: any
}

export function indexOf(
    list: Array<ListItem>,
    pointer: string,
    val: string | number | boolean
): number {
    let index:number = -1
    let listLn = list.length
    
    for (let i = 0; i < listLn; i++) {

        if (jsonPointer(list[i], pointer) === val) {
            index = i
            break;
        }
    }

    return index
}

export default {
    indexOf
}