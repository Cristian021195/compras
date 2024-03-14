// db.ts
import Dexie, { Table } from 'dexie';
import { IProducto, ICompra } from '../Interfaces';


export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  productos!: Table<IProducto>; 
  compra!: Table<ICompra>;

  constructor() {
    super('mis-productos');
    this.version(7).stores({
        compra: `&super, fecha`,
        productos: 'id, precio, cantidad, descuento, sum_desc, categoria, super, total, [&nombre+super]' // Primary key and indexed props
    });
  }

  /*compras!: Table<ICompra>; 

  constructor() {
    super('mis-compras');
    this.version(7).stores({
        compra: 'idc, empresa, fecha, *productos',
        productos: 'id, nombre, precio, cantidad, descuento, sum_desc, categoria, total' // Primary key and indexed props
    });
  }*/
}

export const db = new MySubClassedDexie();