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
    text="Default Toast", status=true, children,timeout=3000, copied=false, cssClass=""}:IToast) => {
    const [hide, setHide] = useState<boolean>(false);
    useEffect(()=>{
        setTimeout(() => {
            setHide(true);
        }, timeout);
    },[])
    return (
    <div style={{backgroundColor:bgcolor, color:color, position:'absolute', top:0, left:0, zIndex:1, width:'100%'}}
        className={hide ? "d-none" : "d-block"}>
        <p>
            <b>{title}</b>
            <br />
            <small>{text}</small>
        </p>
        <div>{children}</div>
    </div>
    )
}
