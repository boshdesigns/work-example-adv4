(function ($) {
  $(function() {
    if ($('.slick.slick--gallery').length > 0) {
      $('.slick.slick--gallery').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplaySpeed: 3000,
        responsive: [
          {
            breakpoint: 1921,
            settings: "unslick"
          },
          {
            breakpoint: 767,
            settings: {
              autoplay: true,
            }
          }
        ]
      });
    }
  });
})(jQuery);
