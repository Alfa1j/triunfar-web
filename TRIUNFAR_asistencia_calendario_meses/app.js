document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form") || document.getElementById("formEstudiante");
  
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const inputs = form.querySelectorAll("input, select");
      const datos = {};
      inputs.forEach(input => {
        if (input.name || input.id) {
          datos[input.name || input.id] = input.value;
        }
      });

      if (typeof guardarEstudiante === "function") {
        const res = await guardarEstudiante(datos);
        if (res && res.success) {
          form.reset();
        }
      } else {
        alert("Error: La librería de Supabase no cargó correctamente.");
      }
    });
  }
});