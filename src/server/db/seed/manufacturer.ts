import { knex, Knex } from 'knex'
import { schema } from './schema/manufacturer'
import * as utls from '../utls/table'
import * as manufacturers from './data/manufacturers'

export const tableName = 'manufacturer'

function generateData(db: Knex) {
    let data: Array<manufacturers.Type> = manufacturers.list
    console.log(`generating data for ${tableName}`)
    return utls.insert(db, tableName, data)
}

export function seed(db: Knex) {
    return new Promise(async (resolve, reject) => {

        try {
            await utls.drop(db, tableName)
            await utls.create(db, tableName, schema)
            const insertedRows = await generateData(db)
            resolve(insertedRows)
        } catch (error) {
            reject(error)
        }
    });
}

export default { seed, tableName }