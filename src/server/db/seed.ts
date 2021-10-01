import db from './connector'

;(async () => {

    try {
        await db.schema.dropTableIfExists('drugs')
        await db.schema.withSchema('public').createTable('drugs', (table) => {
            table.increments()
            table.string('name');
        })
        console.log('created table drugs');
    } catch (err) {
        console.log(err)
        process.exit(1)
    }

    try {
        await db('drugs').insert({ name: 'drug-xx-123' })
        console.log('added test data');
        process.exit(0);
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
})();