import requester from '../../services/requester/index'
import * as schema from '../../../../server/db/seed/schema/medication'

export function get(
    options ?:
        {
            id ?: string,
            join ?: boolean
        }
) {
    let url = '/' + schema.name
    let params = {
            join: false
        }

    switch (typeof options) {
        case 'object':

            if (options.hasOwnProperty('id')) {
                url += '/' + options.id
            }

            if (options.hasOwnProperty('join')) {
                params.join = options.join
            }

            break;
    }

    return requester.GET(url, params)
}

export default {
    get
}