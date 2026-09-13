import { Client } from 'pg';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    const query = 'INSERT INTO estudiantes (datos) VALUES ($1) RETURNING *;';
    const result = await client.query(query, [JSON.stringify(req.body)]);
    await client.end();

    return res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    if (client) await client.end();
    return res.status(500).json({ error: error.message });
  }
}
