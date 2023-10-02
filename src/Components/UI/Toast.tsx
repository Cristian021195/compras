import { useEffect, useState } from "react"

interface IToast{
    color?:string,
    bgcolor?:string,
    cssClass?:string,
    title?:string,
    text?:string,
    status?:boolean,
    copied?:boolean,
    timeout?:number,
    children?:React.ReactNode
}
export const Toast = ({color="#f5f5f5", bgcolor="#c4ffc4", title="Title",
    text="Default Toast", status=true, children,timeout=4000, copied=false, cssClass=""}:IToast) => {
    return (
    <div style={{backgroundColor:bgcolor, color:color, position:'fixed', top:0, left:0, zIndex:3, width:'100%', height:'5rem'}}>
        <p>
            <b>{title}</b>
            <br />
            <small>{text}</small>
        </p>
        <div>{children}</div>
    </div>
    )
}
