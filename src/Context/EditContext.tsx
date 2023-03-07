import React, { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
interface IProps {
    children: React.ReactNode
}
/*
id: string;
    nombre: string;
    precio: number;
    cantidad: number;
    descuento?: number;
    categoria?: string;
    total:number,
*/
export const EditContext = createContext<any>("");

export const EditProvider = ({children}:IProps) => {
    const [data, setData] = useState<any>({id:'', nombre:'', precio:0, cantidad:1, descuento:0, categoria:'cualquiera', total:0, chekar:false});
    const location = useLocation();

    /*useEffect(()=>{
        if(data !== ""){
            setData("");
        }
    },[location.pathname])*/
    return (
        <EditContext.Provider value={{data, setData}}>
            {children}
        </EditContext.Provider>
    )
}