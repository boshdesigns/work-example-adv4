(function ($) {
  $(function() {
    if ($('.slick.slick--featured-vehicles').length > 0) {
      $('.slick.slick--featured-vehicles').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: "<span class='slick-prev main button'>&lt;</span>",
        nextArrow: "<span class='slick-next main button'>&gt;</span>",
        autoplay: true,
        autoplaySpeed: 3000,
        mobileFirst: true,
        responsive: [
          {
            breakpoint: 769,
            settings: {
              slidesToShow: 3
            }
          }
        ]
      });
    }
  });
})(jQuery);
