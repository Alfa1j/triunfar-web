document.addEventListener("DOMContentLoaded", () => {
  // Reemplazar el formulario con un clon limpio para eliminar todos los listeners antiguos de localStorage
  const formViejo = document.querySelector("form") || document.getElementById("formEstudiante");
  if (!formViejo) return;

  const form = formViejo.cloneNode(true);
  formViejo.parentNode.replaceChild(form, formViejo);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Captura automática de campos
    const inputs = form.querySelectorAll("input, select, textarea");
    const datos = {};
    inputs.forEach(input => {
      const key = input.name || input.id;
      if (key) datos[key] = input.value;
    });

    if (typeof guardarEstudiante === "function") {
      const res = await guardarEstudiante(datos);
      if (res && res.success) {
        form.reset();
      }
    } else {
      alert("Error: Supabase no está cargado correctamente.");
    }
  });
});