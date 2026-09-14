(function () {
  console.log("🚀 Interceptor Neon PostgreSQL activado correctamente.");

  // 1. Atrapar guardados automáticos en localStorage (Base de la App)
  const originalSetItem = localStorage.setItem;
  localStorage.setItem = function (key, value) {
    originalSetItem.apply(this, arguments);

    // Si la aplicación guarda algo en localStorage, lo mandamos a Neon
    if (value && (value.includes("name") || value.includes("document") || value.includes("program") || key.includes("estudiante"))) {
      try {
        const datos = JSON.parse(value);
        enviarANeon(datos);
      } catch (e) {
        enviarANeon({ clave: key, valor: value });
      }
    }
  };

  // 2. Escuchar clics en el botón de guardar
  document.addEventListener("click", (e) => {
    const target = e.target;
    if (!target) return;
    
    const esBoton = target.tagName === "BUTTON" || target.closest("button") || target.tagName === "INPUT";
    if (!esBoton) return;

    const texto = (target.innerText || target.value || "").toLowerCase();
    if (texto.includes("guardar") || texto.includes("crear") || texto.includes("aceptar")) {
      setTimeout(() => {
        const inputs = document.querySelectorAll("input, select");
        const datos = {};
        inputs.forEach((input, i) => {
          if (input.value.trim() && input.type !== "submit" && input.type !== "hidden") {
            const nombreCampo = input.name || input.id || input.placeholder || `campo_${i}`;
            datos[nombreCampo] = input.value.trim();
          }
        });

        if (Object.keys(datos).length > 0) {
          enviarANeon(datos);
        }
      }, 200);
    }
  }, true);

  // Función principal para enviar a Neon
  async function enviarANeon(objetoDatos) {
    try {
      console.log("📤 Enviando registro a Neon...", objetoDatos);
      const res = await fetch('/api/guardar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(objetoDatos)
      });
      const resJson = await res.json();
      if (resJson.success) {
        console.log("✅ ÉXITO EN NEON:", resJson);
      }
    } catch (err) {
      console.error("❌ Error al enviar a Neon:", err);
    }
  }
})();
