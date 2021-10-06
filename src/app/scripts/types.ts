import * as schemaManu from '../../server/db/seed/schema/manufacturer'
import * as schemaMeds from '../../server/db/seed/schema/medication'

export type RawData =
    Array<schemaManu.Design> |
    Array<schemaMeds.Design>

export type AppData = {
    ready: boolean,
    manufacturers: Array<schemaManu.Design>,
    medications: Array<schemaMeds.Design>
}

/*
    NE | Not Equal to
    EQ | Equal to
    GT | Greater than
    GE | Greater than or equal to
    LT | Less than
    LE | Less than or equal to
    EX | Does Exists * checks if property exits
    EP | Is Empty * only for arrays 
    CT | Contains * arrays or strings
    BT | Is Between * requires a min and max value
    IN | Is in * only for arrays
    NI | Is not in * only for arrays
    OR | special operator indicating that the filter value has multiple success conditions
*/
export type Operator = 'NE' | 'EQ' | 'GT' | 'GE' | 'LT' | 'LE' | 'EX' | 'EP' | 'CT' | 'BT' | 'IN' | 'NI' | 'OR'

export type JsonFilter = {
    field: string,
    op: Operator,
    value: any,
    valueFn ?: Function
}