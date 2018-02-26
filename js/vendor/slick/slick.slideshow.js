(function ($) {
  $(function() {
    if ($('.slick.slick--slideshow').length > 0) {
      $('.slick.slick--slideshow').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: "<span class='slick-prev main'>&lt;</span>",
        nextArrow: "<span class='slick-next main'>&gt;</span>",
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
          {
            breakpoint: 767,
            settings: {
              arrows: false,
              dots: true,
              adaptiveHeight: true
            }
          }
        ]
      });
    }
  });
})(jQuery);
