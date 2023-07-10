import { Schema, Document, model } from 'mongoose';

interface IPoint {
  name: string;
  coordinates: number[];
}

const pointSchema = new Schema<IPoint & Document>({
  name: {
    type: String,
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});


export const PointModel = model<IPoint>('Point', pointSchema);



