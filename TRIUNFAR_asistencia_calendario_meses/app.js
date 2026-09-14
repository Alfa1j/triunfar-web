document.addEventListener("DOMContentLoaded", () => {
  async function enviarDatos(form) {
    const inputs = Array.from(
      form.querySelectorAll("input:not([type='submit']):not([type='hidden']), select, textarea")
    );

    if (inputs.length < 1) return;

    const valName = inputs[0] ? inputs[0].value.trim() : "";
    const valDoc = inputs[1] ? inputs[1].value.trim() : "";
    const valProg = inputs[2] ? inputs[2].value.trim() : "";

    if (!valName) {
      alert("Por favor ingrese al menos el nombre del estudiante.");
      return;
    }

    const estudiante = {
      name: valName,
      document: valDoc,
      program: valProg
    };

    try {
      const respuesta = await fetch('/api/guardar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
  }

  // Captura cuando el formulario emite el evento submit
  document.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();
    enviarDatos(e.target);
  });

  // Captura clics en botones de guardar dentro de modales
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const textoBtn = btn.innerText ? btn.innerText.toLowerCase() : "";
    if (textoBtn.includes("guardar") || textoBtn.includes("crear")) {
      const form = btn.closest("form") || document.querySelector("form");
      if (form) {
        e.preventDefault();
        enviarDatos(form);
      }
    }
  });
});
