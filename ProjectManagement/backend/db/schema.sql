-- Enable extensions
CREATE EXTENSION
IF NOT EXISTS "uuid-ossp";
    -- Enum
    DO $$
    BEGIN
        IF NOT EXISTS
            (
                SELECT
                    1
                FROM
                    pg_type
                WHERE
                    typname = 'roles')
        THEN
            CREATE TYPE ROLES AS ENUM('owner', 'member', 'viewer');
        END
        IF;
        END $$;
        -- USERS TABLE
        CREATE TABLE IF NOT EXISTS users
            (
                id       SERIAL PRIMARY KEY  ,
                email    TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL       ,
                role ROLES DEFAULT 'viewer'  ,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ;
        -- WORKSPACE TABLE
        CREATE TABLE IF NOT EXISTS workspaces
            (
                id          SERIAL PRIMARY KEY               ,
                name        VARCHAR NOT NULL UNIQUE          ,
                description TEXT                             ,
                owner_id    INT NOT NULL REFERENCES users(id), -- Removed DEFAULT 'owner' (Type mismatch)
                created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ;
        -- WORKSPACE MEMBERS
        CREATE TABLE IF NOT EXISTS workspace_members
            (
                id           SERIAL PRIMARY KEY,
                workspace_id INT NOT NULL REFERENCES workspaces(id) ON
                DELETE
                    CASCADE,
                    user_id INT NOT NULL REFERENCES users(id) ON
                DELETE
                    CASCADE                                       ,
                    role ROLES DEFAULT 'viewer'                   ,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE(workspace_id, user_id) );
        -- PROJECTS TABLE
        CREATE TABLE IF NOT EXISTS projects
            (
                id           SERIAL PRIMARY KEY,
                name         TEXT NOT NULL     , -- Removed UNIQUE here
                description  TEXT              ,
                workspace_id INT NOT NULL REFERENCES workspaces(id) ON
                DELETE
                    CASCADE                                       ,
                    owner_id INT REFERENCES users(id)             ,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    -- This ensures uniqueness per workspace
                    UNIQUE(workspace_id, name) );
        -- Indices
        CREATE INDEX IF
        NOT EXISTS idx_users_email ON users
            (
                email
            )
        ;
        CREATE INDEX IF
        NOT EXISTS idx_wm_user_id ON workspace_members
            (
                user_id
            )
        ;
        -- Added an index for workspace lookups
        CREATE INDEX IF
        NOT EXISTS idx_projects_workspace_id ON projects
            (
                workspace_id
            );