// Agrega esta función dentro de api/estudiantes.js
async function enviarANeonPostgreSQL(estudiante) {
  try {
    await fetch('/api/guardar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(estudiante)
    });
    console.log("Enviado con éxito a Neon");
  } catch (err) {
    console.error("Error al enviar a Neon:", err);
  }
}

// Ejecuta enviarANeonPostgreSQL(nuevoEstudiante) justo cuando se crea el objeto del estudiante.
