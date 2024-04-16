import { db } from '../DB/db';
import { ICompra, IProducto } from '../Interfaces'; //exch
/*export const ShareText = async ( selectedSuper:ICompra, cbs:()=>void ) => {
    let prods = await db.productos.toArray().then((pds)=>pds.filter((sup)=>sup.super === selectedSuper.super))
    let parsed = prods.map((e:IProducto)=> `${e.nombre}=${e.precio}`)
    let txt = parsed.join("\n");    
    let superArr = JSON.stringify(selectedSuper)+"\n"+txt;

    try {
        let myData = {title: 'Compras '+selectedSuper.super+' '+selectedSuper.fecha, text: superArr}
        if (navigator.canShare(myData)) {
            await navigator.share(myData);
            cbs();
        }else{
            throw new Error("No soporta share API");
        }   
    } catch (error:any) {
        console.log(error.message || "Error al compartir");
    }
}*/

export const ShareText = async ( selectedSuper:string, exch:number, curr:string, cbs:()=>void, cbsErr:()=>void ) => {
    let sSuper = (await db.compra.where("super").equals(selectedSuper).toArray()).find(e=>e) as ICompra;
    let prods = await db.productos.toArray().then((pds)=>pds.filter((sup)=>sup.super === selectedSuper))
    let parsed;
    if(exch === 1){
        parsed = prods.map((e:IProducto)=> `${e.nombre}=${e.precio}`);
    }else if(exch < 1){
        parsed = prods.map((e:IProducto)=> `${e.nombre}=${(e.precio*exch).toFixed(2)}`);
    }else if(exch > 1){
        parsed = prods.map((e:IProducto)=> `${e.nombre}=${(e.precio/exch).toFixed(2)}`);
    }
    let txt = parsed?.join("\n");
    let superArr = JSON.stringify({...sSuper, currencies:curr})+"\n"+txt;

    try {
        let myData = {title: 'Compras '+selectedSuper+' '+sSuper.fecha, text: superArr, currencies:curr}
        if (navigator.canShare(myData)) {
            await navigator.share(myData);
            cbs();
        }else{
            throw new Error("No soporta share API");
        }   
    } catch (error:any) {
        cbsErr();
    }
}

export const ShareFile = async (selectedSuper:string, exch:number, curr:string, cbs:()=>void, cbsErr:()=>void ) => {
    let sSuper = (await db.compra.where("super").equals(selectedSuper).toArray()).find(e=>e) as ICompra;
    let prods = await db.productos.toArray().then((pds)=>pds.filter((sup)=>sup.super === selectedSuper));
    let fileName = 'Compras '+selectedSuper+' '+sSuper.fecha;    
    let parsed;
    if(exch === 1){
        parsed = prods.map((e:IProducto)=> `${e.nombre}=${e.precio}`);
    }else if(exch < 1){
        parsed = prods.map((e:IProducto)=> `${e.nombre}=${(e.precio*exch).toFixed(2)}`);
    }else if(exch > 1){
        parsed = prods.map((e:IProducto)=> `${e.nombre}=${(e.precio/exch).toFixed(2)}`);
    }
    let txt = parsed?.join("\n");
    let superArr = JSON.stringify({...sSuper, currencies:curr})+"\n"+txt;

    const file = new File([superArr], fileName+'.txt', {
        type: 'text/plain',
    })
    //download(file);
    try {
        await navigator.share({
          files: [file],
          title: "Compras "+sSuper.fecha,
          text: selectedSuper,
        });
        cbs();
    } catch (error) {
        cbsErr();
    }
}

/*export const ShareFile = async (selectedSuper:ICompra, cbs:()=>void ) => {
    let fileName = 'Compras '+selectedSuper.super+' '+selectedSuper.fecha;
    let prods = await db.productos.toArray().then((pds)=>pds.filter((sup)=>sup.super === selectedSuper.super))
    let parsed = prods.map((e:IProducto)=> `${e.nombre}=${e.precio}`)
    let txt = parsed.join("\n");    
    let superArr = JSON.stringify(selectedSuper)+"\n"+txt;

    const file = new File([superArr], fileName+'.txt', {
        type: 'text/plain',
    })
    //download(file);
    try {
        await navigator.share({
          files: [file],
          title: "Compras "+selectedSuper.fecha,
          text: selectedSuper.super,
        });
        cbs();
    } catch (error) {
        console.log('Error al compartir archivo');
    }
}*/



  
function download(file:File){
    try {
        const link = document.createElement('a');
        const url = URL.createObjectURL(file);
      
        link.href = url;
        link.download = file.name;
        document?.body.appendChild(link);
        link.click();
      
        document?.body.removeChild(link);
        window.URL.revokeObjectURL(url);   
    } catch (error) {
        console.log("Error al descargar");
    }
}
