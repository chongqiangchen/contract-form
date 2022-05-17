import { JsonFragment } from "@ethersproject/abi";
import { IRenderElementProps } from "./component";

export interface IControllerProps {
    name: string;
    abiInputItem: JsonFragment,
    renderElement: (props: IRenderElementProps) => JSX.Element;
}