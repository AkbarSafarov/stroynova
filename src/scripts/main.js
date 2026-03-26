/**
 * Main entry point
 * Initialises all modules
 */
import '../styles/main.scss';
import { initNavigation } from './modules/navigation.js';
import { initLazyImages } from './modules/lazyImages.js';
import { loadSvgSprite } from './modules/svgSprite.js';
import spriteUrl from '../assets/svg/sprite.svg?url';

const init = () => {
  loadSvgSprite(spriteUrl);
  initNavigation();
  initLazyImages();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
