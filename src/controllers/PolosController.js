import { pool } from "../config/database.js";

class PolosController {
  async listar(req, res) {
    try {
      const { rows } = await pool.query("SELECT * FROM polos");
      return res.status(200).send(rows);
    } catch (err) {
      console.log(err);
      return res.status(400).send(err);
    }
  }
}

export default new PolosController();
