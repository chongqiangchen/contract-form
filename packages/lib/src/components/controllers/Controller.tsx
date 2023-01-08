import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import ElementComponent from '../Element';
import { IControllerProps } from '../../interfaces/controller';

function BaseController<T>({
    name, abiInputItem, renderElement,
}: IControllerProps & T) {
    const { control } = useFormContext();

    return (
       <Controller
            name={name}
            control={control}
            render={(props) => {
                console.log(props);
                return <ElementComponent renderElement={renderElement} attributes={props} abiInputItem={abiInputItem} /> || null
            }}
        />
    )
}

export default BaseController;