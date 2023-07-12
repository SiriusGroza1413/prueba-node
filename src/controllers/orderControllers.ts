import { Request, Response } from "express";

import TruckModel from "../models/Truck";
import  {PointModel, RouteModel, OrderModel} from "../models/Order";
import { createPickupAndDropoffPoints } from "../lib/createRoute";
import mongoose from "mongoose";
//import PointModel  from "../models/Point";
//import { IPoint } from "../Interfaces/Point";



//PEDIR LAS ORDENES A LA DB
export const getAllOrders = async (req: Request, res: Response) => {

  const order = await OrderModel.find().populate('route').populate('truck')
  console.log(order)
  res.status(200).json(order)
}
  
  

//CREAR UNA ORDEN NUEVA
export const createOrder = async (req: Request, res: Response) => {
  const { type, description, routeData, truckId } = req.body;

  try {
    // Verificar si el camión existe
    const truck = await TruckModel.findById(truckId);
    if (!truck) {
      return res.status(404).json({ error: 'El camión especificado no existe' });
    }

    const {pickup, dropoff} = await createPickupAndDropoffPoints(routeData)
     
    const distance = 1 + 1


    const createdRoute = await RouteModel.create({
      pickup: pickup,
      dropoff: dropoff,
      distance: distance,
    })



    // Crear la orden
    const order = await OrderModel.create({
      type,
      description,
      route: createdRoute,
      distance,
      truck: truck._id,
    });
    

    res.status(201).json({ message: 'Orden creada exitosamente', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al crear la orden' });
  }
}


//MODIFICAR ORDEN 
export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {type, description, routeData, status } = req.body;

  try {
    // Verificar el estado actual del pedido
    const order = await OrderModel.findById(id);

    if(!order) {
      return res.status(400).json('No existe la orden')
    }
    if(order.status === 'En progreso') {
      return res.status(403).json({ message: 'No se puede modificar un pedido en progreso' });
    }

    if(routeData){
    const newRoute = await createPickupAndDropoffPoints(routeData)
    const distance = 10

    
    const createdRoute = await RouteModel.create({
      pickup: newRoute.pickup,
      dropoff: newRoute.dropoff,
      distance: distance
    })


      const updatedOrder = await OrderModel.findByIdAndUpdate(id, {
        type: type,
        description: description,
        route: createdRoute,
        status: status,
      })
      res.json(updatedOrder);

    } else {
      const updatedOrder = await OrderModel.findByIdAndUpdate(id, {
        type: type,
        description: description,
        status: status,
      })
      res.json(updatedOrder);
    }
  } catch (error) {
    console.error('Error al actualizar el pedido:', error);
    res.status(500).json({ message: 'Ocurrió un error al actualizar el pedido' });
  }
}


export const deleteOrder = async (req: Request, res: Response) => {
    const { id } = req.params
    const orderToDelete = await OrderModel.findById(id)

    if(!orderToDelete) return res.status(400).json('No existe la proporcionada')

    if(orderToDelete?.status === 'En progreso'){
      await OrderModel.findByIdAndDelete(id)
      res.status(200).json('Orden eliminada exitosamente')
    } else {
      res.status(400).json('No se puede eliminar una orden en curso')
    }
} 

