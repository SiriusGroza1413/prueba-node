import { Schema, model, Document } from 'mongoose';

interface IOrder {
  type: string;
  description: string;
  route: {
    pickup: string;
    dropoff: string;
  };
  status: OrderStatus;
  truck: string;
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
        type: String, 
        required: true 
      },
      dropoff: { 
        type: String, 
        required: true 
      },
    },
    status: { 
      type: String, enum: Object.values(OrderStatus), 
      required: true 
    },
    truck: { 
      type: String,
      required: true
    },
  });
  
const OrderModel = model<IOrder & Document>('Order', orderSchema);

export default OrderModel