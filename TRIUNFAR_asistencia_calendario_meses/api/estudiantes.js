async function guardarEstudiante(estudiante) {
  // 1. Estructurar el objeto para la tabla de Neon PostgreSQL
  const payload = {
    id: estudiante.id || "est_" + Date.now(),
    nombre: estudiante.nombre || estudiante.name || "Sin nombre",
    documento: estudiante.documento || estudiante.document || "0",
    programa: estudiante.programa || estudiante.program || null
  };

  // 2. Enviar a Neon mediante la Serverless Function
  try {
    fetch('/api/guardar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(res => res.json())
      .then(data => console.log("Guardado en Neon correctamente:", data))
      .catch(err => console.error("Error al enviar a Neon:", err));
  } catch (err) {
    console.error("Error al iniciar fetch:", err);
  }

  // 3. Retornar respuesta exitosa para que la UI agregue la fila al instante
  return { success: true, data: payload };
}
