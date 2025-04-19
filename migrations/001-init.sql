PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS categories (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT    NOT NULL UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS jokes (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id  INTEGER NOT NULL,
  setup        TEXT    NOT NULL,
  delivery     TEXT    NOT NULL,
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id)
    REFERENCES categories(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_jokes_category
  ON jokes (category_id);

INSERT OR IGNORE INTO categories (name) VALUES
  ('funnyJoke'),
  ('lameJoke');

INSERT OR IGNORE INTO jokes (category_id, setup, delivery)
  SELECT id, 'Why did the student eat his homework?', 'Because the teacher told him it was a piece of cake!'    FROM categories WHERE name='funnyJoke'
UNION ALL
  SELECT id, 'What kind of tree fits in your hand?',       'A palm tree'                                         FROM categories WHERE name='funnyJoke'
UNION ALL
  SELECT id, 'What is worse than raining cats and dogs?',  'Hailing taxis'                                       FROM categories WHERE name='funnyJoke'
UNION ALL
  SELECT id, 'Which bear is the most condescending?',      'Pan‑DUH'                                             FROM categories WHERE name='lameJoke'
UNION ALL
  SELECT id, 'What would the Terminator be called in retirement?', 'The Exterminator'                           FROM categories WHERE name='lameJoke';
