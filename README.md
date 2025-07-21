# Sistema de Gestión de Citas para Consultorios Médicos

## Descripción

Sistema web para consultorios médicos que permite a pacientes agendar citas, visualizar su historial médico y recibir notificaciones, y al personal gestionar disponibilidad, horarios, citas y reportes.

---

## Tecnologías

- **Backend:** Node.js + Express.js
- **Base de datos:** MySQL (AWS)
- **Autenticación:** JWT (JSON Web Tokens)

---

## Autenticación y Seguridad

- Registro e inicio de sesión con contraseña encriptada (bcrypt)
- Rutas protegidas mediante JWT
- Control de acceso por roles: `admin` (1), `médico` (2), `paciente` (3)
- Validación de datos en backend

---

## Endpoints Principales

### **Auth**

- `POST /api/auth/login` — Iniciar sesión
- `POST /api/auth/register` — Registrar usuario

**Ejemplo login:**

```json
{
  "correo": "usuario@correo.com",
  "contrasena": "123456"
}
```

**Response:**

```json
{
  "token": "...jwt...",
  "user": { "id": 1, "nombre": "Juan", "correo": "...", "rol_id": 3 }
}
```

---

### **Usuarios**

- `GET /api/users` — Listar usuarios (admin)
- `GET /api/users/:id` — Ver usuario
- `PUT /api/users/:id` — Modificar usuario
- `DELETE /api/users/:id` — Eliminar usuario

---

### **Citas**

- `GET /api/citas` — Listar citas del usuario (token requerido)
- `POST /api/citas` — Agendar cita
- `DELETE /api/citas/:id` — Cancelar cita

**Ejemplo agendar cita:**

```json
{
  "medico_id": 2,
  "fecha": "2025-07-15",
  "hora": "10:00",
  "motivo": "Consulta general"
}
```

---

### **Historial Médico**

- `GET /api/historial/:pacienteId` — Ver historial de un paciente

---

### **Disponibilidad de Médicos**

- `GET /api/disponibilidad/:medicoId` — Ver disponibilidad de un médico
- `PUT /api/disponibilidad/:medicoId` — Actualizar disponibilidad (solo el propio médico o admin)

**Ejemplo actualizar:**

```json
{
  "horario_inicio": "09:00",
  "horario_fin": "14:00",
  "dias_disponibles": "Lunes,Miércoles,Viernes"
}
```

---

### **Notificaciones (Citas próximas)**

- `GET /api/notificaciones/proximas` — Ver citas próximas del paciente autenticado

---

### **Dashboard (Admin)**

- `GET /api/dashboard/metrics` — Métricas generales
- `GET /api/dashboard/medico/:id` — Métricas de un médico

---

## Notas de Seguridad

- Todos los endpoints (excepto login y registro) requieren JWT en el header `Authorization: Bearer <token>`
- El acceso a rutas está restringido por rol
- Validar siempre los datos enviados desde el frontend

---

## Ejemplo de uso de JWT

En cada request protegido:

```
Authorization: Bearer <token>
```

---

## Contacto

Para dudas o soporte, contactar al desarrollador del sistema.
