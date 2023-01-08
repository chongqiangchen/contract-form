import React from "react";
import { IRenderGroupItemWrapperProps } from "../interfaces/component";
interface Props extends IRenderGroupItemWrapperProps {
    renderGroupItemWrapper?: (props: IRenderGroupItemWrapperProps) => JSX.Element;
}
declare const MemoizedGroupItemWrapper: React.MemoExoticComponent<({ renderGroupItemWrapper, ...otherProps }: Props) => JSX.Element>;
export default MemoizedGroupItemWrapper;
