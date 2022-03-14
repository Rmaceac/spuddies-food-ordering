-- NEEDS WORK! THIS QUERY CREATES REDUNDANT DATA

SELECT name as customer_name, email, phone, address, orders.id, order_time, sub_total, total_price, item, quantity
FROM orders
JOIN users ON users.id = user_id
JOIN order_items ON order_id = orders.id
JOIN menu_items ON menu_items_id = menu_items.id
WHERE orders.id = 1;