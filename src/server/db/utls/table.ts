import { knex, Knex } from 'knex'
import { asyncForEach as forEach } from '../../utls/list';

export function drop(db: Knex, tableName: string) {
    console.log(`dropping table ${tableName}`)
    return db.schema.dropTableIfExists(tableName);
}

export function uuid(db: Knex, table: Knex.TableBuilder): void {
    table.uuid("id")
		.primary()
		.notNullable()
		.unique()
		.defaultTo(db.raw('uuid_generate_v4()'))
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

export function insert(db: Knex, tableName: string, data: Array<{}>) {

    function addItemToTable(item: object) {
        console.log(`inserting item into ${tableName} \n`, JSON.stringify(item, null, 4))
        return db(tableName).returning('id').insert(item)
    }

    return forEach(data, addItemToTable)
}

export default { drop, uuid, foreignKey, insert }