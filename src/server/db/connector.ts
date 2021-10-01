import { Knex, knex } from 'knex';

const config: Knex.Config = {
    client: 'postgres',
    connection: {
        host: 'db',
        user: 'chartingApp',
        password: 'simpleChartingAppProject',
        database: 'chartingApp',
    }
};

export default knex(config);