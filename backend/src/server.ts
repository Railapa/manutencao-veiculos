import express from "express";
import { pool } from "./db.js";
import type { ResultSetHeader } from "mysql2";

const app = express();
app.use(express.json());

app.get("/vehicles", async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM vehicles ORDER BY id");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar veículos" });
  }
});

app.post("/vehicles", async (req, res) => {
  const { marca, modelo, ano, km_atual } = req.body ?? {};

  if (!marca || !modelo) {
    res.status(400).json({ error: "marca e modelo são obrigatórios" });
    return;
  }

  try {
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO vehicles (marca, modelo, ano, km_atual) VALUES (?, ?, ?, ?)",
      [marca, modelo, ano ?? null, km_atual ?? null]
    );
    res.status(201).json({ id: result.insertId, marca, modelo, ano, km_atual });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao cadastrar veículo" });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});