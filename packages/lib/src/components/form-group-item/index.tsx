import React, { useMemo } from "react";
import { useForm, useFormContext } from "react-hook-form";
import uniqueId from "lodash/uniqueId";
import FormProvider from '../../providers/FormProvider';
import ControllerEntry from "../controllers";
import { IFormGroupItemProps, IRenderElementProps, IRenderGroupItemWrapperProps } from "../../interfaces/component";

const DefaultGroupItemWrapper = (props: IRenderGroupItemWrapperProps) => {
    const { children, abiItem, methods, onSubmit } = props;

    const { handleSubmit } = methods;

    const submit = (e: any) => {
        onSubmit && onSubmit(abiItem, e);
    }
    
    return (
        <>
            <div>{children}</div>
            <button onClick={handleSubmit(submit)}>{abiItem.name}</button>
        </>
    )
}
const DefaultElement = ({ attributes, abiInputItem }: IRenderElementProps) => {
    const { field, fieldState: { error } } = attributes || {};

    if (abiInputItem.type === 'address') {
        return (
            <>
                <label style={{ color: "black" }}>{abiInputItem.name}</label>
                <input {...field} />
                <div>error: {error}</div>
            </>
        )
    }

    if (abiInputItem.type === 'uint256') {
        return (
            <>
                <label style={{ color: "black" }}>{abiInputItem.name}</label>
                <input {...field} />
                <div>error: {error}</div>
            </>
        )
    }

    return <div />
}

const FormGroupItem = (props: IFormGroupItemProps) => {
    const {
        index,
        abiItem,
        address,
        onSubmit,
        renderElement = DefaultElement,
        renderGroupItemWrapper = DefaultGroupItemWrapper
    } = props;
    const methods = useForm({});
    const children = useMemo(() => {
        const itemDomArr = [];
        for (let inputItem of (abiItem?.inputs || [])) {
            itemDomArr.push((
                <ControllerEntry
                    key={uniqueId()}
                    abiName={abiItem.name || ''}
                    inputItem={inputItem}
                    renderElement={renderElement}
                />
            ))
        }
        return itemDomArr;
    }, [abiItem, renderElement]);

    return (
        <FormProvider methods={methods} onSubmit={() => {}}>
            {renderGroupItemWrapper({ address, children, abiItem, methods, onSubmit, index })}
        </FormProvider>
    )
}

export default FormGroupItem;