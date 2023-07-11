import { Request, Response } from "express";

import TruckModel from "../models/Truck";
import OrderModel from "../models/Order";
//import PointModel from "../models/Point";
import { IPoint } from "../Interfaces/Point";

;


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


    // const pickup = await PointModel.create({
    //   location: {
    //     name: routeData.pickup.name,
    //     placeId: routeData.pickup.placeId
    //   }
    // })

    // const dropoff = await PointModel.create({
    //   location : {
    //     name: routeData.dropoff.name,
    //     placeId: routeData.dropoff.placeId
    //   }
    // })
     

    const distance = 1 + 1



    // Crear la orden
    const order = await OrderModel.create({
      type,
      description,
      route: {
        location : {
            pickup: {
              name: routeData.pickup.name,
              placeId: routeData.pickup.placeId
            },
            dropoff: {
              name: routeData.dropoff.name,
              placeId: routeData.dropoff.name
            },
      },
        distance: distance
      },
      truck: truck._id,
      status: 'En progreso'
    });
    

    res.status(201).json({ message: 'Orden creada exitosamente', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al crear la orden' });
  }
}


//MODIFICAR ORDEN
export const changeOrder = async (req: Request, res: Response) => {
  // const { type, description, routeData, status, truck } = req.body
  // const { id } = req.params

  // const order = await OrderModel.findById(id)
  // console.log(order)

  // if(!order){
  //   return res.status(400).json('No se encontro la order')
  // }
  // //SI LA ORDEN NO ESTA EN PROGRESO SE MODIFICA
  // if(order.status !== 'En progreso'){
  //   //SI HAY ROUTE PARA MODIFICAR
  //   if(routeData){

  //     const pickup = await PointModel.create({
  //       location: {
  //         name: routeData.pickup.name,
  //         placeId: routeData.pickup.placeId
  //       }
  //     })
  
  //     const dropoff = await PointModel.create({
  //       location : {
  //         name: routeData.dropoff.name,
  //         placeId: routeData.dropoff.placeId
  //       }
  //     })

  //     const distance = 1 + 1

  //   // Crear la ruta nueva
  //     const route = await RouteModel.create({
  //       pickup,
  //       dropoff,
  //       distance
  //     });

  //     const orderUpdated = {
        
  //     }


  //   }
  //}
};
