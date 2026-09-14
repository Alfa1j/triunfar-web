import { NeonConfig, Pool } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  try {
    const { id, nombre, documento, programa } = req.body;

    const query = `
      INSERT INTO registros (id, nombre, documento, programa)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (id) DO UPDATE 
      SET nombre = EXCLUDED.nombre, documento = EXCLUDED.documento, programa = EXCLUDED.programa;
    `;

    await pool.query(query, [id, nombre, documento, programa]);
    await pool.end();

    return res.status(200).json({ success: true, message: 'Guardado en Neon' });
  } catch (error) {
    console.error("Error Postgres:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
