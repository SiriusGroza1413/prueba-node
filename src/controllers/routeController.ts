import { OrderStatus } from "../Interfaces/Order";
import { createPickupAndDropoffPoints } from "../lib/createRoute";
import { RouteModel, OrderModel} from "../models/Order";
import { Request, Response } from "express";


export const getAllRoutes = async (req: Request, res: Response) => {
    try {
        const routes = await RouteModel.find()
        if(!routes) res.status(404).json('No se encontraron rutas')
        res.status(200).json(routes)
    } catch (error) {
        res.status(500).json('Error al obtener las rutas')
    }
}


export const deleteRoute = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
    
        // Ver si la ruta existe
        const route = await RouteModel.findById({_id: id});
        if(!route) return res.status(404).json('No se encontro la ruta')

        //buscar la orden filtrando por el id la ruta de arriba
        const order = await OrderModel.findOne({'route._id' : id})
        console.log(order)
        
        if(order?.status === 'En progreso'){
            return res.status(400).json('No se puede eliminar la orden en progreso')
        } else {
            await RouteModel.findByIdAndDelete(id)
            return res.status(200).json('La ruta fue eliminada')
        } 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la ruta y la orden en progreso' });
    }
  }