import { Router } from "express";
import PolosController from "./controllers/PolosController.js";
import AlunosController from "./controllers/AlunosController.js";

const routes = new Router();

routes.get("/polos/:id", PolosController.getById);
routes.post("/polos", PolosController.create);
routes.delete("/polos/:id", PolosController.delete);
routes.get("/polos", PolosController.getAll);

routes.put("/alunos/:matricula/:polo_id", AlunosController.alterPolo);
routes.get("/alunos/:polo_id", AlunosController.getByPoloId);
routes.post("/alunos/:polo_id", AlunosController.create);
routes.delete("/alunos/:matricula", AlunosController.delete);
routes.get("/alunos", AlunosController.getAll);

export default routes;
