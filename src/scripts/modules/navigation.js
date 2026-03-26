/**
 * Navigation module — mobile burger menu
 */
import { $, on } from '../utils/dom.js';
import { trapFocus } from '../utils/a11y.js';

export const initNavigation = () => {
  const burger = $('.header__burger');
  const mobileNav = $('.mobile-nav');

  if (!burger || !mobileNav) return;

  let releaseFocus = null;

  const openMenu = () => {
    mobileNav.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    releaseFocus = trapFocus(mobileNav);
  };

  const closeMenu = () => {
    mobileNav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    releaseFocus?.();
    releaseFocus = null;
    burger.focus();
  };

  on(burger, 'click', () => {
    mobileNav.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  on(document, 'keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) closeMenu();
  });

  on(document, 'click', (e) => {
    if (
      mobileNav.classList.contains('is-open') &&
      !mobileNav.contains(e.target) &&
      !burger.contains(e.target)
    ) closeMenu();
  });

  // Mark current page
  document.querySelectorAll('.nav__link, .mobile-nav__link').forEach((link) => {
    if (link.href === window.location.href) link.setAttribute('aria-current', 'page');
  });
};
