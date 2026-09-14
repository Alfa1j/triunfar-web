async function guardarEstudiante(estudiante) {
  try {
    const payload = {
      id: estudiante.id || "est_" + Date.now(),
      nombre: estudiante.nombre || estudiante.name || "Sin nombre",
      documento: estudiante.documento || estudiante.document || "0",
      programa: estudiante.programa || estudiante.program || null
    };

    console.log("Enviando a Neon PostgreSQL:", payload);

    const response = await fetch('/api/guardar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (response.ok && data.success) {
      alert("¡ÉXITO! Guardado en Neon PostgreSQL.");
      return { success: true, data };
    } else {
      alert("Error al guardar en Neon: " + (data.error || "Respuesta inválida"));
      return { success: false, error: data.error };
    }
  } catch (error) {
    console.error("Error conectando con /api/guardar:", error);
    alert("Error de red al conectar con Neon PostgreSQL.");
    return { success: false, error: error.message };
  }
}
