import { Schema } from "mongoose";

export interface IRoute {
    pickup: Schema.Types.ObjectId;
    dropoff: Schema.Types.ObjectId;
    distance: number;
  }