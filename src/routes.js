import { Router } from "express";
import PolosController from "./controllers/PolosController.js";

const routes = new Router();
routes.get("/polos", PolosController.getAll);
routes.get("/polos/:id", PolosController.getById);
routes.post("/polos", PolosController.create);
routes.delete("/polos/:id", PolosController.delete);

export default routes;
