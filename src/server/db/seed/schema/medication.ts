import * as base from './types'
import { name as manuTable } from './manufacturer'

export interface Design {
    id: string,
    name: string,
    code: string,
    status: string,
    manufacturer_id: string,
    manufacturer_name ?: string,
    amount: number,
    amount_numerator: number,
    amount_denominator: number,
    strength: number,
    strength_numerator: number,
    strength_denominator: number
}

export const name = 'medications'

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
            table: manuTable
        }
    },
    {
        column: {
            name: 'amount',
            type: 'decimal'
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
            type: 'decimal'
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

export default {
    schema,
    name
}