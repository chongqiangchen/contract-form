import React, { useEffect, useMemo, useState } from 'react';
import {
    IChildren,
    IABISelectProps,
    IRenderElementProps
} from "../interfaces/component";
import { useAbiGlobal } from '../providers/AbiGlobal';
import FormGroupItem from "../components/form-group-item";
import uniqueId from "lodash/uniqueId";

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

function useChildren(props: IChildren) {
    const {
        renderGroupItemWrapper,
        renderElement,
        renderABISelect = DefaultAbiSelect,
        openAbiSelect = false,
        customSelect = false,
        selectValue = null,
        onSubmit
    } = props;
    const {abi, address} = useAbiGlobal();
    const [selectABIKey, setSelectABIKey] = useState<string>(selectValue || abi[0] && (abi[0].name ?? ''));
    const ABISelect = renderABISelect || DefaultAbiSelect;

    const children = useMemo(() => {
        const temp = [];
        console.log(abi);

        if (openAbiSelect || customSelect) {
            if (!selectABIKey || selectABIKey === '') {
                // throw Error('不存在可选的ABI内容，请确认是否输入正确的ABI');
                return;
            }

            const curABIItem = abi.find(item => item.name === selectABIKey) || { inputs: [] };
            temp.push(
                <FormGroupItem
                    key={uniqueId()}
                    index={0}
                    abiItem={curABIItem}
                    renderElement={renderElement}
                    renderGroupItemWrapper={renderGroupItemWrapper}
                    onSubmit={onSubmit}
                    address={address}
                />
            );
        } else {
            for (let i = 0; i < abi.length; i++){
                let curABIItem = abi[i];
                temp.push(
                    <FormGroupItem
                        index={i}
                        key={uniqueId()}
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
        if (selectValue) {
            setSelectABIKey(selectValue);
        }
    }, [selectValue])

    return <>
        {openAbiSelect && !customSelect && <ABISelect address={address} abi={abi} onSelect={handleSelect}/>}
        {children}
    </>;
}

const Children = (props: Parameters<typeof useChildren>[0]) => (
    <React.Fragment>{useChildren(props)}</React.Fragment>
)

export {
    useChildren,
    Children
};