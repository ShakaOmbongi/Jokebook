// models/jokeModel.js
const db = require('./db');

exports.getByCategory = (category, limit) =>
  new Promise((resolve, reject) => {
    let sql = `
      SELECT j.id, c.name AS category, j.setup, j.delivery
      FROM jokes j
      JOIN categories c ON j.category_id = c.id
      WHERE c.name = ?
    `;
    const params = [category];
    if (limit) {
      sql += ` LIMIT ?`;
      params.push(limit);
    }
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });

exports.getRandom = () =>
  new Promise((resolve, reject) => {
    db.get(
      `
      SELECT j.id, c.name AS category, j.setup, j.delivery
      FROM jokes j
      JOIN categories c ON j.category_id = c.id
      ORDER BY RANDOM()
      LIMIT 1;
    `,
      (err, row) => {
        if (err) return reject(err);
        resolve(row);
      }
    );
  });

exports.add = (category_id, setup, delivery) =>
  new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO jokes (category_id, setup, delivery) VALUES (?, ?, ?);`,
      [category_id, setup, delivery],
      function (err) {
        if (err) return reject(err);
        resolve(this.lastID);
      }
    );
  });
