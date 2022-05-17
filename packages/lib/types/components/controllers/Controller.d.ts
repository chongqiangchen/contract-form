/// <reference types="react" />
import { IControllerProps } from '../../interfaces/controller';
declare function BaseController<T>({ name, abiInputItem, renderElement, }: IControllerProps & T): JSX.Element;
export default BaseController;
