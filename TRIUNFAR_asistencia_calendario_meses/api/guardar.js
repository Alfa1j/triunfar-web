import { Pool } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  // Se reutiliza la conexión enviando la cadena desde la variable de entorno
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  try {
    // Captura el cuerpo enviado (soporta req.body.datos o req.body directo)
    const payload = req.body.datos || req.body;

    // Extrae campos individuales con valores por defecto
    const id = payload.id || `est_${Date.now()}`;
    const nombre = payload.nombre || payload.name || 'Sin nombre';
    const documento = payload.documento || payload.document || '0';
    const programa = payload.programa || payload.program || null;

    // Consulta parametrizada con prevención de SQL Injection
    const query = `
      INSERT INTO registros (id, nombre, documento, programa)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (id) DO UPDATE 
      SET nombre = EXCLUDED.nombre, 
          documento = EXCLUDED.documento, 
          programa = EXCLUDED.programa
      RETURNING *;
    `;

    const result = await pool.query(query, [id, nombre, documento, programa]);

    return res.status(200).json({ 
      success: true, 
      message: 'Guardado correctamente en Neon PostgreSQL',
      data: result.rows[0]
    });
  } catch (error) {
    console.error("Error en Serverless Function /api/guardar:", error);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}
