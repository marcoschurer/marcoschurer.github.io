/* ============================================================
   main.js — Marco Schürer Drews portfolio
   ============================================================ */

(function () {
  'use strict';

  /* --------------------------------------------------------
     STICKY NAV SHADOW
     -------------------------------------------------------- */
  var nav = document.getElementById('nav');
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  /* --------------------------------------------------------
     ACTIVE NAV LINK ON SCROLL
     -------------------------------------------------------- */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', function () {
    var current = '';
    var navHeight = nav.offsetHeight;
    var atBottom = (window.innerHeight + window.scrollY) >= document.body.scrollHeight - 2;
    sections.forEach(function (s) {
      if (s.offsetParent === null) return; // skip hidden sections
      if (window.scrollY >= s.offsetTop - navHeight - 40) {
        current = s.id;
      }
    });
    // If scrolled to the very bottom, activate the last visible section
    if (atBottom) {
      var visible = Array.from(sections).filter(function (s) { return s.offsetParent !== null; });
      if (visible.length) current = visible[visible.length - 1].id;
    }
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  });

  /* --------------------------------------------------------
     CV ACCORDION — each item toggles independently
     -------------------------------------------------------- */
  window.toggleCV = function (header) {
    var item = header.parentElement;
    item.classList.toggle('open');
  };

  /* --------------------------------------------------------
     MOBILE NAV TOGGLE
     -------------------------------------------------------- */
  var navToggle = document.querySelector('.nav-toggle');
  var navLinksEl = document.querySelector('.nav-links');

  navToggle.addEventListener('click', function () {
    var isOpen = navToggle.classList.toggle('open');
    navLinksEl.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile nav when a link is clicked
  navLinksEl.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('open');
      navLinksEl.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* --------------------------------------------------------
     SMOOTH SCROLL WITH NAV OFFSET
     -------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      var navHeight = nav.offsetHeight;
      var targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({
        top: targetPos,
        behavior: 'smooth'
      });
    });
  });

  /* --------------------------------------------------------
     SCROLL-TRIGGERED FADE-UP (IntersectionObserver)
     -------------------------------------------------------- */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var fadeTargets = document.querySelectorAll('.fade-up');

  if (prefersReducedMotion) {
    fadeTargets.forEach(function (el) {
      el.classList.add('visible');
    });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15
    });

    fadeTargets.forEach(function (el) {
      observer.observe(el);
    });
  }
})();
