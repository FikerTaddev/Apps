-- Enable extensions (optional but good practice)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- enum 

CREATE TYPE ROLE AS ENUM('admin','member','viewer')

-- USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'viewer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 

-- -- Optional index for performance
-- CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);