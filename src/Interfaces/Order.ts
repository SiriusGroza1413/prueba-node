import { Schema } from "mongoose";

export interface IOrder {
    type: string,
    description: string,
    route: Schema,
    status: OrderStatus,
    truck: Schema.Types.ObjectId,
}
  
export enum OrderStatus {
    EnProgreso = 'En progreso',
    Completado = 'Completado',
    Cancelado = 'Cancelado',
    EnEspera = 'En espera'
}