"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["EnProgreso"] = "En Progreso";
    OrderStatus["Completado"] = "Completado";
    OrderStatus["Cancelado"] = "Cancelado";
})(OrderStatus || (OrderStatus = {}));
const orderSchema = new mongoose_1.Schema({
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
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Routes',
            required: true,
            autopopulate: true,
            select: 'pointA',
        },
        dropoff: {
            type: mongoose_1.Schema.Types.ObjectId,
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Truck',
        required: true
    },
});
const OrderModel = (0, mongoose_1.model)('Order', orderSchema);
exports.default = OrderModel;
