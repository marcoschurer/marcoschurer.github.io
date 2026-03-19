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
    sections.forEach(function (s) {
      if (window.scrollY >= s.offsetTop - navHeight - 40) {
        current = s.id;
      }
    });
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  });

  /* --------------------------------------------------------
     CV ACCORDION — one open at a time per group
     -------------------------------------------------------- */
  document.querySelectorAll('.cv-item-header').forEach(function (header) {
    header.addEventListener('click', function () {
      var item = header.closest('.cv-item');
      var wasOpen = item.classList.contains('open');
      var group = item.closest('.cv-section-group');
      group.querySelectorAll('.cv-item.open').forEach(function (el) {
        el.classList.remove('open');
        el.querySelector('.cv-item-header').setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.classList.add('open');
        header.setAttribute('aria-expanded', 'true');
      }
    });

    header.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });

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
     SCROLL-TRIGGERED FADE-IN (IntersectionObserver)
     -------------------------------------------------------- */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var fadeTargets = document.querySelectorAll('.fade-in-section');

  if (prefersReducedMotion) {
    // Show everything immediately
    fadeTargets.forEach(function (el) {
      el.classList.add('is-visible');
    });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeTargets.forEach(function (el) {
      observer.observe(el);
    });
  }
})();
