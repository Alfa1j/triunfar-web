async function guardarEstudiante(estudiante) {
  try {
    const client = window.supabaseClient || window.supabase;
    const { data, error } = await client
      .from('estudiantes')
      .upsert([
        {
          id: estudiante.id || `estudiante_${Date.now()}`,
          name: estudiante.nombre || estudiante.name,
          document: estudiante.documento || estudiante.document,
          program: estudiante.programa || estudiante.program || null
        }
      ]);

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Error al guardar en Supabase:', err);
    alert('Error al guardar en Supabase: ' + err.message);
    return { success: false, error: err };
  }
}
