import { Router } from "express";
import PolosController from "./controllers/PolosController.js";

const routes = new Router();
routes.get("/polos", PolosController.listar);

export default routes;
