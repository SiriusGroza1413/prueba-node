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
exports.createPickupAndDropoffPoints = void 0;
const Order_1 = require("../models/Order");
function createPickupAndDropoffPoints(routeData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pickup = yield Order_1.PointModel.create({
                location: {
                    name: routeData.pickup.name,
                    placeId: routeData.pickup.placeId
                }
            });
            const dropoff = yield Order_1.PointModel.create({
                location: {
                    name: routeData.dropoff.name,
                    placeId: routeData.dropoff.placeId
                }
            });
            const routes = {
                pickup,
                dropoff
            };
            return routes;
        }
        catch (error) {
            console.error('Error al crear los puntos de recogida y entrega:', error);
            throw error;
        }
    });
}
exports.createPickupAndDropoffPoints = createPickupAndDropoffPoints;
