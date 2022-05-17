import { JsonFragment } from "@ethersproject/abi";
import { ReactNode } from "react";
import { UseFormReturn } from "react-hook-form/dist/types";

export interface IRenderElementProps {
    abiInputItem: JsonFragment;
    attributes: any;
}

export type ISubmitFn = (abiItem: JsonFragment, changeValue: any) => void;

export interface IABISelectProps {
    abi: IABI;
    onSelect: Function;
}

export interface IFormGroupItemProps {
    index: number;
    abiItem: JsonFragment;
    onSubmit?: ISubmitFn;
    renderElement?: (props: IRenderElementProps) => JSX.Element;
    renderGroupWrapper?: (props: IRenderGroupWrapperProps) => JSX.Element;
    renderABISelect?: (props: IABISelectProps) => JSX.Element;
}

export interface IRenderGroupWrapperProps {
    index: number;
    children: ReactNode;
    abiItem: JsonFragment;
    methods: UseFormReturn;
    onSubmit?: ISubmitFn;
}

export interface IChildren {
    openAbiSelect?: boolean;
    onSubmit?: ISubmitFn;
    renderElement?: (props: IRenderElementProps) => JSX.Element;
    renderGroupWrapper?: (props: IRenderGroupWrapperProps) => JSX.Element;
    renderABISelect?: (props: IABISelectProps) => JSX.Element;
}

export interface IControllerEntryProps  {
    abiName: string;
    inputItem: JsonFragment;
    renderElement: (props: IRenderElementProps) => JSX.Element;
}

export type IABI = ReadonlyArray<JsonFragment>;