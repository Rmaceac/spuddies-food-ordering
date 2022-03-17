# Midterm Project Demo Plan

## Overview

Person 1: Explain why we chose this project.
Person 2: Some of our challenges were... (git branchs/merge conflcits, figuring out how to get started, making multiple queries to the DB, carousel, not able to use require on the front-end etc.). Do this popcorn style where each of us has a chance to share something.
Person 3 (Restaurant owner): Introduce the web page. Set the scene. "This is the Spuddies restaurant menu. We're going to have a pair of customers come in and place an order for pickup. We used Twilio API to allow us to send SMS notifications to both the restaurant and the clients regarding when their order will be ready".

### Stage 1: Client Order

*2 clients enter the website and try to decide what to eat*

1. Hover over different burgers, read description and price, move through carousel. Customer1 is REALLY hungry and decides to order two different burgers, Customer2 just gets one.

2. Switch to sides and drinks, repeat the process. Both customers decide to get the *same side*, so add 2 of the same side by pressing the PLUS(+) button. They get different drinks.

3. The hungry Customer1 decides that the total for the order is a bit high. "I'll just eat something when I get home to save some money". They hit the REMOVE button on their extra burger and the MINUS(-) button on their side order.

4. They're now happy with their order so they hit submit. Enjoy the loading show 🎉.

### Stage 2: Restaurant Order Handling

1. Restaurant owner recieves and shows text message that someone has submitted an order. 

2. They FETCH ORDER on the order page (either by specific ID, or they just fetch the latest order).

3. They review the order and decide that will probably take them 'xx seconds' to prepare for the customer. They enter that ETA into the send ETA field and send.

### Stage 3: Customers Receive ETA

1. Customers show text message with ETA.

2. Peruse other features on menu page while they wait for their order to be ready:
- Hightlight Socials icons.
- Examine descriptions of other food items (Monstrosity, "Just Potatoes", water etc.)

3. After 'xx seconds' the order ready text appears. Show it to the class.

4. Bow. Accept praise from lessers.

## Leads
Ryan - Database and API
Travis - Front-End design and functionality
Dylan - Backend
Lots of pair + trio programming. Lots learned!

## Challenges

