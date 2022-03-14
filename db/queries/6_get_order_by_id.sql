SELECT orders.id as order_id, order_time, sub_total, total_price, menu_items_id, quantity
FROM orders
JOIN order_items ON order_id = orders.id
WHERE order_id = 1;