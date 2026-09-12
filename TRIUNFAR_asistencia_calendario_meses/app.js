// Importar funciones API creadas en api/estudiantes.js y api/asistencias.js
import { obtenerEstudiantes, guardarEstudiante, eliminarEstudiante } from './api/estudiantes.js';
import { obtenerAsistencias, guardarAsistencia } from './api/asistencias.js';

// Catálogos por defecto para la aplicación
const DEFAULT_CATALOGS = {
  schedules: ['7:30 - 10:00 AM', '7:45 - 10:00 AM', '10:00 - 12:15 PM', '1:45 - 4:00 PM'],
  secretaries: ['Johana', 'Maria', 'Isabela', 'Key', 'Katy', 'Luz', 'Laura', 'Paola'],
  advisors: ['OFICINA', 'MAXIMO', 'EDGARDO', 'ZUÑIGA', 'RAMOS', 'VILLANUEVA', 'MEDINA'],
  durations: ['4', '8', '12', '16', '48', '72', '76', '80'],
  salons: ['Salón 1', 'Salón 2', 'Salón 3', 'Salón 4', 'Salón 5'],
  concepts: ['Matrícula', 'Mensualidad', 'Derecho a grado', 'Renovación', 'Certificación']
};

// Estado global de la aplicación
let state = {
  estudiantes: [],
  asistencias: [],
  catalogs: DEFAULT_CATALOGS,
  cargando: true
};

/**
 * Inicializar la aplicación al cargar la página
 */
async function initApp() {
  console.log('Cargando datos desde Supabase...');
  state.cargando = true;

  try {
    // Cargar estudiantes y asistencias en paralelo desde Supabase
    const [estudiantesData, asistenciasData] = await Promise.all([
      obtenerEstudiantes(),
      obtenerAsistencias()
    ]);

    state.estudiantes = estudiantesData || [];
    state.asistencias = asistenciasData || [];
    state.cargando = false;

    console.log('Datos cargados exitosamente de Supabase.');
    renderUI();
  } catch (error) {
    console.error('Error al inicializar la aplicación:', error);
    state.cargando = false;
  }
}

/**
 * Registrar un nuevo estudiante
 */
export async function handleGuardarEstudiante(estudianteForm) {
  try {
    const nuevoEstudiante = {
      name: estudianteForm.name,
      document: estudianteForm.document,
      program: estudianteForm.program || 'General',
      phone: estudianteForm.phone || '',
      status: estudianteForm.status || 'activo'
    };

    // Guardar en Supabase
    const guardado = await guardarEstudiante(nuevoEstudiante);

    if (guardado) {
      // Actualizar el estado local y redibujar
      state.estudiantes.push(guardado[0] || guardado);
      renderUI();
      return true;
    }
  } catch (error) {
    alert('Error al guardar el estudiante en Supabase: ' + error.message);
    return false;
  }
}

/**
 * Registrar una asistencia
 */
export async function handleGuardarAsistencia(asistenciaForm) {
  try {
    const nuevaAsistencia = {
      student_id: asistenciaForm.studentId,
      date: asistenciaForm.date || new Date().toISOString().split('T')[0],
      status: asistenciaForm.status || 'presente',
      salon: asistenciaForm.salon || ''
    };

    // Guardar en Supabase
    const guardada = await guardarAsistencia(nuevaAsistencia);

    if (guardada) {
      state.asistencias.push(guardada[0] || guardada);
      renderUI();
      return true;
    }
  } catch (error) {
    alert('Error al registrar la asistencia en Supabase: ' + error.message);
    return false;
  }
}

/**
 * Eliminar un estudiante por ID
 */
export async function handleEliminarEstudiante(id) {
  if (!confirm('¿Seguro que deseas eliminar este estudiante?')) return;

  try {
    const exito = await eliminarEstudiante(id);
    if (exito) {
      state.estudiantes = state.estudiantes.filter(est => est.id !== id);
      renderUI();
    }
  } catch (error) {
    alert('No se pudo eliminar el estudiante de Supabase.');
  }
}

/**
 * Función encargada de renderizar la vista
 */
function renderUI() {
  if (state.cargando) {
    console.log('Renderizando vista de carga...');
    return;
  }

  // Aquí ejecutas tus funciones de renderizado del DOM de app.js
  // Ejemplo: renderTablaEstudiantes(state.estudiantes);
  console.log('Lista actual de estudiantes:', state.estudiantes);
}

// Ejecutar inicialización al cargar la ventana
window.addEventListener('DOMContentLoaded', initApp);