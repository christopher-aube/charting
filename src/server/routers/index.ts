import * as express from "express"
import { knex, Knex } from 'knex'
import api from './api/index'
import config from '../db/config'

export function init(
    app: express.Application,
    db: Knex
) {
    app.use(config.api, api.init(db))
}

export default {
    init
}