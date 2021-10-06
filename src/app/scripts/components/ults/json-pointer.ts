export default (
    item: {},
    pointer: string
): any => {
    let result = JSON.parse(JSON.stringify(item))

    function replacer(
        match: any
    ) {
        return match ? '' : match
    }

    try {
        const internalPointer = /\[\S*\s*\]/g
        const removeInternal = /\W?/g

        let check: any
        let arrVal: Array<any> = []
        let arrPath = pointer.split('.')
        
        if (arrPath.length === 0) {
            arrPath = [pointer]
        }

        arrPath.forEach((pathFragment) => {
            check = internalPointer.exec(pathFragment)
            
            if (check === null) {
                arrVal.push(pathFragment)
            } else {
                arrVal.push(
                    pathFragment.split(internalPointer)[0],
                    check[0].replace(removeInternal, replacer)
                )
            }
        })
        
        while (arrVal.length > 0) {
            result = result[arrVal.shift()]
        }

        return result
    } catch (error) {
        console.log(error)
        return item
    }
}