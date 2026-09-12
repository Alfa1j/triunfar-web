document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Capturar datos del formulario
    const nombreInput = document.querySelector('#nombre, [name="nombre"], [name="name"]');
    const documentoInput = document.querySelector('#documento, [name="documento"], [name="document"]');
    const programaInput = document.querySelector('#programa, [name="programa"], [name="program"]');

    const estudiante = {
      id: `est_${Date.now()}`,
      nombre: nombreInput ? nombreInput.value : '',
      documento: documentoInput ? documentoInput.value : '',
      programa: programaInput ? programaInput.value : ''
    };

    if (typeof guardarEstudiante === 'function') {
      const res = await guardarEstudiante(estudiante);
      if (res.success) {
        alert('¡Estudiante guardado en Supabase con éxito!');
        form.reset();
      }
    } else {
      alert('Error: La conexión con Supabase no está lista.');
    }
  });
});
git add . && git commit -m "Conectar evento submit de app.js con Supabase" && git push origin main
