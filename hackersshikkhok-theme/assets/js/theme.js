/**
 * HackersShikkhok Theme Core UI Engine (v4.1.0)
 * Brand: HackersShikkhok (https://hackersshikkhok.com)
 * Mobile Navigation Drawer, Bottom 5-Tab Bar, Scroll-to-Top, Interactive Components
 */
(function () {
  'use strict';

  function initMobileDrawer() {
    const toggleBtn = document.getElementById('hs-mobile-menu-btn');
    const drawer = document.getElementById('hs-mobile-drawer');
    const overlay = document.getElementById('hs-drawer-overlay');
    const closeBtn = document.getElementById('hs-drawer-close-btn');

    if (!toggleBtn || !drawer || !overlay) {
      return;
    }

    function openDrawer() {
      drawer.classList.add('hs-drawer-open');
      overlay.classList.add('hs-overlay-active');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      drawer.classList.remove('hs-drawer-open');
      overlay.classList.remove('hs-overlay-active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    toggleBtn.addEventListener('click', function (e) {
      e.preventDefault();
      if (drawer.classList.contains('hs-drawer-open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        closeDrawer();
      });
    }

    overlay.addEventListener('click', function (e) {
      e.preventDefault();
      closeDrawer();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('hs-drawer-open')) {
        closeDrawer();
      }
    });
  }

  function initScrollTop() {
    const scrollBtn = document.querySelector('[data-hs-scroll-top]');
    if (scrollBtn) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
          scrollBtn.style.opacity = '1';
          scrollBtn.style.pointerEvents = 'auto';
        } else {
          scrollBtn.style.opacity = '0';
          scrollBtn.style.pointerEvents = 'none';
        }
      });

      scrollBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  function initBottomTabBar() {
    const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
    const tabItems = document.querySelectorAll('.hs-bottom-5tab-bar .hs-tab-item');
    tabItems.forEach(function (tab) {
      const href = tab.getAttribute('href');
      if (href) {
        try {
          const tabPath = new URL(href, window.location.origin).pathname.replace(/\/$/, '') || '/';
          if (tabPath === currentPath) {
            tab.classList.add('hs-tab-active');
          }
        } catch (e) {}
      }
    });
  }

  function initToolsFilter() {
    const searchInput = document.getElementById('hs-tool-live-search');
    const toolCards = document.querySelectorAll('.hs-tools-grid .hs-tool-box');
    const countBadge = document.getElementById('hs-tool-search-count');
    const filterChips = document.querySelectorAll('.hs-filter-chip');
    const centerChips = document.querySelectorAll('.hs-center-chip');

    if (!searchInput && toolCards.length === 0) {
      return;
    }

    let activeCategory = 'all';
    let activeCenter = 'all';
    let searchQuery = '';

    function filterTools() {
      let visibleCount = 0;
      toolCards.forEach(function (card) {
        const name = (card.getAttribute('data-tool-name') || '').toLowerCase();
        const desc = (card.getAttribute('data-tool-desc') || '').toLowerCase();
        const cat = card.getAttribute('data-tool-cat') || '';
        const center = card.getAttribute('data-tool-center') || '';

        const matchesSearch = !searchQuery || name.includes(searchQuery) || desc.includes(searchQuery);
        const matchesCategory = activeCategory === 'all' || cat.toLowerCase().includes(activeCategory.toLowerCase());
        const matchesCenter = activeCenter === 'all' || center === activeCenter;

        if (matchesSearch && matchesCategory && matchesCenter) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (countBadge) {
        countBadge.textContent = visibleCount + ' Tools Found';
      }
    }

    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        searchQuery = e.target.value.toLowerCase().trim();
        filterTools();
      });
    }

    filterChips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        filterChips.forEach(function (c) { c.classList.remove('hs-filter-active'); });
        chip.classList.add('hs-filter-active');
        activeCategory = chip.getAttribute('data-cat') || 'all';
        filterTools();
      });
    });

    centerChips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        const selected = chip.getAttribute('data-center') || 'all';
        if (activeCenter === selected) {
          activeCenter = 'all';
          chip.style.opacity = '1';
        } else {
          centerChips.forEach(function (c) { c.style.opacity = '0.6'; });
          activeCenter = selected;
          chip.style.opacity = '1';
        }
        filterTools();
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initMobileDrawer();
    initScrollTop();
    initBottomTabBar();
    initToolsFilter();
  });
})();
