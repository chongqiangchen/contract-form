

const extractObjValues = (obj: {[key in string]: any}, excludeKeys: string[]) => {
    const keys = Object.keys(obj);
    const newObj = keys.reduce((acc: any, key) => {
        if (!excludeKeys.includes(key)) {
            acc[key] = obj[key];
        }
        return acc;
    }, {})

    const values: any[] = [];

    Object.keys(newObj).forEach(key => {
        try {
            values.push(JSON.parse(newObj[key]));            
        } catch (error) {
            values.push(newObj[key]);
        }
    })

    return values;
}

export default extractObjValues;