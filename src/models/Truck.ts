import { Schema, model, Document } from 'mongoose';

interface ITruck{
  model: string;
  make: string;
  year: number;
  color: string;
  transportWeight: number;
  created_at: number;
}

const truckSchema = new Schema<ITruck & Document>({
  model: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  transportWeight: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Number,
    required: true,
  },
});

export const TruckModel = model<ITruck>('Truck', truckSchema);
