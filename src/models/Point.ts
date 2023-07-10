import { Schema, Document, model } from 'mongoose';

interface IPoint {
  location: {
    name: string;
    id: string;
  }
}

const pointSchema = new Schema<IPoint & Document>({
  location: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true
    }
  },
});


export const PointModel = model<IPoint>('Point', pointSchema);



