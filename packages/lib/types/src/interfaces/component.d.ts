import { JsonFragment } from "@ethersproject/abi";
import { ReactNode } from "react";
import { UseFormReturn } from "react-hook-form/dist/types";
export interface IRenderElementProps {
    abiInputItem: JsonFragment;
    attributes: any;
}
export declare type ISubmitFn = (abiItem: JsonFragment, changeValue: any) => void;
export interface IABISelectProps {
    abi: IABI;
    address: string;
    onSelect: Function;
}
export interface IFormGroupItemProps {
    index: number;
    abiItem: JsonFragment;
    address: string;
    onSubmit?: ISubmitFn;
    renderElement?: (props: IRenderElementProps) => JSX.Element;
    renderGroupItemWrapper?: (props: IRenderGroupItemWrapperProps) => JSX.Element;
    renderABISelect?: (props: IABISelectProps) => JSX.Element;
}
export interface IRenderGroupItemWrapperProps {
    index: number;
    address: string;
    children: ReactNode;
    abiItem: JsonFragment;
    methods: UseFormReturn;
    onSubmit?: ISubmitFn;
}
export interface IChildren {
    openAbiSelect?: boolean;
    customSelect?: boolean;
    selectValue?: any;
    onSubmit?: ISubmitFn;
    renderElement?: (props: IRenderElementProps) => JSX.Element;
    renderGroupItemWrapper?: (props: IRenderGroupItemWrapperProps) => JSX.Element;
    renderABISelect?: (props: IABISelectProps) => JSX.Element;
}
export interface IControllerEntryProps {
    abiName: string;
    inputItem: JsonFragment;
    renderElement: (props: IRenderElementProps) => JSX.Element;
}
export declare type IABI = ReadonlyArray<JsonFragment>;
