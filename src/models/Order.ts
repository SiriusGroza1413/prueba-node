import { Schema, model, Document } from 'mongoose';

interface IOrder {
  type: string;
  description: string;
  route: {
    pickup: Schema.Types.ObjectId;
    dropoff: Schema.Types.ObjectId;
  };
  status: OrderStatus;
  truck: Schema.Types.ObjectId;
}

  enum OrderStatus {
    EnProgreso = 'En Progreso',
    Completado = 'Completado',
    Cancelado = 'Cancelado',
  }
  
  const orderSchema = new Schema<IOrder & Document>({
    type: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    route: {
      pickup: {
        type: Schema.Types.ObjectId,
        ref: 'Routes',
        required: true,
        autopopulate: true, 
        select: 'pointA', 
      },
      dropoff: {
        type: Schema.Types.ObjectId,
        ref: 'Routes',
        required: true,
        autopopulate: true, 
        select: 'pointB',
      },
    },
    status: { 
      type: String, 
      enum: Object.values(OrderStatus),
      default: OrderStatus.EnProgreso,
      required: true 
    },
    truck: { 
      type: Schema.Types.ObjectId,
      ref: 'Truck',
      required: true
    },
  });
  
const OrderModel = model<IOrder & Document>('Order', orderSchema);

export default OrderModel