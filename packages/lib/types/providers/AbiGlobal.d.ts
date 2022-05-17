import { ReactNode } from "react";
import { IABI } from "../interfaces/component";
declare const AbiGlobalProvider: ({ children, value }: {
    children: ReactNode;
    value: any;
}) => JSX.Element;
declare const useAbiGlobal: () => IABI;
export { AbiGlobalProvider, useAbiGlobal, };
