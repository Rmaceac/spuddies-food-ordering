DROP TABLE IF EXISTS menu_items CASCADE;
CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY NOT NULL,
  item VARCHAR(255) NOT NULL,
  type VARCHAR(255),
  price MONEY NOT NULL,
  description TEXT,
  thumbnail_url TEXT
);