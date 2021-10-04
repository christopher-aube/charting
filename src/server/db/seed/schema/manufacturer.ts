import * as base from './types'

export interface Design {
    id: string
    name: string
}

export const name: string = 'manufacturers'

export const schema: Array<base.Type> = [
    {
        column: {
            name: 'id',
            type: 'uuid'
        }
    },
    {
        column: {
            name: 'name',
            type: 'string'
        }
    }
]

export default {
    schema,
    name
}