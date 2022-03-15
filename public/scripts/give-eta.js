$(() => {
  
  const $submit = $('#eta');
  const $estimate = $('#estimate');

  $submit.on('click', function(e) {
    e.preventDefault();
    
    // Text from estimate input field
    const estimate = {
      eta: $estimate.val()
    };
    
    $.ajax({
      url: "http://localhost:8084/api/submit/eta",
      method: "POST",
      data: estimate
    })
      .then((data) => {
        console.log("DATA:", data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });

  });

});