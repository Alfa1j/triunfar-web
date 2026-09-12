document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form") || document.getElementById("formEstudiante");
  
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const inputs = form.querySelectorAll("input, select");
      const datos = {};
      inputs.forEach(input => {
        if (input.name || input.id) {
          datos[input.name || input.id] = input.value;
        }
      });

      await guardarEstudiante(datos);
    });
  }
});