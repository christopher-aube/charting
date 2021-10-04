import { knex, Knex } from 'knex'
import config from '../config'
import { drop, uuid, foreignKey, insert } from '../utls/table'
import { tableName as manufacturer } from './manufacturer'
import { random as randomNum } from '../../utls/nums'
import { status } from '../utls/constants'
import * as medications from './data/medications'

export const tableName = 'medications'

function createTable(db: Knex) {
    return db.schema.withSchema(config.schema).createTable(tableName, (table) => {
        uuid(db, table)
        table.string('name')
        uuid(db, table, 'code')
        table.string('status')
        table.uuid('manufacturer_id')
        foreignKey(table, { colName: 'manufacturer_id', tableName: manufacturer })
        table.integer('amount')
        table.integer('amount_numerator')
        table.integer('amount_denominator')
        table.integer('strength')
        table.integer('strength_numerator')
        table.integer('strength_denominator')
    })
}

function generateData(db: Knex, manufacturerIds: any) {
    const manuMax = manufacturerIds.length - 1;
    const medsMin = 25
    const medsMax = 50
    const medsItems = randomNum(medsMax, medsMin)
    const namesMax = medications.names.length - 1;

    let i = 0
    let data: Array<medications.Type> = []

    function randomItem(): medications.Type {
        const manuRandIndex = randomNum(manuMax)
        const nameRandIndex = randomNum(namesMax)
        
        let item = {
            name: medications.names[nameRandIndex],
            status: status.active,
            manufacturer_id: manufacturerIds[manuRandIndex],
            amount: 0,
            amount_numerator: randomNum(10),
            amount_denominator: 0,
            strength: 0,
            strength_numerator: randomNum(75),
            strength_denominator: 0
        }

        item.amount_denominator = randomNum(20, item.amount_numerator)
        item.amount = item.amount_numerator / item.amount_denominator
        item.strength_denominator = randomNum(250, item.strength_numerator)
        item.strength = item.strength_numerator / item.strength_denominator
        return item
    }

    while (i < medsItems) {
        data.push(randomItem())
        i++
    }
    
    console.log(`generating data for ${tableName}`)
    return insert(db, tableName, data)
}

export function seed(db: Knex, manufacturerIds: any) {
    return new Promise(async (resolve, reject) => {

        try {
            await drop(db, tableName)
            await createTable(db)
            await generateData(db, manufacturerIds)
            resolve(true)
        } catch (error) {
            reject(error)
        }
    });
}

export default {
    seed,
    tableName
}