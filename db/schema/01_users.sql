-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users, menu, orders, menu_orders CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50) NOT NULL,
  address VARCHAR(255)
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  users_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  order_date DATE NOT NULL,
  total_price INTEGER NOT NULL,
  quantity INTEGER NOT NULL
);

CREATE TABLE menu (
  id SERIAL PRIMARY KEY NOT NULL,
  item VARCHAR(255) NOT NULL,
  type VARCHAR(255),
  price INTEGER NOT NULL,
  description TEXT,
  thumbnail_url TEXT
);

CREATE TABLE menu_orders (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  menu_id INTEGER REFERENCES menu(id) ON DELETE CASCADE,
  order_date DATE NOT NULL,
  total_price INTEGER NOT NULL,
  quantity INTEGER NOT NULL
);


