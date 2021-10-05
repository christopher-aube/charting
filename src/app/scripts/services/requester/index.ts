import config from '../../../../server/db/config'
import axios from 'axios'

const timeout = 1000

axios.interceptors.request
    .use(
        (config) => {
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

axios.interceptors.response
    .use(
        (response) => {
            return response;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

export function GET(
    url: string,
    params ?: any
) {
    return new Promise(async function (resolve, reject) {

        try {
            const CancelToken = axios.CancelToken;
            const source = CancelToken.source();
            const { data } = await axios({
                    url: config.api + '/' + url,
                    method: 'GET',
                    params: params,
                    timeout: (timeout * 10),
                    cancelToken: source.token
                });
            resolve(data);
        } catch (error) {
            reject(error);
        }
    })
}

export default {
    GET
}