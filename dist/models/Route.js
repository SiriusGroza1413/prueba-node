"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesModel = void 0;
const mongoose_1 = require("mongoose");
const routeSchema = new mongoose_1.Schema({
    pointA: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Points',
        required: true,
    },
    pointB: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Points',
        required: true,
    },
    distance: {
        type: Number,
        required: true,
    },
});
exports.RoutesModel = (0, mongoose_1.model)('Route', routeSchema);
