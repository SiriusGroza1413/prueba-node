"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointModel = void 0;
const mongoose_1 = require("mongoose");
const pointSchema = new mongoose_1.Schema({
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
exports.PointModel = (0, mongoose_1.model)('Point', pointSchema);
