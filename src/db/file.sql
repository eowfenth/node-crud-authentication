CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	name VARCHAR(50) NOT NULL,
	username VARCHAR(20) NOT NULL,
	email VARCHAR(40) NOT NULL UNIQUE,
	password_hash VARCHAR(60) NOT NULL,
);

ALTER TABLE users ADD is_deleted BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE users DROP CONSTRAINT users_email_key;

CREATE UNIQUE index uniq_null ON users (email, is_deleted) WHERE is_deleted IS FALSE;