// models/categoryModel.js
const db = require('./db');

exports.getAll = () =>
  new Promise((resolve, reject) => {
    db.all(`SELECT name FROM categories;`, (err, rows) => {
      if (err) return reject(err);
      resolve(rows.map(r => r.name));
    });
  });

exports.getByName = (name) =>
  new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM categories WHERE name = ?;`,
      [name],
      (err, row) => {
        if (err) return reject(err);
        resolve(row);
      }
    );
  });

//  add a category and return its new ID
exports.add = (name) =>
  new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO categories (name) VALUES (?);`,
      [name],
      function (err) {
        if (err) return reject(err);
        resolve(this.lastID);
      }
    );
  });
