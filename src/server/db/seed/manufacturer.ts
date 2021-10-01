import { knex, Knex } from 'knex'
import config from '../config'
import { drop, uuid, insert } from '../utls/table'

export const tableName = 'manufacturer'

function createTable(db: Knex) {
    console.log(`creating ${tableName}`)
    return db.schema.withSchema(config.schema).createTable(tableName, (table) => {
        uuid(db, table)
        table.string('name')
    })
}

function generateData(db: Knex) {
    let data = [
        { name: 'Amgen' },
        { name: 'Sanofi' },
        { name: 'Bristol-Myers Squibb' },
        { name: 'Takeda' },
        { name: 'AbbVie' },
        { name: 'Novartis' },
        { name: 'Merck' },
        { name: 'Johnson & Johnson' },
        { name: 'Pfizer' },
        { name: 'Roche' }
    ]
    console.log(`generating data for ${tableName}`)
    return insert(db, tableName, data)
}

export function seed(db: Knex) {
    return new Promise(async (resolve, reject) => {

        try {
            await drop(db, tableName)
            await createTable(db)
            const insertedRows = await generateData(db)
            resolve(insertedRows)
        } catch (error) {
            reject(error)
        }
    });
}

export default { seed, tableName }