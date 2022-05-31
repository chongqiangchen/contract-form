import React from 'react';
import { IABI, IChildren, ISubmitFn } from './interfaces/component';
import filterAbiFunction from "./utils/filter-abi-function";
interface AbiPreviewerProps {
    abi: IABI;
    address: string;
    onSubmit?: ISubmitFn;
    children?: React.ReactNode;
}
declare const ContractForm: (props: AbiPreviewerProps & IChildren) => JSX.Element;
export * from './interfaces/component';
export * from './interfaces/controller';
export * from './interfaces/fragment';
export { filterAbiFunction };
export default ContractForm;
