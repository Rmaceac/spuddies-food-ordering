SELECT orders.id as order_id, users.id as user_id, order_time, sub_total, total_price, menu_items_id, quantity
FROM orders
JOIN order_items ON order_id = orders.id
JOIN users ON users.id = user_id
WHERE user_id = 2
GROUP BY orders.id, users.id;