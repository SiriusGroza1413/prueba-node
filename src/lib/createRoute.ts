import { PointModel, pointSchema } from '../models/Order'
import { IPoint } from '../Interfaces/Point';

export async function createPickupAndDropoffPoints(routeData: any): Promise<{ pickup: any, dropoff: any }> {
  try {
    const pickup = await PointModel.create({
            location : {
            name: routeData.pickup.name,
            placeId: routeData.pickup.placeId
           }
    });
    const dropoff = await PointModel.create({
        location : {
            name: routeData.dropoff.name,
            placeId: routeData.dropoff.placeId
           }
    });

    const routes = {
        pickup,
        dropoff
    };

    return routes

  } catch (error) {
    console.error('Error al crear los puntos de recogida y entrega:', error);
    throw error;
  }
}

 