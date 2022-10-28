import { pool } from "../config/database.js";

class Models {
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

  async selectById(id) {
    const query = `SELECT * FROM ${this.table} WHERE id = $1`;
    return this.pool.query(query, [id]);
  }

  async insert(columns, values) {
    const query = `
        INSERT INTO ${this.table}(${columns})
        VALUES (${values})
        RETURNING id, ${columns}
    `;
    return this.pool.query(query);
  }

  async delete(id) {
    const query = `DELETE FROM ${this.table} WHERE id = $1 RETURNING *`;
    return this.pool.query(query, [id]);
  }
}

export default Models;
