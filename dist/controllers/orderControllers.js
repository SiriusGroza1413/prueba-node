"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrder = exports.createOrder = exports.getAllOrders = void 0;
const Truck_1 = __importDefault(require("../models/Truck"));
const Order_1 = require("../models/Order");
const createRoute_1 = require("../lib/createRoute");
//import PointModel  from "../models/Point";
//import { IPoint } from "../Interfaces/Point";
//PEDIR LAS ORDENES A LA DB
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield Order_1.OrderModel.find().populate('route').populate('truck');
    console.log(order);
    res.status(200).json(order);
});
exports.getAllOrders = getAllOrders;
//CREAR UNA ORDEN NUEVA
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, description, routeData, truckId } = req.body;
    try {
        // Verificar si el camión existe
        const truck = yield Truck_1.default.findById(truckId);
        if (!truck) {
            return res.status(404).json({ error: 'El camión especificado no existe' });
        }
        const { pickup, dropoff } = yield (0, createRoute_1.createPickupAndDropoffPoints)(routeData);
        const distance = 1 + 1;
        const createdRoute = yield Order_1.RouteModel.create({
            pickup: pickup,
            dropoff: dropoff,
            distance: distance,
        });
        // Crear la orden
        const order = yield Order_1.OrderModel.create({
            type,
            description,
            route: createdRoute,
            distance,
            truck: truck._id,
        });
        res.status(201).json({ message: 'Orden creada exitosamente', order });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error al crear la orden' });
    }
});
exports.createOrder = createOrder;
//MODIFICAR ORDEN 
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { type, description, routeData, status } = req.body;
    try {
        // Verificar el estado actual del pedido
        const order = yield Order_1.OrderModel.findById(id);
        if (!order) {
            return res.status(400).json('No existe la orden');
        }
        if (order.status === 'En progreso') {
            return res.status(403).json({ message: 'No se puede modificar un pedido en progreso' });
        }
        if (routeData) {
            const newRoute = yield (0, createRoute_1.createPickupAndDropoffPoints)(routeData);
            const distance = 10;
            const createdRoute = yield Order_1.RouteModel.create({
                pickup: newRoute.pickup,
                dropoff: newRoute.dropoff,
                distance: distance
            });
            const updatedOrder = yield Order_1.OrderModel.findByIdAndUpdate(id, {
                type: type,
                description: description,
                route: createdRoute,
                status: status,
            });
            res.json(updatedOrder);
        }
        else {
            const updatedOrder = yield Order_1.OrderModel.findByIdAndUpdate(id, {
                type: type,
                description: description,
                status: status,
            });
            res.json(updatedOrder);
        }
    }
    catch (error) {
        console.error('Error al actualizar el pedido:', error);
        res.status(500).json({ message: 'Ocurrió un error al actualizar el pedido' });
    }
});
exports.updateOrder = updateOrder;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const orderToDelete = yield Order_1.OrderModel.findById(id);
    if (!orderToDelete)
        return res.status(400).json('No existe la proporcionada');
    if ((orderToDelete === null || orderToDelete === void 0 ? void 0 : orderToDelete.status) === 'En progreso') {
        yield Order_1.OrderModel.findByIdAndDelete(id);
        res.status(200).json('Orden eliminada exitosamente');
    }
    else {
        res.status(400).json('No se puede eliminar una orden en curso');
    }
});
exports.deleteOrder = deleteOrder;
