$(() => {
  
  const $submit = $('#eta');
  const $estimate = $('#estimate');

  $submit.on('click', function(e) {
    e.preventDefault();
    
    const estimate = {
      eta: $estimate.val()
    };
    // console.log($estimate.val());
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