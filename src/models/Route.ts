import { Schema, model, Document } from 'mongoose';

interface IRoute {
  pointA: Schema.Types.ObjectId;
  pointB: Schema.Types.ObjectId;
  distance: number;
}

const routeSchema = new Schema<IRoute & Document>({
  pointA: {
    type: Schema.Types.ObjectId,
    ref: 'Points',
    required: true,
  },
  pointB: {
    type: Schema.Types.ObjectId,
    ref: 'Points',
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
});

export const RoutesModel = model<IRoute>('Route', routeSchema);
