import db from '../connector'
import { seed as seedManufacturer } from './manufacturer'
import { seed as seedMedications } from './medications'

;(async () => {

    try {
        await db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        const manufacturerIds = await seedManufacturer(db)
        await seedMedications(db, manufacturerIds)
        console.log('seeding complete')
        process.exit(0)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
})();