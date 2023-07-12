import { RouteModel } from "../models/Order";
import { Request, Response } from "express";


export const getAllRoutes = async (req: Request, res: Response) => {
    try {
        const routes = await RouteModel.find()
        if(!routes) res.status(404).json('No se encontraron rutas')
        res.status(200).json(routes)
    } catch (error) {
        res.status(500).json('Error al obtener las rutas')
    }
}