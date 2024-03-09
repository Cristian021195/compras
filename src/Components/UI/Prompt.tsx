import { useEffect, useState } from "react"

interface IPrompt{
    color?:string,
    bgcolor?:string,
    borderColor?:string,
    cssClass?:string,
    title?:string,
    text?:string,
    status?:boolean,
    copied?:boolean,
    timeout?:number,
    onCancel?:()=>void,
    onConfirm?:()=>void,
    onAlternative?:()=>void,
    children?:React.ReactNode,
};

export const Prompt = ({color="#f5f5f5", bgcolor="#f5f5f5", title="Accion",borderColor="#f5f5f5",
text="¿Ejecutar Acción?", status=false, children,timeout=3000, copied=false, cssClass="", onCancel,onConfirm}:IPrompt) => {
    const [hide, setHide] = useState<boolean | undefined>(status);
    useEffect(()=>{
        document.body.style.overflowY = "hidden";
        return () => {
            document.body.style.overflowY = "scroll";
        }
    },[]);
    return (
        <div className={"p-2 d-flex justify-content-center align-items-center prompt "+cssClass}>
            <div className="prompt-in">
                <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                </div>
                <div>
                    <div>
                        {children}
                    </div>
                </div>
                <div>
                    <button type="button" className='btn text-w m-1 p-1 c-green' 
                        onClick={onConfirm}
                    >Aceptar</button>
                    <button type="button" className='btn text-w m-1 p-1 c-main' 
                        onClick={onCancel}
                    >Cancelar</button>
                </div>
            </div>
        </div>
    )
}


export const PromptDouble = ({color="#f5f5f5", bgcolor="#f5f5f5", title="Accion",borderColor="#f5f5f5",
text="¿Ejecutar Acción?", status=false, children,timeout=3000, copied=false, cssClass="", onCancel,onConfirm ,onAlternative}:IPrompt) => {
    const [hide, setHide] = useState<boolean | undefined>(status);
    useEffect(()=>{
        document.body.style.overflowY = "hidden";
        return () => {
            document.body.style.overflowY = "scroll";
        }
    },[]);
    return (
        <div className={"p-2 d-flex justify-content-center align-items-center prompt "+cssClass}>
            <div className="prompt-in">
                <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                </div>
                <div>
                    <div>
                        {children}
                    </div>
                </div>
                <div>
                    <button type="button" className='btn text-w m-1 p-1 c-green'
                        onClick={onAlternative}
                    >Descargar</button>
                    <button type="button" className='btn text-w m-1 p-1 c-green'
                        onClick={onConfirm}
                    >Compartir</button>
                    <button type="button" className='btn text-w m-1 p-1 c-main'
                        onClick={onCancel}
                    >Cancelar</button>
                </div>
            </div>
        </div>
    )
}
