# Food Delivery App (Feed Fone? 🤣)

## App Overview
A food ordering experience for a **single restaurant**. Hungry clients of this fictitious restaurant can visit its website, **select one or more dishes and place an order for pick-up**. They will **receive a notification** when their order is ready.

The **restaurant and client both need to be notified** since this app serves as an intermediary.

When an order is placed **the restaurant receives the order via SMS**. The restaurant can then **specify how long it will take to fulfill it**. Once they provide this information, the **website updates for the client and also notifies them via SMS**.

You can use a modern telecomm API service such as **Twilio** to implement SMS communication from the website to the client and restaurant.

For inspiration check out how Ritual works, but keep in mind that's implemented as a native app and serves more than one restaurant.

## User stories
1. As a user, I can browse a menu because I want to choose 
item(s) for order.
2. As a user, I can select one or more dishes to add to my cart and ultimately order for pickup because I want to order multiple items.
3. As a user I can change/edit my order because I might want to change my mind.
4. As a user I can see the total cost of my order because I need to know if I can afford it.
5. As a user I can get an estimated time that my order will be ready because I want to plan on when to pick it up. 
6. As a user I can get a notification on my phone when my order is ready because I want to know when I need to pick it up.
7. As a user I can see on the app that my order has gone through successfully because I want to know that I won't be double-charged or have to re-order my food.
8. As a restaurant I can recieve/accept new orders via SMS because I want to know what food to prepare and how to provide a timing estimate.
9. As a restaurant I can send an estimate to the client for when there order will be ready because I want them to pick it up when it's fresh.

## ERD Outline
### Tables:
- **users**
  - id
  - name
  - email
  - phone

- **menu_items**
  - id
  - name
  - price

- **orders**
  - id
  - user_id
  - menu_item_id
  - time_ordered?
  - 

- **bridging_table?**
  - required for connecting orders to menu_items?

## MSCW
**Must Have:**
1. Menu for user to browse
2. Auto-updating cart for each item + price added to order
3. Checkout page/popup with order items and total price.
4. SMS notifications for restaurant AND user.
5. Confirmation payment has gone through.
6. Estimate for when order will be ready.
7. User ability to edit/delete order items.

**Should Have:**
1. Progress bar for when order will be ready.
2. Calulate taxes after into order total.
3. User can enter name, email, phone and address.

**Could Have:**
1. User customization (delivery instructions etc.)
2. Choose sizes
3. 

**Would Have:**
1. 

## Routes
- **Browse**
  - GET /menu
- **Read**
  - GET /menu/:id
  - stretch item. otherwise
- **Edit**
  - PUT/PATCH /checkout ?
  - For editing checkout cart?
- **Add**
  - POST /menu/:id
- **Delete**
  - POST /checkout/:id/delete ?
  - removing items from cart?

  ## Notes
  - Current plan is to implement a 2-page app. One page for the menu, which includes an auto-updating cart with items for the order and a total price and a second checkout page where the user enters their information and submits their order.


 

