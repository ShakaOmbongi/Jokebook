// models/db.js
const sqlite3 = require('sqlite3').verbose();
const fs      = require('fs');
const path    = require('path');

const db = new sqlite3.Database(
  path.join(__dirname, '..', 'jokebook.db'),
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) console.error(' Could not open database', err);
    else      console.log(' Connected to jokebook.db');
  }
);

// Read & execute  001-init.sql in one go:
const initSql = fs.readFileSync(
  path.join(__dirname, '..', 'migrations', '001-init.sql'),
  'utf8'
);

db.exec(initSql, (err) => {
  if (err) console.error('Migration failed:', err);
  else     console.log(' Migrations applied successfully');
});

module.exports = db;
