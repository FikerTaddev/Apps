-- Enable extensions (optional but good practice)
CREATE EXTENSION
IF NOT EXISTS "uuid-ossp";
    -- enum
    CREATE TYPE  ROLES AS ENUM('owner','member','viewer');
    -- USERS TABLE
    CREATE TABLE IF NOT EXISTS users
        (
            id       SERIAL PRIMARY KEY  ,
            email    TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL       ,
            role ROLES DEFAULT 'viewer'  ,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    -- WORKSPACE TABLE
    CREATE TABLE workspaces
        (
            id          SERIAL PRIMARY KEY               ,
            name        VARCHAR NOT NULL UNIQUE          ,
            description TEXT                             ,
            owner_id    INT NOT NULL REFERENCES users(id),
            created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    -- WORKSPACE MEMEBERS
    CREATE TABLE workspace_members
        (
            id           SERIAL PRIMARY KEY ,
            workspace_id INT NOT NULL REFERENCES workspaces(id) ON
            DELETE
                CASCADE,
                user_id INT NOT NULL REFERENCES users(id) ON
            DELETE
                CASCADE                                        ,
                role ROLES DEFAULT 'viewer'                    ,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
                UNIQUE(workspace_id, user_id) );
            -- Optional index for performance
            CREATE INDEX IF
            NOT EXISTS idx_users_email ON users
                (
                    email
                );
            CREATE INDEX IF
            NOT EXISTS idx_wm_user_id ON workspace_members
                (
                    user_id
                );