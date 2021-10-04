import * as base from './types'
import { tableName as manufacturer } from '../manufacturer'

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
    },
    {
        column: {
            name: 'code',
            type: 'uuid'
        }
    },
    {
        column: {
            name: 'status',
            type: 'string'
        }
    },
    {
        column: {
            name: 'manufacturer_id',
            type: 'foreign',
            table: manufacturer
        }
    },
    {
        column: {
            name: 'amount',
            type: 'integer'
        }
    },
    {
        column: {
            name: 'amount_numerator',
            type: 'integer'
        }
    },
    {
        column: {
            name: 'amount_denominator',
            type: 'integer'
        }
    },
    {
        column: {
            name: 'strength',
            type: 'integer'
        }
    },
    {
        column: {
            name: 'strength_numerator',
            type: 'integer'
        }
    },
    {
        column: {
            name: 'strength_denominator',
            type: 'integer'
        }
    }
]

export {
    schema
}