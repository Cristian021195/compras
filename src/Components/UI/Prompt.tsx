import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Exchange } from "../../Types";

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
    btn1?:string,
    btn2?:string,
    onCancel?:()=>void,
    onConfirm?:()=>void,
    onAlternative?:()=>void,
    children?:React.ReactNode,
};

interface IPropsExchange extends IPrompt{
    setExch: Dispatch<SetStateAction<number>>,
    exch:number,
    setCurr: Dispatch<SetStateAction<string>>,
    curr: string
}

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


export const PromptDouble = ({color="#f5f5f5", bgcolor="#f5f5f5", title="Accion",borderColor="#f5f5f5", btn1="Aceptar", btn2="Alternativo",
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
                    >{btn1}</button>
                    <button type="button" className='btn text-w m-1 p-1 c-green'
                        onClick={onConfirm}
                    >{btn2}</button>
                    <button type="button" className='btn text-w m-1 p-1 c-main'
                        onClick={onCancel}
                    >Cancelar</button>
                </div>
            </div>
        </div>
    )
}

export const PromptExchangeOpts = ({exch,setExch,setCurr,color="#f5f5f5", bgcolor="#f5f5f5", title="Accion",borderColor="#f5f5f5", btn1="Aceptar", btn2="Alternativo",
    text="¿Ejecutar Acción?", status=false, children,timeout=3000, copied=false, cssClass="", onCancel,onConfirm ,onAlternative}:IPropsExchange) => {
    const [hide, setHide] = useState<boolean | undefined>(status);
    const [exchanges, setExchanges] = useState<Exchange[]>(JSON.parse(localStorage.getItem('exchanges') || '[]'));
    const [selExch, setSelExch] = useState(1);
    useEffect(()=>{
        setCurr('1:1');
        document.body.style.overflowY = "hidden";
        return () => {
            document.body.style.overflowY = "scroll";
        }
    },[]);

    useEffect(()=>{
        let exVal = exchanges.find(ex=>ex.value+"" === exch+"")?.exchange+"";
        setCurr(exVal == 'undefined' ? '1:1' : exVal);
    },[exch]);
    return (
        <div className={"p-2 d-flex justify-content-center align-items-center prompt "+cssClass}>
            <div className="prompt-in">
                <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                </div>
                <div>
                    <label htmlFor="exchange">Tipo de cambio:</label>
                    <select name="exchange" id="exchange" defaultValue={exch} onChange={(el)=>{
                        setExch(parseFloat(el.target.value));
                        let exVal = exchanges.find(ex=>ex.value+"" === el.target.value)?.exchange+"";
                        setCurr(exVal == 'undefined' ? '1:1' : exVal);
                    }}>
                        <option value="1">defecto 1:1</option>
                        {exchanges.map((ex,exi)=><option key={exi} value={`${ex.value}`}>{ex.exchange + ": "+ ex.ucode + ex.value.toFixed(2)}</option>)}
                    </select>
                </div>
                <div>
                    <div>
                        {children}
                    </div>
                </div>
                <div>
                    <button type="button" className='btn text-w m-1 p-1 c-green'
                        onClick={onAlternative}
                    >{btn1}</button>
                    <button type="button" className='btn text-w m-1 p-1 c-green'
                        onClick={onConfirm}
                    >{btn2}</button>
                    <button type="button" className='btn text-w m-1 p-1 c-main'
                        onClick={onCancel}
                    >Cancelar</button>
                </div>
            </div>
        </div>
    )
}
