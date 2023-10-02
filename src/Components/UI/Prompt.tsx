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
    children?:React.ReactNode,
};

export const Prompt = ({color="#f5f5f5", bgcolor="#f5f5f5", title="Accion",borderColor="#f5f5f5",
text="¿Ejecutar Acción?", status=false, children,timeout=3000, copied=false, cssClass="", onCancel,onConfirm}:IPrompt) => {
    const [hide, setHide] = useState<boolean | undefined>(status);
    useEffect(()=>{
        //hide ? document.body.style.overflowY = 'scroll' : document.body.style.overflowY = 'hidden';
        document.body.style.overflowY = "hidden";
        return () => {
            document.body.style.overflowY = "scroll";
        }
    },[]);
    return (
        <div style={{border:'solid 0.3rem '+borderColor,height:'94%',width:'100%', borderRadius:'0.3rem', top: '50%', left: '50%',  transform: 'translate(-50%, -50%)',
            position:'absolute', backgroundColor:'rgba(0,0,0,0.05)', backdropFilter:'blur(5px)', zIndex:2}}
            className="p-2 d-flex justify-content-center align-items-center">
            <div style={{backgroundColor:bgcolor, padding:'1rem'}}>
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
                    <button type="button" className='btn text-w m-1 p-1' style={{backgroundColor:'#66BB6A'}}
                        onClick={onConfirm}
                    >Aceptar</button>
                    <button type="button" className='btn text-w m-1 p-1' style={{backgroundColor:'#e6744e'}}
                        onClick={onCancel}
                    >Cancelar</button>
                </div>
            </div>
        </div>
    )
}
