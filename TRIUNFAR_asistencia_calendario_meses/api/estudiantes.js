import { supabase } from './supabase.js'

// Obtener todos los estudiantes desde Supabase
export async function obtenerEstudiantes() {
  const { data, error } = await supabase
    .from('estudiantes')
    .select('*')
  
  if (error) {
    console.error('Error al cargar estudiantes:', error)
    return []
  }
  return data
}

// Guardar un estudiante en Supabase
export async function guardarEstudiante(estudiante) {
  const { data, error } = await supabase
    .from('estudiantes')
    .insert([estudiante])
    .select()

  if (error) {
    console.error('Error al guardar estudiante:', error)
    throw error
  }
  return data
}