"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.truckSchema = void 0;
const mongoose_1 = require("mongoose");
exports.truckSchema = new mongoose_1.Schema({
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
const TruckModel = (0, mongoose_1.model)('Truck', exports.truckSchema);
exports.default = TruckModel;
