import React, { useEffect, useMemo, useState } from 'react';
import {
    IChildren,
    IABISelectProps,
    IRenderElementProps
} from "../interfaces/component";
import { useAbiGlobal } from '../providers/AbiGlobal';
import FormGroupItem from "./FormGroupItem";

const DefaultAbiSelect = ({ abi, onSelect }: IABISelectProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSelect && onSelect(e.target.value);
    }

    return (
        <select onChange={handleChange}>
            {
                abi && abi.map((item, index) => {
                    if (!item.name) {
                        return null;
                    }
                    return (<option key={item.name + index} value={item.name}>{item.name}</option>);
                })
            }
        </select>
    )
}

const Children = (props: IChildren) => {
    const {
        renderGroupItemWrapper,
        renderElement,
        renderABISelect = DefaultAbiSelect,
        openAbiSelect = false,
        customSelect = false,
        selectValue = null,
        onSubmit
    } = props;
    const { abi, address } = useAbiGlobal();
    const [selectABIKey, setSelectABIKey] = useState<string>(selectValue || abi[0] && (abi[0].name ?? ''));
    const ABISelect = renderABISelect || DefaultAbiSelect;

    const children = useMemo(() => {
        const temp = [];

        if (openAbiSelect || customSelect) {
            if (!selectABIKey || selectABIKey === '') {
                // throw Error('不存在可选的ABI内容，请确认是否输入正确的ABI');
                return;
            }

            const curABIItem = abi.find(item => item.name === selectABIKey) || { inputs: [] };
            temp.push(
                <FormGroupItem
                    key={address + '_' + curABIItem.name + '_' + 0}
                    index={0}
                    abiItem={curABIItem}
                    renderElement={renderElement}
                    renderGroupItemWrapper={renderGroupItemWrapper}
                    onSubmit={onSubmit}
                    address={address}
                />
            );
        } else {
            for (let i = 0; i < abi.length; i++) {
                let curABIItem = abi[i];
                temp.push(
                    <FormGroupItem
                        index={i}
                        key={address + '_' + curABIItem.name + '_' + i}
                        abiItem={curABIItem}
                        renderElement={renderElement}
                        renderGroupItemWrapper={renderGroupItemWrapper}
                        onSubmit={onSubmit}
                        address={address}
                    />
                );
            }
        }

        return temp;
    }, [openAbiSelect, selectABIKey, abi, renderElement, renderGroupItemWrapper, onSubmit]);

    const handleSelect = (selectValue: string) => {
        setSelectABIKey(selectValue);
    }

    useEffect(() => {
        setSelectABIKey(selectValue);
    }, [selectValue])

    return <>
        {openAbiSelect && !customSelect && <ABISelect address={address} abi={abi} onSelect={handleSelect} />}
        {children}
    </>;
}

export default Children;