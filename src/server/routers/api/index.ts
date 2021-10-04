import * as express from 'express'
import { knex, Knex } from 'knex'
import * as manuApi from './manufacturer'
import * as medApi from './medication'

const router = express.Router();

export function init (
    db: Knex
): express.Router {
    manuApi.init(router, db)
    medApi.init(router, db)
    return router;
}

export default {
    init
}