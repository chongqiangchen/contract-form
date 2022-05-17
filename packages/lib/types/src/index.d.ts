import React from 'react';
import { IABI, IChildren, ISubmitFn } from './interfaces/component';
interface AbiPreviewerProps {
    abi: IABI;
    onSubmit?: ISubmitFn;
    children?: React.ReactNode;
}
declare const ContractForm: (props: AbiPreviewerProps & IChildren) => JSX.Element;
export default ContractForm;
