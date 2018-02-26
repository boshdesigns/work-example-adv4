// To activate this file uncomment scripts[] = js/fmgautoadvancedfour.min.js from the .info file.

(function ($) {

  "use strict";

  // Add site specific js here.
  $(window).load(function() {

    // ******
    //  Debouncer function
    // ******
    function debouncer( func , timeout ) {
       var timeoutID;
       timeout = timeout || 200;
       return function () {
          var scope = this , args = arguments;
          clearTimeout( timeoutID );
          timeoutID = setTimeout( function () {
              func.apply( scope , Array.prototype.slice.call( args ) );
          } , timeout );
       };
    }


    // ******
    //  Add smooth scrolling to anchor tags
    // ******
    // Select all links with hashes
    $('a[href*="#"]')
      // Remove links that don't actually link to anything
      .not('[href="#"]')
      .not('[href="#0"]')
      // exclude certian #links that we don't want to smooth scroll
      .not('[href="#tab-video"]')
      .not('[href="#tab-video2"]')
      .not('[href="#tab-video3"]')
      .not('[href="#tab-video4"]')
      .not('[href="#tab-images"]')
      .not('[href="#tab-features"]')
      .not('[href="#tab-techspec"]')
      .not('[href="#tab-finance"]')
      .not('[href="#tab-contact"]')
      .click(function(event) {
        // On-page links
        if ( location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname ) {
          // Figure out element to scroll to
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          // Does a scroll target exist?
          if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate({
              scrollTop: target.offset().top - 150
            }, 700 );
          }
        }
      });


    // ******
    //  Match height of promo blocks
    // ******
    function matchHeight() {

      // Match Height for Promo Blocks
      var container = $('.bean-promotional-block');

      // We need to reset the promo blocks height to work cross browser
      $('.bean-promotional-block').removeAttr('style');

      // set a base value
      var setHeight = -1;
      // Work out the element with the greatest height
      container.each(function() {
         setHeight = setHeight > $(this).height() ? setHeight : $(this).height();
      });
      // Set the height
      container.each(function() {
         $(this).css('min-height',setHeight);
      });

      // Match Height for Featured Vehicles
      if ($('.l-node-used-vehicle--featured-vehicles').length) {
        var featuredContainer = $('.l-node-used-vehicle--featured-vehicles__main-content');

        // We need to reset the promo blocks height to work cross browser
        $('.l-node-used-vehicle--featured-vehicles__main-content').removeAttr('style');

        // set a base value
        var featuredSetHeight = -1;
        // Work out the element with the greatest height
        featuredContainer.each(function() {
           featuredSetHeight = featuredSetHeight > $(this).outerHeight() ? featuredSetHeight : $(this).outerHeight();
        });
        // Set the height
        featuredContainer.each(function() {
           $(this).css('min-height',featuredSetHeight);
        });

      }
    }


    // ******
    //  Function to hide logo when menu is expanded on mobile/tablet
    // ******
    function menuHideLogo() {
      // Much sure the top bar is there
      if ($('.top-bar').length) {

        // If the menu icon is clicked
        $('.menu-icon a').click(function() {

          // Theres a small delay in the class we need to use being added so we set a time out
          setTimeout(function() {
            // if the top bar has the expanded class
            if ($('.top-bar').hasClass('expanded')) {
              // hide the logo and set nav to relative to pass content down
              $('.l-header__logo').css({'height' : '0','opacity' : '0'});
              $('.l-header__navigation').css('position','relative');
            } else {
              // else undo changes
              $('.l-header__navigation').css('position','absolute');
              $('.l-header__logo').css({'height' : 'auto','opacity' : '1'});
            }
          }, 0.1);

        });
      }
    }


    // ******
    //  Toggle visibility of the search block
    // ******
    // If the search opener button exists
    if ($(".search-opener").length) {

      // Mobile and tablet search button.
      $(".search-opener").click(function() {

        // Set up function to toggle search to call later
        function toggleSearch(searchBlock, searchOpener) {

          // Toggle class names if search opener is clicked
          searchBlock.toggleClass("open");
          searchOpener.toggleClass("open");

          // Change the wording + overflow on body based on the class name
          if (searchOpener.hasClass('open')) {
            searchOpener.html('<i class="fa fa-times" aria-hidden="true"></i> Close Search');
            $('body').css('overflow', 'hidden');
            if ($(".page").length &&
                searchBlock.selector === '.block-fmg-search-blocks--without-sidebar' &&
                $(window).width() >= 1024) {
                  $(".page").addClass('page--overlay');
            }
          } else {
            searchOpener.html('<i class="fa fa-search" aria-hidden="true"></i> Search Our Used Stock');
            $('body').css('overflow', 'visible');
            if ($(".page").length &&
                searchBlock.selector === '.block-fmg-search-blocks--without-sidebar') {
                  $(".page").removeClass('page--overlay');
            }
          }
        }

        // Check what class is on the search opener dev
        if ($(this).hasClass("search-opener--without-sidebar")) {

          // Set up vars
          var searchBlockNoSiderbar = $(".block-fmg-search-blocks--without-sidebar");
          var searchOpenerNoSiderbar = $(".search-opener--without-sidebar");

          // Trigger toggleSearch function
          toggleSearch(searchBlockNoSiderbar, searchOpenerNoSiderbar);

        } else {

          // Set up vars
          var searchBlock = $(".block-fmg-search-blocks");
          var searchOpener = $(".search-opener");

          // Trigger toggleSearch function
          toggleSearch(searchBlock, searchOpener);
        }

      });
    }


    // ******
    //  Fire off certain functionality/change some parts based on window resize
    // ******
    // Safari browser resize fix
    // Store the window width
    var windowWidth = $(window).width();

    // Fire resize debouncer
    $( window ).resize( debouncer( function ( e ) {

      // Check the windows width has actually change for safari
      if ($(window).width() !== windowWidth) {

        // Update the window width for next time
        windowWidth = $(window).width();

        // On resize fire of matchHeight function
        matchHeight();

        // If the width is greater than 1024px
        if ($(window).width() >= 1024) {
          // Remove style attr/classnames from these elements
          $('.l-header__logo, .l-header__navigation, body').removeAttr('style');
        } else {
          // Else fire off these functions
          menuHideLogo();
        }
      }
    }));

    // ******
    //  Fire off certain functionality/change some parts on doc is ready
    // ******
    $( document ).ready(function() {
      // When doc is ready fire these functions
      menuHideLogo();

      // We need to set a time out to allow for elements to fully load on safari
      setTimeout(function() {
        matchHeight();
      }, 250);
    });



    // ******
    //  We are programmatically rendering the search block outside the sidebar if sidebar is hidden
    //  This results in multiple search blocks on one page, which means select ID classnames have --2 suffix
    //  We add this JS so the min and max select lists work correctly
    // ******
    function fmgSolrPriceToggle() {

        var ivendi_min = $('#facet_ftm_fmg_quoteware_api_payment .min-range').val();
        var ivendi_max = $('#facet_ftm_fmg_quoteware_api_payment .max-range').val();


        var price_min = $('#facet_ftm_field_vehicle_price .min-range').val();
        var price_max = $('#facet_ftm_field_vehicle_price .max-range').val();

        if (ivendi_min !== '*' || ivendi_max !== '*') {
            $('#facet_ftm_field_vehicle_price').hide();
            $('#facet_ftm_fmg_quoteware_api_payment').show();
            $('#edit-price-range-select-ivendi').click();
        }
        else if (price_min !== '*' || price_max !== '*') {
            $('#facet_ftm_fmg_quoteware_api_payment').hide();
            $('#facet_ftm_field_vehicle_price').show();
            $('#edit-price-range-select-total').click();
        }
        else {
            $('#facet_ftm_field_vehicle_price').hide();
            $('#facet_ftm_fmg_quoteware_api_payment').show();
        }

        if (ivendi_max === undefined) {
            $('#facet_ftm_field_vehicle_price').show();
        }

        $('#edit-price-range-select-ivendi--2, #edit-price-range-select-total--2').change(function() {

            var checked = $(this).val();
            if (checked === 'ivendi') {
                $('#facet_ftm_field_vehicle_price').hide();
                $('#facet_ftm_fmg_quoteware_api_payment').show();
            }
            else {
                $('#facet_ftm_field_vehicle_price').show();
                $('#facet_ftm_fmg_quoteware_api_payment').hide();
            }
        });
    }
    if ($('#price_toggle') !== undefined) {
        fmgSolrPriceToggle();
    }

  });
})(jQuery);
