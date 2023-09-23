// db.ts
import Dexie, { Table } from 'dexie';
import { IProducto } from '../Interfaces';


export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  productos!: Table<IProducto>; 

  constructor() {
    super('mis-productos');
    this.version(2).stores({
        productos: 'id, nombre, precio, cantidad, descuento, sum_desc, categoria, total' // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();