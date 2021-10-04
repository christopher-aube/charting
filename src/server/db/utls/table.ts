import { knex, Knex } from 'knex'
import { asyncForEach as forEach } from '../../utls/list'
import * as base from '../seed/schema/types'
import config from '../config'

export function drop(
    db: Knex,
    tableName: string
) {
    console.log(`dropping table ${tableName}`)
    return db.schema.dropTableIfExists(tableName);
}

export function uuid(
    db: Knex,
    table: Knex.TableBuilder,
    col = 'id'
): void {

    switch (col) {
        case 'id':
            table.uuid(col)
                .primary()
                .notNullable()
                .unique()
                .defaultTo(db.raw('uuid_generate_v4()'))
            break;
        default:
            table.uuid(col)
                .notNullable()
                .unique()
                .defaultTo(db.raw('uuid_generate_v4()'))
            break;
    }
}

export function foreignKey(
    table: Knex.TableBuilder,
    opts: {
        colName: string,
        tableName: string
    }
): void {
    console.log(`creating foregin key ${opts.colName} for ${opts.tableName}`)
    table.foreign(opts.colName).references(opts.tableName + '.id')
}

export function create(
    db: Knex,
    tableName: string,
    schema: Array<base.Type>
) {
    return db
        .schema
        .withSchema(config.schema)
        .createTable(tableName, (table) => {
            const schemaLn = schema.length

            let i: number = 0

            while (i < schemaLn) {

                switch (schema[i].column.type) {
                    case 'uuid':
                        uuid(db, table, schema[i].column.name)
                        break;
                    case 'string':
                        table.string(schema[i].column.name)
                        break;
                    case 'integer':
                        table.integer(schema[i].column.name)
                        break;
                    case 'foreign':
                        table.uuid(schema[i].column.name)
                        foreignKey(table, {
                            colName: schema[i].column.name,
                            tableName: schema[i].column.table
                        })
                        break;
                }

                i++
            }
        })
}

export function insert(
    db: Knex,
    tableName: string,
    data: Array<{}>
) {

    function addItemToTable(
        item: object
    ) {
        console.log(`inserting item into ${tableName} \n`, JSON.stringify(item, null, 4))
        return db(tableName).returning('id').insert(item)
    }

    return forEach(data, addItemToTable)
}

export default {
    drop,
    uuid,
    foreignKey,
    insert,
    create
}