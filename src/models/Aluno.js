import { pool } from "../config/database.js";

class Aluno {
  constructor(table) {
    this.pool = pool;
    this.table = table;
    this.pool.on(
      "error",
      (err, client) => `Error, ${err}, on idle client${client}`
    );
  }
  async select(columns, clause) {
    let query = `SELECT ${columns} FROM ${this.table}`;
    if (clause) query += clause;
    return this.pool.query(query);
  }

  async selectByPoloId(polo_id) {
    const query = `SELECT * FROM ${this.table} WHERE polo_id = $1`;
    return this.pool.query(query, [polo_id]);
  }

  async selectByMatricula(matricula) {
    const query = `SELECT * FROM ${this.table} WHERE matricula = $1`;
    return this.pool.query(query, [matricula]);
  }

  async insert(columns, values) {
    const query = `
        INSERT INTO ${this.table}(${columns})
        VALUES (${values})
        RETURNING polo_id, ${columns}
    `;
    return this.pool.query(query);
  }

  async update(data, matricula) {
    const query = `
        UPDATE ${this.table} SET matricula = $1, polo_id = $2 WHERE matricula = $3 RETURNING *`;
    return this.pool.query(query, [data.matricula, data.polo_id, matricula]);
  }

  async delete(matricula) {
    const query = `DELETE FROM ${this.table} WHERE matricula = $1 RETURNING *`;
    return this.pool.query(query, [matricula]);
  }
}

export default Aluno;
