// Interceptor global directo para asegurar el guardado en Neon
window.addEventListener("click", async (e) => {
  const target = e.target;
  
  // Detecta si el elemento cliqueado o su contenedor es un botón de guardar/crear
  const btn = target.closest("button") || target.closest("input[type='submit']") || target.closest(".btn");
  if (!btn) return;

  const textoBtn = (btn.innerText || btn.value || "").toLowerCase().trim();

  // Se activa con cualquier botón que diga guardar, registrar, crear o aceptar
  if (
    textoBtn.includes("guardar") || 
    textoBtn.includes("crear") || 
    textoBtn.includes("registrar") || 
    textoBtn.includes("aceptar")
  ) {
    // Buscar todos los inputs visibles en la pantalla actual o modal activo
    const inputs = Array.from(document.querySelectorAll("input:not([type='hidden']):not([type='submit']), select, textarea"))
      .filter(input => input.offsetWidth > 0 && input.offsetHeight > 0);

    if (inputs.length === 0) return;

    // Tomar los valores ingresados
    const datosFormulario = {};
    inputs.forEach((input, index) => {
      const clave = input.name || input.id || input.placeholder || `campo_${index + 1}`;
      if (input.value.trim() !== "") {
        datosFormulario[clave] = input.value.trim();
      }
    });

    // Validar que al menos haya algún dato diligenciado
    if (Object.keys(datosFormulario).length === 0) return;

    console.log("Enviando datos a Neon:", datosFormulario);

    try {
      const respuesta = await fetch('/api/guardar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosFormulario)
      });

      const resultado = await respuesta.json();

      if (respuesta.ok && resultado.success) {
        alert("¡ÉXITO! Guardado directamente en Neon PostgreSQL.");
        window.location.reload();
      } else {
        alert("Error en el servidor Neon: " + (resultado.error || "No se pudo insertar"));
      }
    } catch (err) {
      console.error("Error al conectar con la API:", err);
      alert("Error de conexión al guardar.");
    }
  }
}, true); // UseCapture activado para adelantarse a cualquier otro script de la página
