// Obtener todos los estudiantes desde Supabase
async function obtenerEstudiantes() {
  try {
    const { data, error } = await supabase
      .from('estudiantes')
      .select('*');
    
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('Error al obtener estudiantes de Supabase:', err);
    return [];
  }
}

// Guardar o actualizar un estudiante en Supabase
async function guardarEstudiante(estudiante) {
  try {
    const { data, error } = await supabase
      .from('estudiantes')
      .upsert([
        {
          id: estudiante.id || `estudiante_${Date.now()}`,
          name: estudiante.nombre || estudiante.name,
          document: estudiante.documento || estudiante.document,
          program: estudiante.programa || estudiante.program
        }
      ]);

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Error al guardar en Supabase:', err);
    return { success: false, error: err.message };
  }
}
