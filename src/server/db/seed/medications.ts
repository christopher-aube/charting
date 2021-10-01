import { knex, Knex } from 'knex'
import config from '../config'
import { drop, uuid, foreignKey, insert } from '../utls/table'
import { tableName as manufacturer } from './manufacturer'

export const tableName = 'medications'

function createTable(db: Knex) {
    return db.schema.withSchema(config.schema).createTable(tableName, (table) => {
        uuid(db, table)
        table.string('name')
        table.string('code')
        table.string('status')
        table.uuid('manufacturer_id').unsigned()
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

    function randomItem() {
        let item = {
            name: 'test-1',
            code: 'xxx-xx-xxx',
            status: 'active',
            manufacturer_id: manufacturerIds[0],
            amount: 0,
            amount_numerator: 2,
            amount_denominator: 5,
            strength: 0,
            strength_numerator: 25,
            strength_denominator: 60
        }

        item.amount = item.amount_numerator / item.amount_denominator
        item.strength = item.strength_numerator / item.strength_denominator
        return item
    }

    let data = [
        randomItem()
    ]
    
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

export default { seed, tableName }