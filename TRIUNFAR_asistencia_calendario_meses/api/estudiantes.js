async function guardarEstudiante(estudiante) {
  try {
    const client = window.supabaseClient || window.supabase;
    if (!client) {
      alert("Error: El cliente de Supabase no se ha inicializado.");
      return { success: false };
    }

    const payload = {
      id: estudiante.id || "est_" + Date.now(),
      name: estudiante.nombre || estudiante.name || "Sin nombre",
      document: estudiante.documento || estudiante.document || "0",
      program: estudiante.programa || estudiante.program || null
    };

    const { data, error } = await client
      .from("estudiantes")
      .upsert([payload]);

    if (error) {
      alert("Error Supabase: " + error.message);
      return { success: false, error };
    }

    alert("¡ÉXITO! Guardado correctamente en Supabase.");
    return { success: true, data };
  } catch (err) {
    alert("Error Inesperado: " + err.message);
    return { success: false, error: err };
  }
}