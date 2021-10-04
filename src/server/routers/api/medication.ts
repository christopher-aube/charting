import * as express from 'express'
import { knex, Knex } from 'knex'
import config from '../../db/config'
import { name as tableName } from '../../db/seed/schema/medication'

const baseRoute = '/' + tableName

export function init(
    router: express.Router,
    db: Knex
): void {
    router.get(baseRoute, async(req, res) => {

        try {
            const data = await db
                .select()
                .from(tableName)
                .timeout(config.timeout)
            res.json(data)
        } catch (error) {
            res.send(error)
        }
    })

    router.get(baseRoute + '/:id', async(req, res) => {

        try {
            const data = await db
                .select()
                .from(tableName)
                .where(tableName + '.id', req.params.id)
                .timeout(config.timeout)
            res.json(data)
        } catch (error) {
            res.send(error)
        }
    })
}

export default {
    init
}