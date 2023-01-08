import React, { useMemo } from "react";
import { useForm, useFormContext } from "react-hook-form";
import uniqueId from "lodash/uniqueId";
import FormProvider from '../providers/FormProvider';
import ControllerEntry from "./controllers";
import { IFormGroupItemProps } from "../interfaces/component";
import { shallowCompare } from "../utils/shallowCompare";
import GroupItemWrapperComponent from './GroupItemWrapper';

const FormGroupItem = (props: IFormGroupItemProps) => {
    const {
        index,
        abiItem,
        address,
        onSubmit,
        renderElement,
        renderGroupItemWrapper
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

    const groupItemWrapperProps = useMemo(() => {
        return {
            address,
            children,
            abiItem,
            methods,
            onSubmit,
            index,
        }
    }, [address, children, abiItem, methods, onSubmit, index])

    return (
        <FormProvider methods={methods} onSubmit={() => { }}>
            <GroupItemWrapperComponent
                {...groupItemWrapperProps}
                renderGroupItemWrapper={renderGroupItemWrapper}
            />
        </FormProvider>
    )
}

const MemoizedFormGroupItem = React.memo(FormGroupItem, (prev, next) => {
    return (
        shallowCompare(prev.abiItem, next.abiItem) &&
        prev.renderElement === next.renderElement &&
        prev.renderGroupItemWrapper === next.renderGroupItemWrapper &&
        prev.address === next.address
    )
})

export default MemoizedFormGroupItem;