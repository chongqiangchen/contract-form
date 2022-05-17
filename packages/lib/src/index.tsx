import React from 'react';
import { Children } from './hooks/useChildren';
import { IABI, IChildren, ISubmitFn } from './interfaces/component';
import { AbiGlobalProvider } from './providers/AbiGlobal';
import formatAbi from "./utils/format-abi";

interface AbiPreviewerProps {
    abi: IABI;
    onSubmit?: ISubmitFn;
    children?: React.ReactNode;
}

const ContractForm = (props: AbiPreviewerProps & IChildren) => {
    const { abi, renderElement, openAbiSelect, renderGroupWrapper, onSubmit, renderABISelect } = props;

    return (
        <AbiGlobalProvider value={formatAbi(abi)}>
            <Children
                openAbiSelect={openAbiSelect}
                renderABISelect={renderABISelect}
                renderGroupWrapper={renderGroupWrapper}
                renderElement={renderElement}
                onSubmit={onSubmit}
            />
        </AbiGlobalProvider>
    )
};

export default ContractForm;