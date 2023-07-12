"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const routeRoutes_1 = __importDefault(require("./routes/routeRoutes"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use('/route', routeRoutes_1.default);
app.use('/order', orderRoutes_1.default);
exports.default = app;
