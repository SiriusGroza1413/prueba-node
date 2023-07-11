// import { Schema, model, Document } from 'mongoose';
// import { IRoute } from '../Interfaces/Route';

// const routeSchema = new Schema<IRoute & Document>({
//   pickup: {
//     type: Schema.Types.ObjectId,
//     ref: 'Points',
//     required: true,
//   },
//   dropoff: {
//     type: Schema.Types.ObjectId,
//     ref: 'Points',
//     required: true,
//   },
//   distance: {
//     type: Number,
//     required: true,
//   },
// });

// const RoutesModel = model<IRoute>('Route', routeSchema);

// export default RoutesModel