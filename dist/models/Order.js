"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = exports.RouteModel = exports.PointModel = exports.pointSchema = void 0;
const mongoose_1 = require("mongoose");
const Order_1 = require("../Interfaces/Order");
exports.pointSchema = new mongoose_1.Schema({
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
exports.PointModel = (0, mongoose_1.model)('Point', exports.pointSchema);
const routeSchema = new mongoose_1.Schema({
    pickup: exports.pointSchema,
    dropoff: exports.pointSchema,
    distance: {
        type: Number,
        required: true,
    },
});
exports.RouteModel = (0, mongoose_1.model)('Route', routeSchema);
const orderSchema = new mongoose_1.Schema({
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
        enum: Object.values(Order_1.OrderStatus),
        default: Order_1.OrderStatus.EnEspera,
        required: true
    },
    truck: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Truck',
        required: true
    },
});
exports.OrderModel = (0, mongoose_1.model)('Order', orderSchema);
