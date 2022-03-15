require("dotenv").config();

const accountSid = process.env.API_SID;
const authToken = process.env.token;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: 'Your order is now ready!',
    from: '+18455813733',
    to: '+17785873982'
  })
  .then(message => console.log(message.status));