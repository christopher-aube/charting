import * as base from './types'

const schema: Array<base.Type> = [
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

export {
    schema
}