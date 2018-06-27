/*jslint browser: true*/
/*global $, jQuery, Modernizr, enquire*/
(function (window, document, $) {
  var $html = $('html'),
    mobileOnly = "screen and (max-width:47.9375em)", // 767px.
    mobileLandscape = "(min-width:30em)", // 480px.
    tablet = "(min-width:48em)"; // 768px.

  $(document).ready(function() {
    $('window').showHideFunction();
    $('window').scrollPagge();
    $('window').pagesTransition();
    $('window').rotateText();
    $('window').sliderFunction();

    $('.js-logo').click(function() {
      $("body").addClass('is-home');
    });
  });

}(this, this.document, this.jQuery));
