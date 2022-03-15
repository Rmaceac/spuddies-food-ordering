<<<<<<< HEAD
// const { orderReadyMsg } = require("./sms");

// require("dotenv").config();
// require("sms");
=======
const { orderReadyMsg } = require("./sms");

require("dotenv").config();
require("sms");
>>>>>>> 6101465ba0e30e70cf42dfd06050d1540ec4df64

$(() => {


<<<<<<< HEAD

  const $submit = $('.check-out');
  
=======
  const $submit = $('.check-out');
  const $add = $('.add');
  const $minus = $('.minus');
  const $remove = $('.remove-btn');
>>>>>>> 6101465ba0e30e70cf42dfd06050d1540ec4df64

  $submit.on('click', (e) =>  {
    console.log(e);
    //SET TIMEOUT & ADD SPINNER
    setTimeout(checkout, 2000);
    $potato = $('<p class="spinner">🥔</p>')
    $prepareOrder = $('<p>Preparing your order...</p>')
    $('.check-out').text('');
    $('.check-out').append($prepareOrder, $potato);

    // REPLACE SUBMIT WITH ORDER CONFIRMATION
<<<<<<< HEAD
    /*eslint-disable*/
    function checkout() {
=======
    const checkout = function() {
>>>>>>> 6101465ba0e30e70cf42dfd06050d1540ec4df64
      $.ajax('checkout.html', { method: 'GET' })
        .then(function (checkout) {
          $submit.replaceWith(checkout);

          // REMOVE CURRENT ORDER BUTTONS & STOP SPINNER
          $add.hide();
          $minus.hide();
<<<<<<< HEAD
          $remove.hide();          
          const $add = $('.add');
          const $minus = $('.minus');
          const $remove = $('.remove-btn');

          // ADD LOADING BAR
          /*eslint-enable*/
=======
          $remove.hide();
          $potato.hide();

          // ADD LOADING BAR
>>>>>>> 6101465ba0e30e70cf42dfd06050d1540ec4df64
          $loadingBar = $('<i class="fa-solid fa-bars-progress progress-bar"></i>');
          $('.loading-bar').append($loadingBar);
          // //SET TIMEOUT ON PROGRESS BAR
          // $cooking = $('')
          // setTimeout(cooking, 10000);
          // function cooking() {
          //   $loadingBar.replaceWith($packaging)
          // }
          // setTimeout(packaging, 15000);
          // function packaging() {
          //   $packaging.replaceWith($pickup)
          // }
          // setTimeout(pickup, 20000);
          //   $pickup.replaceWith($complete)

        });
    };

    orderReadyMsg();
  });


});