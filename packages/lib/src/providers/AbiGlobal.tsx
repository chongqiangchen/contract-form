import React, { ReactNode, useContext } from "react";
import { IABI } from "../interfaces/component";

interface IAbiGlobalContext {

}

const AbiGlobalContext = React.createContext<IAbiGlobalContext | null>(null);

const AbiGlobalProvider = ({ children, value }: {children: ReactNode, value: any}) => (
        <AbiGlobalContext.Provider value={value}>
            {children}
        </AbiGlobalContext.Provider>
    )

const useAbiGlobal = (): IABI => useContext(AbiGlobalContext) as IABI

export {
    AbiGlobalProvider,
    useAbiGlobal,
}