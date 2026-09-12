# TRIUNFAR 1.0 — Prototipo web

## Qué incluye
- Dashboard administrativo.
- Listado y búsqueda de estudiantes.
- Ficha individual.
- Registro de nuevos estudiantes.
- Edición de estudiantes.
- Registro centralizado de pagos.
- Recibos.
- Registro de gastos.
- Reportes básicos.
- Copias de seguridad JSON.
- Exportación de pagos CSV.
- Base de datos inicial PostgreSQL / Supabase.

## Datos migrados
Se preparó un conjunto inicial de **80 estudiantes** a partir de las hojas:
- DATOS TECNICOS
- DATOS CURSOS

Los demás módulos del archivo de 54 hojas están inventariados para su migración progresiva.

## Cómo abrir
1. Descomprime el proyecto.
2. Abre `index.html` en Chrome o Edge.
3. Para desarrollo real, súbelo a un servidor web o conéctalo a Supabase.

## Próxima conversión
Para producción se recomienda:
1. Migrar todas las bases de estudiantes.
2. Normalizar pagos e históricos.
3. Crear usuarios y permisos.
4. Conectar la aplicación a Supabase.
5. Configurar almacenamiento de documentos.
6. Publicar el sistema en un dominio.

Este prototipo guarda los cambios en el navegador mediante localStorage.


## Permiso financiero
La primera versión se conserva. La única restricción adicional es:
- Administrador: puede modificar y eliminar/anular facturas ya realizadas.
- Cajera/Usuario: puede registrar pagos y consultar información, pero NO puede modificar ni eliminar/anular facturas ya realizadas.


## Regla de acciones en Pagos y Finanzas
En la columna Acciones:
- Administrador: ve y puede usar el lápiz para modificar facturas y la opción de eliminar/anular.
- Cajera/Usuario: NO ve el lápiz de editar ni la opción de eliminar/anular las facturas ya realizadas.
- Cajera/Usuario sí conserva el registro de nuevos pagos y las demás funciones permitidas.


## Funciones añadidas en esta versión
- Campos configurables para la factura/recibo: mostrar, ocultar, agregar o quitar.
- Pagos mixtos con distribución entre efectivo y transferencia.
- Descuentos hasta cubrir el 100% de una cuenta, permitiendo facturar con pago de $0 cuando corresponde.
- Motivo obligatorio de los descuentos y trazabilidad de secretaria, motivo y valor en Pagos y Finanzas.
- Aviso de posible estudiante duplicado al registrar un alumno nuevo.
- Control de asistencia por última asistencia, alertas Activo / Ausente / Llamar y opción de retirar estudiante.
- Nueva pestaña Filtro de salón con filtros de programa, días, horario, salón y fecha de pago.


## Últimos cambios
- Pago mensual con descuento conserva el valor bruto de la mensualidad y usa el valor aplicado (pago + descuento) para semanas.
- Registro de dinero recibido en efectivo y cálculo de vuelto, visibles en el recibo.
- Módulo Asistencia con filtros, registro diario y calendario por estudiante.
- Nuevo rol Docente con acceso únicamente a Filtro de salón.
