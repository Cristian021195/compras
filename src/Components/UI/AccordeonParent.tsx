import {useState} from 'react'


export const AccordionParent = ({children, state=true}:any)=>{
    //const [state,setState] = useState<boolean>(false);
  return (
    <article className="w-100">
        <div className="cacc">
          <div className={state ? "cacc-body cacc-active" : "cacc-body"}>
            <div>
              {children || <></>}
            </div>
          </div>
        </div>
    </article>
  )
}