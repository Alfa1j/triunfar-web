document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form") || document.getElementById("formEstudiante");
  if (!form) return;

  const formLimpio = form.cloneNode(true);
  form.parentNode.replaceChild(formLimpio, form);

  formLimpio.addEventListener("submit", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const inputs = Array.from(formLimpio.querySelectorAll("input:not([type="submit"]), select, textarea"));

    const valName = inputs.find(i => /nombre|name/i.test(i.id || i.name))?.value || inputs[0]?.value || "";
    const valDoc = inputs.find(i => /doc|cedula|ident/i.test(i.id || i.name))?.value || inputs[1]?.value || "";
    const valProg = inputs.find(i => /prog|curso|carrera/i.test(i.id || i.name))?.value || inputs[2]?.value || "";

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
        formLimpio.reset();
      }
    } else {
      alert("Error: Supabase no está conectado.");
    }
  });
});