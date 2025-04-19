# Jokebook

A simple Node/Express + SQLite jokebook API with client‑side UI.

## Prerequisites

- **Node.js** (v14+) & **npm**  
  Download from https://nodejs.org  
- **SQLite3**  
  - For CLI migrations:  
    - macOS: `brew install sqlite3`  
    - Windows/Linux: see https://sqlite.org/download.html  
  - Or install a GUI like [DB Browser for SQLite](https://sqlitebrowser.org)  
- **(Optional) VS Code** & the **SQLite** extension if you want to run migrations from your editor

## Setup

1. **Clone the repo**  
   ```bash
   git clone <your-repo-url> jokebook
   cd jokebook

npm install
 install
 sqlite3 jokebook.db < migrations/001-init.sql

start server with
node app.js
