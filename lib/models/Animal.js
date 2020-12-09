const pool = require('../utils/pool');

module.exports = class Animal {
    id;
    color;
    type;

    constructor(row) {
      this.id = row.id;
      this.color = row.color;
      this.type = row.type;
    }

    static async insert({ color, type }) {
      const { rows } = await pool.query(
        'INSERT INTO animals (color, type) VALUES ($1, $2) RETURNING *',
        [color, type]
      );
      return new Animal(rows[0]);
    } 

    static async findAll() {
      const { rows } = await pool.query(
        'SELECT * FROM animals');
      return rows.map(row => new Animal(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM animals WHERE id=$1',
        [id]
      );

      if(!rows[0]) throw new Error(`No animal with that ${id}`);
      return new Animal(rows[0]);
    }

    static async update(id, { color, type }) {
      const { rows } = await pool.query(
        `UPDATE animals
        SET color=$1,
            type=$2
        WHERE id=$3
        RETURNING *`,
        [color, type, id]
      );
      
      if(!rows[0]) throw new Error(`No animal with the id of ${id}`);
      return new Animal(rows[0]);
    }

    static async deleteById(id) {
      const { rows } = await pool.query(
        'DELETE FROM animals WHERE id=$1 RETURNING *',
        [id]
      );

      if(!rows[0]) throw new Error(`No animal matching id ${id}`);
      return new Animal(rows[0]);
    }

};



