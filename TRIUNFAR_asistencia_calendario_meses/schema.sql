-- TRIUNFAR 1.0 - esquema inicial PostgreSQL / Supabase
create extension if not exists "pgcrypto";

create table users (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text unique,
  role text not null default 'advisor',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table students (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  document_type text,
  document_number text unique,
  birthplace text,
  birthdate date,
  expedition_place text,
  gender text,
  phone text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table programs (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  category text,
  active boolean not null default true
);

create table enrollments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students(id) on delete cascade,
  program_id uuid references programs(id),
  advisor_id uuid references users(id),
  enrollment_date date not null default current_date,
  status text not null default 'active',
  amount numeric(14,2) default 0
);

create table payments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students(id) on delete cascade,
  enrollment_id uuid references enrollments(id),
  receipt_number text unique not null,
  concept text not null,
  amount numeric(14,2) not null check (amount > 0),
  payment_method text,
  paid_at timestamptz not null default now(),
  received_by uuid references users(id),
  notes text
);

create table expenses (
  id uuid primary key default gen_random_uuid(),
  expense_date date not null default current_date,
  category text not null,
  description text,
  amount numeric(14,2) not null check (amount > 0),
  created_by uuid references users(id),
  created_at timestamptz not null default now()
);

create table student_documents (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students(id) on delete cascade,
  document_type text not null,
  file_url text not null,
  uploaded_at timestamptz not null default now()
);

create table disciplinary_records (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students(id) on delete cascade,
  record_date date not null default current_date,
  type text,
  description text,
  action_taken text,
  created_by uuid references users(id)
);

-- TRIUNFAR: campos ampliados de la ficha DATOS DEL ESTUDIANTE
ALTER TABLE students ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS program_bto TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS program TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS document_type TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS identification_number TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS expedition_place TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS birthdate DATE;
ALTER TABLE students ADD COLUMN IF NOT EXISTS entered_by TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS weekly_call_note TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS days TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS schedules TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS advisor TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS weekly_value NUMERIC(14,2);
ALTER TABLE students ADD COLUMN IF NOT EXISTS program_duration TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS student_type TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS double_degree_program TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS address_neighborhood TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS updated_by TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS system_entry_date DATE;


-- TRIUNFAR: usuarios, auditoría y control de facturas/pagos
CREATE TABLE IF NOT EXISTS app_users (id TEXT PRIMARY KEY, name TEXT NOT NULL, username TEXT UNIQUE NOT NULL, password TEXT NOT NULL, role TEXT NOT NULL, active BOOLEAN DEFAULT TRUE);
CREATE TABLE IF NOT EXISTS audit_log (id BIGSERIAL PRIMARY KEY, created_at TIMESTAMPTZ DEFAULT NOW(), user_name TEXT, action TEXT, detail TEXT);
ALTER TABLE payments ADD COLUMN IF NOT EXISTS edited_at TIMESTAMPTZ;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS edited_by TEXT;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS deleted_by TEXT;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS deletion_reason TEXT;

-- Control de asistencia y pagos en efectivo/transferencia
ALTER TABLE payments ADD COLUMN IF NOT EXISTS cash_amount NUMERIC DEFAULT 0;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS transfer_amount NUMERIC DEFAULT 0;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS received_cash NUMERIC DEFAULT 0;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS change_amount NUMERIC DEFAULT 0;
CREATE TABLE IF NOT EXISTS attendance_records (id BIGSERIAL PRIMARY KEY, student_id TEXT NOT NULL, attendance_date DATE NOT NULL, status TEXT NOT NULL CHECK (status IN ('present','absent')), created_at TIMESTAMPTZ DEFAULT NOW(), created_by TEXT);
CREATE INDEX IF NOT EXISTS idx_attendance_student_date ON attendance_records(student_id, attendance_date);
