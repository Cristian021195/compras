import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
//import { locations } from '../Utils';

interface IProps {
    x:number,
    y:number
}

const locations = ['/nuevo','/calculadora','/compartir','/configuracion', '', '/'];

export const useSlideRouter = (actual='/', runner=0, setRunner:any) => {

    const [pos1, setPos1] = useState<IProps>({x:0,y:0});
    const [pos2, setPos2] = useState<IProps>({x:0,y:0});
    const navigate = useNavigate();
    
    

    useEffect(()=>{
        document.getElementById('detector')!.addEventListener('touchstart',(e)=>{
            setPos1({x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY});
        })
    
        document.getElementById('detector')!.addEventListener('touchend',(e)=>{
            setPos2({x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY});
        })

    },[])

    useEffect(()=>{
        navigate(locations[runner]);
    },[runner])

    useEffect(() => {
        
        if(pos1.x < pos2.x){
            //console.log('de izquie a der')

            if((Math.abs(pos1.x - pos2.x)) > (window.screen.width / 6)){
                if(runner === 0){
                    setRunner(locations.length);
                }else{
                    setRunner((prev:any) => prev - 1);
                }
            }            
        }else if(pos1.x > pos2.x){
            //console.log('de der a izq')

            if((Math.abs(pos1.x - pos2.x)) > (window.screen.width / 6)){
                if(runner === locations.length){
                    setRunner(0);
                }else{
                    setRunner((prev:any)=> prev + 1);
                }
            }
        }
    }, [pos2.x])

    return {
        pos1,
        pos2,
        setPos1,
        setPos2
    }

}
  