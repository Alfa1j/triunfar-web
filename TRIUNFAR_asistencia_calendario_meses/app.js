document.addEventListener("DOMContentLoaded", () => {
  // Escuchar el evento submit del formulario de estudiantes
  document.addEventListener("submit", async (e) => {
    const form = e.target;
    if (!form) return;

    e.preventDefault();
    e.stopPropagation();

    // Obtener todos los inputs visibles del formulario activo
    const inputs = Array.from(form.querySelectorAll("input:not([type='submit']):not([type='hidden']), select, textarea"));

    if (inputs.length < 2) return;

    // Asignar por posición de campo si no hay ID o name
    const valName = inputs[0] ? inputs[0].value.trim() : "";
    const valDoc = inputs[1] ? inputs[1].value.trim() : "";
    const valProg = inputs[2] ? inputs[2].value.trim() : "";

    if (!valName) {
      alert("Por favor ingrese al menos el nombre del estudiante.");
      return;
    }

    const estudiante = {
      id: "est_" + Date.now(),
      name: valName,
      document: valDoc,
      program: valProg
    };

    try {
      // Enviar los datos a la API Route de Neon PostgreSQL en Vercel
      const respuesta = await fetch('/api/guardar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(estudiante)
      });

      const resultado = await respuesta.json();

      if (respuesta.ok && resultado.success) {
        alert("¡ÉXITO! Guardado en Neon PostgreSQL.");
        form.reset();
        window.location.reload();
      } else {
        alert("Error al guardar en Neon: " + (resultado.error || "Error en el servidor"));
      }
    } catch (err) {
      console.error("Error de red:", err);
      alert("No se pudo conectar con el servidor.");
    }
  });
});
