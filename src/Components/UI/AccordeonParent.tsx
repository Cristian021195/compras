import {useState} from 'react'


export const AccordionParent = ({children, state=false, cssClass=""}:any)=>{
    //const [state,setState] = useState<boolean>(false);
  return (
    <article className={"w-100 "+cssClass}>
        <div className="cacc no-select">
          <div className={state ? "cacc-body cacc-active" : "cacc-body"}>
            <div>
              {children || <></>}
            </div>
          </div>
        </div>
    </article>
  )
}