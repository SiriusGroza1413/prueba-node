import { Schema, model, Document } from 'mongoose';
import { IOrder, OrderStatus } from '../Interfaces/Order';
import { IRoute } from '../Interfaces/Route';
import { IPoint } from '../Interfaces/Point';


export const pointSchema = new Schema<IPoint & Document>({
  location: {
    name: {
      type: String,
      required: true,
    },
    placeId: {
      type: String,
      required: true
    }
  },
});
export const PointModel = model<IPoint & Document>('Point', pointSchema)


const routeSchema = new Schema<IRoute & Document>({
  pickup: pointSchema,
  dropoff: pointSchema,
  distance: {
    type: Number,
    required: true,
  },
});
export const RouteModel = model<IRoute & Document>('Route', routeSchema)


const orderSchema = new Schema<IOrder & Document>({
  type: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  route: routeSchema,
  status: { 
    type: String,
    enum: Object.values(OrderStatus),
    default: OrderStatus.EnEspera,
    required: true 
  },
  truck: { 
    type: Schema.Types.ObjectId,
    ref: 'Truck',
    required: true
  },
});
export const OrderModel = model<IOrder & Document>('Order', orderSchema);

