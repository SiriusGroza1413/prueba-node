import OrderModel from "../models/Order";
import { Request, Response } from "express";

//PEDIR LAS ORDENES A LA DB
export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const ordersFromDb = await OrderModel.find()
        if(ordersFromDb.length){
            res.status(200).json(ordersFromDb)
        }else{
            res.status(404).json('No se encontraron ordenes')
        }
    } catch (error) {
        console.log(error)
        res.status(500).json('Error al obtener las ordenes')
    }
}