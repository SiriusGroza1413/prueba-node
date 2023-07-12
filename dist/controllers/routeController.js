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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoute = exports.getAllRoutes = void 0;
const Order_1 = require("../models/Order");
const getAllRoutes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const routes = yield Order_1.RouteModel.find();
        if (!routes)
            res.status(404).json('No se encontraron rutas');
        res.status(200).json(routes);
    }
    catch (error) {
        res.status(500).json('Error al obtener las rutas');
    }
});
exports.getAllRoutes = getAllRoutes;
const deleteRoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Ver si la ruta existe
        const route = yield Order_1.RouteModel.findById({ _id: id });
        if (!route)
            return res.status(404).json('No se encontro la ruta');
        //buscar la orden filtrando por el id la ruta de arriba
        const order = yield Order_1.OrderModel.findOne({ 'route._id': id });
        console.log(order);
        if ((order === null || order === void 0 ? void 0 : order.status) === 'En progreso') {
            return res.status(400).json('No se puede eliminar la orden en progreso');
        }
        else {
            yield Order_1.RouteModel.findByIdAndDelete(id);
            return res.status(200).json('La ruta fue eliminada');
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la ruta y la orden en progreso' });
    }
});
exports.deleteRoute = deleteRoute;
