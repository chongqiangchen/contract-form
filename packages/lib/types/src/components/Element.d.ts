import React from "react";
import { IRenderElementProps } from "../interfaces/component";
interface Props extends IRenderElementProps {
    renderElement?: (props: IRenderElementProps) => JSX.Element;
}
declare const MemoizedElement: React.MemoExoticComponent<({ renderElement, ...otherProps }: Props) => JSX.Element>;
export default MemoizedElement;
