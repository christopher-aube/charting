import { JsonFilter, Operator, RawData } from '../../types'
import jsonPointer from './json-pointer'

function validateEntity(
    op: Operator,
    val: any,
    check: any
): boolean {
    let isMatch = false
    let isExists = (val !== undefined && val !== null)

    switch (op) {
        case 'NE':
                if (!isExists) return

                if (!Array.isArray(val)) {
                    isMatch = (val !== check)
                } else {
                    isMatch = (val.indexOf(check) === -1)
                }
            break
        case 'EQ':
                if (!isExists) return
                
                if (!Array.isArray(val)) {
                    isMatch = (val === check)
                } else {
                    isMatch = (val.indexOf(check) !== -1)
                }
            break
        case 'GT':
                if (!isExists) return

                isMatch = (val > check)
            break
        case 'GE':
                if (!isExists) return

                isMatch = (val >= check)
            break;
        case 'LT':
                if (!isExists) return

                isMatch = (val < check)
            break
        case 'LE':
                if (!isExists) return

                isMatch = (val <= check)
            break
        case 'EX':
                isMatch = ((check === true && isExists) || (check === false && !isExists));
            break
        case 'EP':
            
                if (isExists) {
                    isMatch = ((val.length === 0) === check);
                } else {
                    isMatch = (check === true);
                }
            break
        case 'CT':
                if (!isExists) return

                if (!Array.isArray(val)) {
                    isMatch = (val.search(new RegExp(check, 'gi')) !== -1);
                } else {
                    isMatch = (val.indexOf(check) !== -1);
                }
            break
        case 'BT':
                if (!isExists) return

                isMatch = (val >= check.min && val <= check.max)
            break
        case 'IN':
                if (!isExists) return

                isMatch = (check.indexOf(val) !== -1)
            break
        case 'NI':
                if (!isExists) return

                isMatch = (check.indexOf(val) === -1)
            break
        default:
            console.error(`Unknown json filter operator: ${op}`)
            break
    }

    return isMatch
}

function filterEntity (
    entity: RawData,
    filter: JsonFilter
): boolean {
    let entityVal = jsonPointer(entity, filter.field)

    if (filter.hasOwnProperty('valueFn')) {
        entityVal = filter.valueFn(entityVal)
    }

    return validateEntity(filter.op, entityVal, filter.value)
}

function firstMatch (
    entity: RawData,
    filters: Array<JsonFilter>
): boolean {
    const filterLn = filters.length

    let isMatch = false
    
    for (let i = 0; i < filterLn; i++) {
        isMatch = filterEntity(entity, filters[i])

        if (isMatch) {
            break
        }
    }

    return isMatch
}

export function match (
    entity: RawData,
    filters: Array<JsonFilter>
): boolean {
    const filterLn = filters.length

    let isMatch = false

    for (let i = 0; i < filterLn; i++) {

        if (filters[i].op === 'OR') {
            isMatch = firstMatch(entity, filters[i].value)
        } else {
            isMatch = filterEntity(entity, filters[i])
        }
    }

    return isMatch
}

export function matchAll (
    entities: Array<RawData>,
    filters: Array<JsonFilter>
): Array<RawData> {
    let matches:Array<RawData> = []

    entities.forEach((entity) => {

        if (match(entity, filters) === true) {
            matches.push(entity)
        }
    })

    return matches
}

export default {
    match,
    matchAll
}