import { ReactNode } from "react";
import { IABI } from "../interfaces/component";
interface IAbiGlobalContext {
    abi: IABI;
    address: string;
}
declare const AbiGlobalProvider: ({ children, value }: {
    children: ReactNode;
    value: any;
}) => JSX.Element;
declare const useAbiGlobal: () => IAbiGlobalContext;
export { AbiGlobalProvider, useAbiGlobal, };
