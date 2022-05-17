import { IABI } from "../interfaces/component";
declare const formatAbi: (abi: IABI) => import("@ethersproject/abi").JsonFragment[];
export default formatAbi;
