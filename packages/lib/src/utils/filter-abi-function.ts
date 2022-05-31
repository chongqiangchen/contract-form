import { IABI } from "../interfaces/component";

const FILTER_TYPE = [
    'constructor',
    'event',
]

const filterAbiFunction = (abi: IABI) => abi.filter(item => !FILTER_TYPE.includes(item.type || '') && item.name)

export default filterAbiFunction;