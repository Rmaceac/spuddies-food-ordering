require("dotenv").config();

const accountSid = process.env.API_SID;
const authToken = process.env.token;
const client = require('twilio')(accountSid, authToken);

const orderReadyMsg = () => {
  client.messages
    .create({
      body: 'Your order is now ready!',
      from: '+18455813733',
      to: process.env.PHONE
    })
    .then(message => console.log(message.status));
};

const orderEstimate = (estimate) => {
  client.messages
    .create({
      body: `Your order will be ready in ${estimate}.`,
      from: '+18455813733',
      to: process.env.PHONE
    })
    .then(message => console.log(message.status));
};

const orderSubmitted = (orderID) => {
  client.messages
    .create({
      body: `Someone has submitted an order! Order ID: ${orderID}`,
      from: '+18455813733',
      to: process.env.PHONE
    })
    .then(message => console.log(message.status));
};

module.exports = {orderReadyMsg, orderEstimate, orderSubmitted};