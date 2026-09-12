import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  try {
    if (request.method === 'GET') {
      const { rows } = await sql`SELECT * FROM students ORDER BY created_at DESC;`;
      return response.status(200).json(rows);
    } 
    
    if (request.method === 'POST') {
      const { full_name, document_type } = request.body;
      const { rows } = await sql`
        INSERT INTO students (full_name, document_type) 
        VALUES (${full_name}, ${document_type}) 
        RETURNING *;
      `;
      return response.status(200).json(rows[0]);
    }
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}