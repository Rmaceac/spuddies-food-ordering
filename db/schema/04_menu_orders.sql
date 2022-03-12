-- DROP TABLE IF EXISTS menu_orders, menu, users, orders CASCADE;

-- CREATE TABLE menu_orders (
--   id SERIAL PRIMARY KEY NOT NULL,
--   order_id REFERENCES orders(id) CASCADE ON DELETE,
--   menu_id REFERENCES menu(id) CASCADE ON DELETE,
--   order_date DATE NOT NULL,
--   total_price INTEGER NOT NULL,
--   quantity INTEGER NOT NULL
-- );


-- CREATE TABLE menu (
--   id SERIAL PRIMARY KEY NOT NULL,
--   item VARCHAR(255) NOT NULL,
--   type VARCHAR(255),
--   price INTEGER NOT NULL,
--   description TEXT,
--   thumbnail_url TEXT
-- );