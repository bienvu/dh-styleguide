/*jslint browser: true*/
/*global $, jQuery, Modernizr, enquire*/
(function (window, document, $) {
  var $html = $('html'),
    mobileOnly = "screen and (max-width:47.9375em)", // 767px.
    mobileLandscape = "(min-width:30em)", // 480px.
    tablet = "(min-width:48em)"; // 768px.
  // Add  functionality here.

  $(document).ready(function() {
    // if($('.landing').length) {
      $('as').multiscroll({
        verticalCentered: true,
        scrollingSpeed: 400,
        easing: 'easeInQuart',
        menu: false,
        navigation: false,
        loopBottom: true,
        loopTop: true,
        css3: true,
        paddingTop: 0,
        paddingBottom: 0,
        normalScrollElements: null,
        keyboardScrolling: true,
        touchSensitivity: 5
      });
    // }

     //Rote title
     var strings = [],
         $rotate_item = $(".js-text-slider"),
         $rotate_item_span = $(".js-text-slider span");
     if($rotate_item.length) {
       $rotate_item.parent().addClass('with-slide');
       $rotate_item_span.each(function() {
           strings.push($(this).text());
       });

       function rotateHeadings() {
         var ct = $rotate_item.data("string") || 0;
         $rotate_item.data("string",
           ct == strings.length -1 ? 0 : ct + 1)
           .text(strings[ct])
           .fadeIn().delay(1500).fadeOut(100, rotateHeadings);
       }

       rotateHeadings();
     }

    // Page transition
    $('.js-change-page').each(function() {
      var $this = $(this);
      $this.click(function (ev) {

        if (!$this.hasClass('is-active')) {
          $('.js-change-page').removeClass('is-active');
          $(this).addClass('is-active');
          var page  = $(ev.target).attr("data-page-name");
          var trans = $(ev.target).attr("data-page-trans");
          if ($(".screen").page().fetch(page) === null)
              $(".screen").page().shake();
          else
              $(".screen").page().transition(page, trans);
        }
        return false;
      });
    });

    // Slider
    $('.js-slide').each(function() {
      $(this).not('.slick-initialized').slick({
        infinite: false,
        autoplay: true,
      });
    });

    // Slider Circle
    $('.js-slide-circle').each(function() {
      $(this).not('.slick-initialized').slick({
        infinite: true,
        autoplay: true,
      });
    });
  });

}(this, this.document, this.jQuery));
