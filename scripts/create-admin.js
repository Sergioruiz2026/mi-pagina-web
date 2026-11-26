require("dotenv").config();

const fs = require("node:fs");
const path = require("node:path");
const readline = require("node:readline");
const Database = require("better-sqlite3");
const bcrypt = require("bcryptjs");

const dataDirectory = path.resolve(process.env.CMS_DATA_DIR || path.join(__dirname, "..", "data"));
const databasePath = path.join(dataDirectory, "site.db");
const username = process.argv[2]?.trim();

function readHidden(prompt) {
  return new Promise((resolve, reject) => {
    if (!process.stdin.isTTY || !process.stdin.setRawMode) {
      reject(new Error("Ejecuta este comando desde una terminal interactiva para ingresar la contraseña con seguridad."));
      return;
    }
    process.stdout.write(prompt);
    let value = "";
    const onData = (chunk) => {
      const character = chunk.toString();
      if (character === "\u0003") {
        process.stdin.setRawMode(false);
        process.stdin.pause();
        reject(new Error("Operación cancelada."));
        return;
      }
      if (character === "\r" || character === "\n") {
        process.stdin.setRawMode(false);
        process.stdin.pause();
        process.stdin.off("data", onData);
        process.stdout.write("\n");
        resolve(value);
        return;
      }
      if (character === "\u007f" || character === "\b") {
        value = value.slice(0, -1);
        return;
      }
      if (character >= " ") value += character;
    };
    process.stdin.resume();
    process.stdin.setRawMode(true);
    process.stdin.on("data", onData);
  });
}

async function main() {
  if (!username || username.length > 100) {
    throw new Error("Indica un usuario de hasta 100 caracteres: npm run create-admin -- nombre");
  }
  const password = await readHidden("Contraseña nueva (mínimo 12 caracteres): ");
  if (password.length < 12 || password.length > 200) {
    throw new Error("La contraseña debe tener entre 12 y 200 caracteres.");
  }
  const passwordHash = await bcrypt.hash(password, 12);
  fs.mkdirSync(dataDirectory, { recursive: true });
  const db = new Database(databasePath);
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
  db.prepare(`
    INSERT INTO admin_users (username, password_hash) VALUES (?, ?)
    ON CONFLICT(username) DO UPDATE SET password_hash = excluded.password_hash
  `).run(username, passwordHash);
  db.close();
  console.log(`Administrador "${username}" creado o actualizado. Usa npm start para iniciar el sitio.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
