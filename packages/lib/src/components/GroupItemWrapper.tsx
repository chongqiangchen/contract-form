import React from "react";
import { IRenderGroupItemWrapperProps } from "../interfaces/component";
import { shallowCompare } from "../utils/shallowCompare";

interface Props extends IRenderGroupItemWrapperProps {
    renderGroupItemWrapper?: (props: IRenderGroupItemWrapperProps) => JSX.Element;
}

const GroupItemWrapper = ({
    renderGroupItemWrapper = DefaultGroupItemWrapper,
    ...otherProps
}: Props) => {
    return renderGroupItemWrapper(otherProps);
}

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

const MemoizedGroupItemWrapper = React.memo(GroupItemWrapper, (prev, next) => {
    return (
        prev.address === next.address &&
        shallowCompare(prev.abiItem, next.abiItem) &&
        prev.renderGroupItemWrapper === next.renderGroupItemWrapper && 
        prev.onSubmit === next.onSubmit
    )
})

export default MemoizedGroupItemWrapper;