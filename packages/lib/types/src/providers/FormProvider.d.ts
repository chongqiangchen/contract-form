import { ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';
declare type Props = {
    children: ReactNode;
    methods: UseFormReturn<any>;
    onSubmit?: VoidFunction;
};
export default function FormProvider({ children, onSubmit, methods }: Props): JSX.Element;
export {};
