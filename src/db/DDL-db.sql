DROP SCHEMA IF EXISTS "MajiMaps" CASCADE;
-- SCHEMA CREATION
CREATE SCHEMA IF NOT EXISTS "MajiMaps";
SET search_path TO "MajiMaps";


DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'report_type_enum') THEN
        CREATE TYPE report_type_enum AS ENUM ('theft', 'leak', 'water_point');
    END IF;
END
$$;

-- TABLE CREATION
CREATE TABLE IF NOT EXISTS report (
    id SERIAL PRIMARY KEY,
    report_type report_type_enum NOT NULL,
    latitude NUMERIC(10, 7) NOT NULL,
    longitude NUMERIC(10, 7) NOT NULL,
    context VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verified BOOLEAN DEFAULT FALSE 
);

CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255) NOT NULL UNIQUE,
    emailNewsletter BOOLEAN DEFAULT FALSE,
    emailEmergency BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- INDEXES
CREATE INDEX IF NOT EXISTS idx_report_created_at ON report(created_at);
CREATE INDEX IF NOT EXISTS idx_report_type ON report(report_type);

