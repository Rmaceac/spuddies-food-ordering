SELECT orders.id as order_id, menu_items.item as item, order_time, sub_total, total_price, menu_items_id, quantity
FROM orders
JOIN order_items ON order_id = orders.id
JOIN menu_items ON menu_items.id = menu_items_id
WHERE order_id = 1;