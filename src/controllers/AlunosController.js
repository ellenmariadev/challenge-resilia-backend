import { pool } from "../config/database.js";
import Aluno from "../models/Aluno.js";

const AlunoModel = new Aluno("alunos");

class AlunosController {
  async getAll(req, res) {
    try {
      const { rows } = await AlunoModel.select("matricula, polo_id");
      return res.status(200).send(rows);
    } catch (err) {
      console.log(err);
      return res.status(400).send(err);
    }
  }

  async getByPoloId(req, res) {
    try {
      const { polo_id } = req.params;
      const polo = await AlunoModel.selectByPoloId(polo_id);
      console.log(polo);

      if (!polo.rows[0]) {
        return res.status(404).send();
      }
      return res.status(200).send(polo.rows);
    } catch (err) {
      console.log(err);
      return res.status(500).send({ error: "Internal server error." });
    }
  }

  async alterPolo(req, res) {
    const { matricula, polo_id } = req.params;
    const data = req.body;
    try {
      const poloId = await pool.query(
        "SELECT * FROM alunos WHERE polo_id = ($1) AND matricula = ($2)",
        [polo_id, matricula]
      );

      if (!poloId.rows[0]) return res.status(404).send();
      const updatePolo = await AlunoModel.update(data, matricula);

      const transfer = updatePolo.rows.map((item) => {
        return `O aluno ${item.matricula} foi transferido do Polo ${polo_id} para o Polo ${item.polo_id}`;
      });

      return res
        .status(201)
        .send({ result: updatePolo.rows, message: transfer });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ error: "Internal server error." });
    }
  }

  async create(req, res) {
    const { matricula } = req.body;
    const { polo_id } = req.params;
    const columns = "matricula, polo_id";
    const values = `'${matricula}', '${polo_id}'`;

    try {
      const aluno = await AlunoModel.selectByMatricula(matricula);
      console.log(aluno.rows[0]);

      if (aluno.rows[0]) {
        return res.status(404).send();
      }

      const data = await AlunoModel.insert(columns, values);
      return res.status(201).send(data.rows);
    } catch (err) {
      console.log(err);
      return res.status(500).send({ error: "Internal server error." });
    }
  }

  async delete(req, res) {
    try {
      const { matricula } = req.params;

      const aluno = await AlunoModel.selectByMatricula(matricula);
      console.log(aluno.rows[0]);

      if (!aluno.rows[0]) {
        return res.status(404).send();
      }

      const deleteAluno = await AlunoModel.delete(matricula);
      return res.status(200).send(deleteAluno.rows);
    } catch (err) {
      console.log(err);
      return res.status(500).send({ error: "Internal server error." });
    }
  }
}

export default new AlunosController();
