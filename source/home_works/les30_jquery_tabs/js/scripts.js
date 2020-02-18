"use strict";

(function () {
  'use strict';

  hideAllTabs();
  document.getElementById('info').hidden = false;
  setHeightOfCurentTab();
  document.body.querySelector('.tabs__tabs').addEventListener('transitionend', setRate);
  window.addEventListener('resize', resize);
  tabsInOut(); // functions

  function hideAllTabs() {
    var tabs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body.querySelectorAll('.tabs__tab');
    tabs.forEach(function (tab) {
      return tab.hidden = true;
    });
  }

  function setHeightOfCurentTab(tab) {
    var box = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body.querySelector('.tabs__tabs');

    if (tab == undefined) {
      var tabs = document.body.querySelectorAll('.tabs__tab');
      tabs.forEach(function (t) {
        if (!t.hidden) tab = t;
      });
    }

    box.style.height = "".concat(tab.offsetHeight, "px");
  }

  function tabsInOut() {
    var tabBtns = document.body.querySelectorAll('.tabs__btn'),
        box = document.body.querySelector('.tabs__tabs');
    tabBtns.forEach(function (tab) {
      return tab.addEventListener('click', function (e) {
        return changeTab(e);
      });
    });

    function changeTab(event) {
      event.preventDefault();
      var clickBtn = event.target.closest('.tabs__btn'),
          clickTab = document.getElementById("".concat(clickBtn.dataset.name));

      if (clickTab.hidden == true) {
        var switchTabs = function switchTabs() {
          if (box.offsetHeight == 0) {
            hideAllTabs();
            clickTab.hidden = false;
            box.removeEventListener('transitionend', switchTabs);
            setHeightOfCurentTab(clickTab, box);
          }
        };

        tabBtns.forEach(function (tab) {
          return tab.dataset.state = 'disabled';
        });
        clickBtn.dataset.state = 'active';
        box.style.height = "0px";
        box.addEventListener('transitionend', switchTabs);
      }
    }
  }

  function setRate() {
    document.body.querySelector('.tabs__tabs').removeEventListener('transitionend', setRate);

    if (document.getElementById('info').hidden == false) {
      var circle = document.querySelector('.rate__current > circle'),
          circleLength = document.querySelector('.rate__maximal').offsetHeight * 3.14,
          rate = +document.querySelector('.rate__amount').textContent,
          offset = (10 - rate) / 10 * circleLength;
      circle.style.strokeDashoffset = offset;
    } else {
      var _circle = document.querySelector('.rate__current > circle'),
          _circleLength = document.querySelector('.rate__maximal').offsetHeight * 3.14;

      _circle.style.strokeDashoffset = _circleLength;
    }
  }

  function resize() {
    setHeightOfCurentTab();
    if (document.getElementById('info').hidden == false) setRate();
  }
})();