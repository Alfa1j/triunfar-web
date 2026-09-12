document.addEventListener("DOMContentLoaded", () => {
  // Conectar con el botón de "+ Nuevo estudiante" o el modal si existe
  document.addEventListener("submit", async (e) => {
    const form = e.target;
    if (!form) return;

    e.preventDefault();
    e.stopPropagation();

    // Obtener todos los inputs visibles del formulario activo
    const inputs = Array.from(form.querySelectorAll("input:not([type="submit"]):not([type="hidden"]), select, textarea"));

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

    if (window.supabaseClient) {
      const { data, error } = await window.supabaseClient.from("estudiantes").insert([estudiante]);
      if (error) {
        alert("Error al guardar en Supabase: " + error.message);
      } else {
        alert("¡ÉXITO! Guardado en la nube para todos.");
        form.reset();
        window.location.reload();
      }
    } else {
      alert("Error: Supabase no está conectado.");
    }
  });
});