import { IABI } from "../interfaces/component";
declare const filterAbiFunction: (abi: IABI) => import("@ethersproject/abi").JsonFragment[];
export default filterAbiFunction;
