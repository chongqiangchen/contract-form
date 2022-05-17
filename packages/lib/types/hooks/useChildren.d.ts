/// <reference types="react" />
import { IChildren } from "../interfaces/component";
declare function useChildren(props: IChildren): JSX.Element;
declare const Children: (props: Parameters<typeof useChildren>[0]) => JSX.Element;
export { useChildren, Children };
