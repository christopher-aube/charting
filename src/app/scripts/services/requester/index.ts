import config from '../../../../server/db/config'
import axios from 'axios'

export function GET(
    url: string
) {
    return new Promise(async function (resolve, reject) {

        try {
            const { data } = await axios.get(config.api + '/' + url);
            resolve(data);
        } catch (error) {
            reject(error);
        }
    })
}

export default {
    GET
}