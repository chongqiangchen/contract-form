import React from 'react';
import { IControllerEntryProps } from '../../interfaces/component';
import BaseController from './Controller';

const ControllerEntry = ({ inputItem, renderElement, abiName }: IControllerEntryProps): JSX.Element => {
    if (!inputItem.type) {
        return <></>;
    }

    const controllerName = `${abiName}_${inputItem.name}`;

    return <BaseController name={controllerName} abiInputItem={inputItem} renderElement={renderElement}/>
}

export default ControllerEntry;