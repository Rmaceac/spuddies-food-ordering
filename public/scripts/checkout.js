
$(() => {

  const $submit = $('.check-out');

  $submit.on('click', (e) =>  {
    //SET TIMEOUT & ADD SPINNER
    setTimeout(checkout, 2000);
    $potato = $('<p class="spinner">🥔</p>');
    $prepareOrder = $('<p>Preparing your order...</p>');
    $('.check-out').text('');
    $('.check-out').append($prepareOrder, $potato);

    // REPLACE SUBMIT WITH ORDER CONFIRMATION
    /*eslint-disable*/
    function checkout() {
    $.ajax('checkout.html', { method: 'GET' })
    .then(function (checkout) {
      $submit.replaceWith(checkout); 
      
      // API CALL - TWILLIO
      $.ajax({
        url: "http://localhost:8084/api/submit",
        method: "GET"
      })
        .then((data) => {
          console.log("DATA:", data);
        })
        .catch((err) => {
          console.log("Error: ", err);
        });

        // REMOVE CURRENT ORDER BUTTONS & STOP SPINNER
        const $add = $('.add');
        const $minus = $('.minus');
        const $remove = $('.remove-btn');
        $add.hide();
        $minus.hide();
        $remove.hide();

        // ADD LOADING BAR
        $stageOne = $('<div class="progress"><div class="stageOne progress-bar bg-danger progress-bar-striped progress-bar-animated" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div></div>');
        $('.loading-bar').append($stageOne);
        setTimeout( () => {
          console.log("Stage Two");
          $stageTwo = $('<div class="progress"><div class="stageTwo progress-bar bg-info progress-bar-striped progress-bar-animated" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div></div>');
          $('.loading-bar').append($stageTwo);
          $stageOne.hide();
        }, 3000)
        setTimeout( () => {
          console.log("Stage Three");
          $stageThree = $('<div class="progress"><div class="stageThree progress-bar bg-warning progress-bar-striped progress-bar-animated" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div></div>');
          $('.loading-bar').append($stageThree);
          $stageOne.hide();
          $stageTwo.hide();
        }, 5000)
        setTimeout( () => {
          console.log("Stage Four");
          $stageFour = $('<div class="progress"><div class="stageFour progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div></div>');
          $('.loading-bar').append($stageFour);
          $stageOne.hide();
          $stageTwo.hide();
          $stageThree.hide();
        }, 7000);
      });
    }
  });
  
});