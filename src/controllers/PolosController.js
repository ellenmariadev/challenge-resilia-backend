import Models from "../models/Models.js";

const PoloModel = new Models("polos");

class PolosController {
  async getAll(req, res) {
    try {
      const { rows } = await PoloModel.select("id, nome");
      return res.status(200).send(rows);
    } catch (err) {
      console.log(err);
      return res.status(400).send(err);
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;

      const poloId = await PoloModel.selectById(id);
      console.log(poloId.rows[0])

      if (!poloId.rows[0]) {
        return res.status(404).send()
      }
      return res.status(200).send(poloId.rows);
    } catch (err) {
      console.log(err);
      return res.status(500).send({ error: "Internal server error." });
    }
  }

  async create(req, res) {
    const { nome } = req.body;
    const columns = "nome";
    const values = `'${nome}'`;

    try {
      const data = await PoloModel.insert(columns, values);
      return res.status(201).send(data.rows);
    } catch (err) {
      console.log(err);
      return res.status(500).send({ error: "Internal server error." });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const poloId = await PoloModel.selectById(id);
      console.log(poloId.rows[0])

      if (!poloId.rows[0]) {
        return res.status(404).send()
      }
      const deletePolo = await PoloModel.delete(id);
      return res.status(200).send(deletePolo.rows);
    } catch (err) {
      console.log(err);
      return res.status(500).send({ error: "Internal server error." });
    }
  }
}

export default new PolosController();
