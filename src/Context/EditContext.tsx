import React, { createContext, useEffect, useRef, useState } from "react";
import { TProductoContext } from '../Interfaces/IContext';
interface IProps {
    children: React.ReactNode
}
export const EditContext = createContext<any>("");

export const EditProvider = ({children}:IProps) => {
    const [data, setData] = useState<any>({id:'', nombre:'', precio:0, cantidad:1, descuento:0, sum_desc:0, categoria:'cualquiera', total:0, chekar:false});
    const resetData = () => {
        setData({id:'', nombre:'', precio:0, cantidad:1, descuento:0, sum_desc:0, categoria:'cualquiera', total:0, chekar:false});
    }
    return (
        <EditContext.Provider value={{data, setData, resetData}}>
            {children}
        </EditContext.Provider>
    )
}