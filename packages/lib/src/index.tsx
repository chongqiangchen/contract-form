import React from 'react';
import Children from './components/Children';
import { IABI, IChildren, ISubmitFn } from './interfaces/component';
import { AbiGlobalProvider } from './providers/AbiGlobal';
import filterAbiFunction from "./utils/filter-abi-function";

interface AbiPreviewerProps {
    abi: IABI;
    address: string;
    onSubmit?: ISubmitFn;
    children?: React.ReactNode;
}

const ContractForm = (props: AbiPreviewerProps & IChildren) => {
    const {
        abi,
        address,
        ...others
    } = props;

    return (
        <AbiGlobalProvider value={{
            abi: filterAbiFunction(abi),
            address,
        }}>
            <Children {...others}/>
        </AbiGlobalProvider>
    )
};

export * from './interfaces/component';
export * from './interfaces/controller';
export * from './interfaces/fragment';

export {filterAbiFunction};

export default ContractForm;