import requester from '../../services/requester/index'
import * as schema from '../../../../server/db/seed/schema/manufacturer'

export function get(
    params ?:
        {
            id ?: string
        }
) {
    let url = '/' + schema.name

    switch (typeof params) {
        case 'object':

            if (params.hasOwnProperty('id')) {
                url += '/' + params.id
            }

            break;
    }

    return requester.GET(url)
}

export default {
    get
}