import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { IControllerProps } from '../../interfaces/controller';

function BaseController<T>({
    name, abiInputItem, renderElement,
}: IControllerProps & T) {
    const { control } = useFormContext();

    return (
       <Controller
            name={name}
            control={control}
            render={(props) => renderElement({ attributes: props, abiInputItem }) || null}
        />
    )
}

export default BaseController;