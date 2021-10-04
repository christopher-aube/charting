import db from '../connector'
import { seed as seedManufacturer } from './manufacturer'
import { seed as seedMedication } from './medication'

;(async () => {

    try {
        await db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        const manufacturerIds = await seedManufacturer(db)
        await seedMedication(db, manufacturerIds)
        console.log('seeding complete')
        process.exit(0)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
})();