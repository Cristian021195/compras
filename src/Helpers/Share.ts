import { db } from '../DB/db';
export const ShareText = async () => {
    let prods = await db.productos.toArray(pr=>pr.map(pm=>{return {nombre:pm.nombre, precio:pm.precio}}));
    let formated = prods.map(fp=>`${fp.nombre}=${fp.precio}`);
    let str = formated.join('\n');

    let myData = {title: 'Capo',text: str}
    if (navigator.canShare(myData)) {
        await navigator.share(myData);
    }else{

    }
}

export const ShareFile = async () => {
    let prods = await db.productos.toArray(pr=>pr.map(pm=>{return {nombre:pm.nombre, precio:pm.precio}}));
    let formated = prods.map(fp=>`${fp.nombre}=${fp.precio}`);
    let str = formated.join('\n');

    let myData = {title: 'Capo',text: str}
    if (navigator.canShare(myData)) {
        await navigator.share(myData);
    }else{
        
    }
}
