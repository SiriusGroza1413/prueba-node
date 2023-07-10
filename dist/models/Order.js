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
const OrderModel = (0, mongoose_1.model)('Order', orderSchema);
exports.default = OrderModel;
