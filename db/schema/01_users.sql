-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  owner BOOLEAN NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50) NOT NULL,
  address VARCHAR(255)
);