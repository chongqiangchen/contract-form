import React, { useMemo, useState } from 'react';
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
        renderGroupWrapper,
        renderElement,
        renderABISelect = DefaultAbiSelect,
        openAbiSelect = false,
        onSubmit
    } = props;
    const abi = useAbiGlobal();
    const [selectABIKey, setSelectABIKey] = useState<string>(abi[0].name ?? '');
    const ABISelect = renderABISelect || DefaultAbiSelect;

    const children = useMemo(() => {
        const temp = [];

        if (openAbiSelect) {
            if (!selectABIKey || selectABIKey === '') {
                throw Error('不存在可选的ABI内容，请确认是否输入正确的ABI');
            }

            const curABIItem = abi.find(item => item.name === selectABIKey) || { inputs: [] };
            temp.push(
                <FormGroupItem
                    key={uniqueId()}
                    index={0}
                    abiItem={curABIItem}
                    renderElement={renderElement}
                    renderGroupWrapper={renderGroupWrapper}
                    onSubmit={onSubmit}
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
                        renderGroupWrapper={renderGroupWrapper}
                        onSubmit={onSubmit}
                    />
                );
            }
        }

        return temp;
    }, [openAbiSelect, selectABIKey, abi, renderElement, renderGroupWrapper, onSubmit]);

    const handleSelect = (selectValue: string) => {
        setSelectABIKey(selectValue);
    }

    return <>
        {openAbiSelect && <ABISelect abi={abi} onSelect={handleSelect}/>}
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