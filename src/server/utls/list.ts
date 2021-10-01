const timeout = 1000;

export function asyncForEach (list: Array<{}>, actionFn: Function): Promise<Array<{}>> {
    return new Promise(async function (resolve) {
        let actionResults
        let results = []

        for (let i = 0, ii = list.length; i < ii; i++) {

            try {
                actionResults = await actionFn(list[i], i, list)
                results.push(actionResults)
            } catch (error) {
                results.push(error)
            }
        }

        resolve(results)
    })
}

export default { asyncForEach }