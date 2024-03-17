import { db } from '../DB/db';
import { ICompra, IProducto } from '../Interfaces';
export const ShareText = async ( selectedSuper:ICompra, cbs:()=>void ) => {
    let prods = await db.productos.toArray().then((pds)=>pds.filter((sup)=>sup.super === selectedSuper.super))
    let parsed = prods.map((e:IProducto)=> `${e.nombre}=${e.precio}`)
    let txt = parsed.join("\n");
    

    try {
        let myData = {title: 'Compras '+selectedSuper.super+' '+selectedSuper.fecha, text: txt}
        if (navigator.canShare(myData)) {
            await navigator.share(myData);
            cbs();
        }else{
            throw new Error("No soporta share API");
        }   
    } catch (error:any) {
        console.log(error.message || "Error al compartir");
    }
}

export const ShareFile = async (selectedSuper:ICompra, cbs:()=>void ) => {
    let fileName = 'Compras '+selectedSuper.super+' '+selectedSuper.fecha;
    let prods = await db.productos.toArray().then((pds)=>pds.filter((sup)=>sup.super === selectedSuper.super))
    let parsed = prods.map((e:IProducto)=> `${e.nombre}=${e.precio}`)
    let txt = parsed.join("\n");

    const file = new File([txt], fileName+'.txt', {
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
}



  
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
