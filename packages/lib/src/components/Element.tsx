import React from "react";
import { IRenderElementProps } from "../interfaces/component";
import { shallowCompare } from "../utils/shallowCompare";

interface Props extends IRenderElementProps {
    renderElement?: (props: IRenderElementProps) => JSX.Element;
}

const Element = ({
    renderElement = DefaultElement,
    ...otherProps
}: Props) => {
    return renderElement(otherProps);
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

const MemoizedElement = React.memo(Element, (prev, next) => {
    const isEqualValue = prev.attributes?.field?.value === next.attributes?.field?.value
    return (
        isEqualValue &&
        shallowCompare(prev.abiInputItem, next.abiInputItem) &&
        prev.renderElement === next.renderElement
    )
})

export default MemoizedElement;