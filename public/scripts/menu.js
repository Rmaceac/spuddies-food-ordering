$(document).ready(function() {

  $('.carousel').slick({
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
    prevArrow:'<button type="button" data-role="none" class="slick-prev">Previous</button>',
    nextArrow:'<button type="button" data-role="none" class="slick-next">Next</button>'
  });

});