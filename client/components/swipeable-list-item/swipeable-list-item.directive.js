'use strict';

angular.module('tweetboxApp')
  .directive('swipeableListItem', function ($swipe, $document) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var startCoords;
        var dir;
        var endCoords;
        var lastCoords;

        // how far horizontally do I need to move before we do anything
        var tolerance = 10;

        // just keeping trying of if we met the tolerance
        var toleranceMet = false;

        // if we slide this far in a particular direction,
        // we ignore the old direction
        var slideTolerance = 100;

        // we toggle transitionClass cuz we don't want to
        // transition while we're actually dragging
        var transitionClass = 'swipeable-list-item-transition';
        var isSlidingClass = 'swipeable-list-item-is-sliding';
        var openClassRight = 'swipeable-list-item-open-right';
        var openClassLeft = 'swipeable-list-item-open-left';

        // http://davidwalsh.name/vendor-prefix
        var prefix = (function () {
          var styles = window.getComputedStyle(document.documentElement, ''),
            pre = (Array.prototype.slice
              .call(styles)
              .join('')
              .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
            )[1];
          return '-' + pre + '-';
        })();

        $swipe.bind(element, {
          start: function (coords, event) {
            toleranceMet = false;
            startCoords = angular.copy(lastCoords = coords);
          },
          end: function (coords, event) {
            endCoords = coords;

            // translate3d、isSlidingClassを削除し、静的な状態に戻す
            element.removeClass(isSlidingClass);
            element.find('.md-item-content--action').removeAttr('style').addClass(transitionClass)

            // slideTolerance より小さかった場合は元の位置に戻す
            if (!toleranceMet || Math.abs(startCoords.x - coords.x) < slideTolerance) return;

            // 現在のcoordsとstartCoordsの差がslideToleranceより大きく、
            // その差が+ならdirを右に、-なら左に上書き
            if (coords.x - startCoords.x > slideTolerance) dir = 'right';
            if (coords.x - startCoords.x < (-1 * slideTolerance)) dir = 'left';

            if (dir == 'right') {
              // 右へスワイプ
              element.find('.md-item-content--done').removeClass(openClassLeft);
              element.find('.md-item-content--clip').removeClass(openClassLeft).addClass(openClassRight);
            } else {
              // 左へスワイプ
              element.find('.md-item-content--clip').removeClass(openClassRight);
              element.find('.md-item-content--done').removeClass(openClassRight).addClass(openClassLeft);
            }
          },
          move: function (coords, event) {
            // set a tolerance before we kick in sliding
            if (!toleranceMet && Math.abs(startCoords.x - coords.x) < tolerance) return;

            element.addClass(isSlidingClass);
            element.find('.md-item-content--action').removeClass(transitionClass)
            dir = lastCoords.x < coords.x ? 'right' : 'left';
            var x = coords.x - startCoords.x;

            // GPU acceleration
            var props = {};
            props[prefix + 'transform'] = 'translate3d(' + x + 'px, 0, 0)';
            element.find('.md-item-content--action').css(props);

            lastCoords = coords;
            toleranceMet = true;
          },
          cancel: function (coords, event) {
            // translate3d、isSlidingClassを削除し、静的な状態に戻す
            element.removeClass(isSlidingClass);
            element.find('.md-item-content--action').removeAttr('style').addClass(transitionClass)
          }
        });
      }
    };
  });
