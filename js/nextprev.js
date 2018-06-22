document.addEventListener("DOMContentLoaded", function() {
  var lastElementClicked;
  var PrevLink = document.querySelector('a.prev');
  var NextLink = document.querySelector('a.next');

  Barba.Pjax.init();
  Barba.Prefetch.init();

  Barba.Dispatcher.on('linkClicked', function(el) {
    lastElementClicked = el;
  });

  var MovePage = Barba.BaseTransition.extend({
    start: function() {
      this.originalThumb = lastElementClicked;

      Promise
        .all([this.newContainerLoading, this.scrollTop()])
        .then(this.movePages.bind(this));
    },

    scrollTop: function() {
      var deferred = Barba.Utils.deferred();
      var obj = { y: window.pageYOffset };

      TweenLite.to(obj, 0.4, {
        y: 0,
        onUpdate: function() {
          if (obj.y === 0) {
            deferred.resolve();
          }

          window.scroll(0, obj.y);
        },
        onComplete: function() {
          deferred.resolve();
        }
      });

      return deferred.promise;
    },

    movePages: function() {
      var _this = this;
      var goingForward = true;
      this.updateLinks();

      if (this.getNewPageFile() === this.oldContainer.dataset.prev) {
        goingForward = false;
      }

      TweenLite.set(this.newContainer, {
        visibility: 'visible',
        xPercent: goingForward ? 100 : -100,
        position: 'fixed',
        left: 0,
        top: 0,
        right: 0
      });

      TweenLite.to(this.oldContainer, 0.6, { xPercent: goingForward ? -100 : 100 });
      TweenLite.to(this.newContainer, 0.6, { xPercent: 0, onComplete: function() {
        TweenLite.set(_this.newContainer, { clearProps: 'all' });
        _this.done();
      }});
    },

    updateLinks: function() {
      PrevLink.href = this.newContainer.dataset.prev;
      NextLink.href = this.newContainer.dataset.next;
    },

    getNewPageFile: function() {
      return Barba.HistoryManager.currentStatus().url.split('/').pop();
    }
  });

  var Homepage = Barba.BaseView.extend({
    namespace: 'homepage',
    onEnter: function() {
      $.fn.multiscroll.destroy();
      $.fn.multiscroll.build();
    },
    onEnterCompleted: function() {
      if($('.landing').length) {
        $('.landing').multiscroll({
          verticalCentered: true,
          scrollingSpeed: 400,
          easing: 'easeInQuart',
          menu: false,
          navigation: false,
          loopBottom: false,
          loopTop: true,
          css3: true,
          paddingTop: 0,
          paddingBottom: 0,
          normalScrollElements: null,
          keyboardScrolling: true,
          touchSensitivity: 5
        });
      }

      // Rotate text.
      if($(".js-rotating").length) {
        $(".js-rotating").Morphext({
          animation: "bounceInDown", // Overrides default "bounceIn"
          speed: 2000, // Overrides default 2000
        });
      }
    },
    onLeave: function() {
        // A new Transition toward a new page has just started.
    },
    onLeaveCompleted: function() {
        // The Container has just been removed from the DOM.
    }
  });

  var denHolm = Barba.BaseView.extend({
    namespace: 'denholm',
    onEnter: function() {
      // Slider
      $('.js-slide').each(function() {
        $(this).not('.slick-initialized').slick({
          infinite: true,
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
    },
    onEnterCompleted: function() {
      $('.js-change-page').each(function() {
        var $this = $(this);
        $this.click(function (ev) {
          if (!$this.hasClass('is-active')) {
            $('.js-change-page').removeClass('is-active');
            $(this).addClass('is-active');
            var page  = $(ev.target).attr("data-page-name");
            var trans = $(ev.target).attr("data-page-trans");
            $(".screen").page().transition(page, trans);
          }
        });
      });
    }
  });

  var objectSpecific = Barba.BaseView.extend({
    namespace: 'object-specific',
    onEnter: function() {
      // Slider
      $('.js-slide').each(function() {
        $(this).not('.slick-initialized').slick({
          infinite: true,
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
    },
    onEnterCompleted: function() {
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
        });
      });
    }
  });

  // Don't forget to init the view!
  Homepage.init();
  denHolm.init();
  objectSpecific.init();
  Barba.Pjax.getTransition = function() {
    return MovePage;
  };
});
