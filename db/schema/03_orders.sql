DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  order_time TIMESTAMP DEFAULT LOCALTIMESTAMP,
  total_price DECIMAL,
  is_ready BOOLEAN DEFAULT false,
  picked_up BOOLEAN DEFAULT false
);