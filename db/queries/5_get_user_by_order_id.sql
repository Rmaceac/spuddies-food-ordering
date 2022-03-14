SELECT name, email, phone, address, orders.id as order_id
FROM users
JOIN orders ON users.id = user_id
WHERE orders.id = 1;