import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  try {
    if (request.method === 'GET') {
      const { rows } = await sql`SELECT * FROM attendance_records;`;
      return response.status(200).json(rows);
    }
    if (request.method === 'POST') {
      const { student_id, attendance_date, status, observations } = request.body;
      const { rows } = await sql`
        INSERT INTO attendance_records (student_id, attendance_date, status, observations)
        VALUES (${student_id}, ${attendance_date}, ${status}, ${observations})
        ON CONFLICT (student_id, attendance_date) 
        DO UPDATE SET status = EXCLUDED.status, observations = EXCLUDED.observations
        RETURNING *;
      `;
      return response.status(200).json(rows[0]);
    }
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}