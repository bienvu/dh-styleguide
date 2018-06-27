(function( $ ){
  //  Scroll page function.
  $.fn.scrollPagge = function() {
     var $widthWd = $( window ).width();
     if($widthWd > 768) {
       if($('.landing').length) {
         $('.landing').multiscroll({
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
       }

       $('.js-cloned').remove();
     } else {
       // $.fn.multiscroll.destroy();
       $('.landing__right .ms-section').eq(0).clone().insertAfter($(".landing__left .ms-section").eq(0)).addClass("js-cloned");
       $('.landing__right .ms-section').eq(1).clone().insertAfter($(".landing__left .ms-section").eq(2)).addClass("js-cloned");
       $('.landing__right .ms-section').eq(2).clone().insertAfter($(".landing__left .ms-section").eq(4)).addClass("js-cloned");
     }
   }

   // Page transition
   $.fn.pagesTransition = function() {
     $('.js-change-page').each(function() {
       var $this = $(this);
       $this.click(function (ev) {
         $("body").removeClass('is-home');

         if (!$this.hasClass('is-active')) {
           $('.js-change-page').removeClass('bg-active is-active');
           $(this).addClass('bg-active is-active');
           var page  = $(ev.target).attr("data-page-name");
           var trans = $(ev.target).attr("data-page-trans");
           $(".screen").page().transition(page, trans);
         }

         $("body, .page-transition__menu-mobile, .js-toggle-menu, .page-transition__menu").removeClass('is-show');

         return false;
       });
     });
   }

   // Page transition
   $.fn.showHideFunction = function() {
     // Show hidden function.
     var showHiddenFunction = function (btn, flag, clickOutside, hasGrandParent, dropDown, childSelector) {
       var $btn = btn,
           $parent = $btn.parent(),
           $grandParent = $parent.parents('body'),
           $childSelector = childSelector,
       dropDown = dropDown === true ? true : false;
       clickOutside = clickOutside === false ? false : true;
       hasGrandParent = hasGrandParent === true ? true : false;
       $btn.on('click', function (e) {
         e.preventDefault();
         if (!$parent.hasClass(flag)) {
           $parent.addClass(flag);

           if (dropDown === true) {
             // $childSelector.slideDown("slow");
             $childSelector.addClass(flag);
           }

           if (hasGrandParent === true) {
             $grandParent.addClass(flag);
             $btn.addClass(flag);
           }
         }
         else {
           $parent.removeClass(flag);
           if (dropDown === true) {
             // $childSelector.slideUp("slow");
             $childSelector.removeClass(flag);
           }

           if (hasGrandParent === true) {
             $grandParent.removeClass(flag);
             $btn.removeClass(flag);
           }
         }
       });
       if (clickOutside === true) {
         $(document).on('touchstart click', function (e) {
           if ($parent.has(e.target).length === 0 && $parent.hasClass(flag)) {
             $parent.removeClass(flag);

             if (hasGrandParent === true) {
               $grandParent.removeClass(flag);
               $btn.removeClass(flag);
             }

             if (dropDown === true) {
               // $childSelector.slideUp("slow");
               $childSelector.removeClass(flag);
             }
           }
         });
       }
     };

     var $menuResponsive = $('.js-toggle-menu'),
         showMainMenuFlag = 'is-show',
         $parent = $menuResponsive.closest('.page-transition__wrap'),
         $childMenu = $parent.find('.page-transition__menu');
     showHiddenFunction($menuResponsive, showMainMenuFlag, false, true, true, $childMenu);
   }

   // Rotate text.
   $.fn.rotateText = function() {
     if($(".js-rotating").length) {
       $(".js-rotating").Morphext({
         animation: "bounceInDown", // Overrides default "bounceIn"
         speed: 2000, // Overrides default 2000
       });
     }
   }

   // Slider
   $.fn.sliderFunction = function() {
     $('.js-slide').each(function() {
       $(this).not('.slick-initialized').slick({
         infinite: true,
         autoplay: false,
       });
     });
   }
})( jQuery );
