/**
 * Main entry point
 * Initialises all modules
 */
import '../styles/main.scss';
import { initNavigation, initOverflowNav } from './modules/navigation.js';
import { initLazyImages } from './modules/lazyImages.js';
import { loadSvgSprite } from './modules/svgSprite.js';
import { initHeroSlider } from './modules/heroSlider.js';
import { initAptFilter } from './modules/aptFilter.js';
import { initMortgageCalc } from './modules/mortgageCalc.js';
import { initPurchaseTabs } from './modules/purchaseTabs.js';
import { initPromosSlider } from './modules/promosSlider.js';
import { initAboutTabs } from './modules/aboutTabs.js';
import {initProjectMainSlider} from "@/scripts/modules/projectMapSlider.js";
import {initAnchorMenu} from "@/scripts/modules/anchorMenu.js";
import {initAboutProjectSlider} from "@/scripts/modules/aboutProjectSlider.js";
import {initGenPlan} from "@/scripts/modules/genPlan.js";
import {initProjectAdvSlider} from "@/scripts/modules/projectAdvantages.js";
import {projectPlansTabs} from "@/scripts/modules/projectPlans.js";
import {initStepsSlider} from "@/scripts/modules/projectSteps.js";
import {projectDocs} from "@/scripts/modules/projectDocuments.js";
import spriteUrl from '../assets/svg/sprite.svg?url';

const init = () => {
    loadSvgSprite(spriteUrl);
    initNavigation();
    initOverflowNav();
    initLazyImages();
    initHeroSlider();
    initAptFilter();
    initMortgageCalc();
    initPurchaseTabs();
    initPromosSlider();
    initAboutTabs();
    initProjectMainSlider();
    initAnchorMenu();
    initAboutProjectSlider();
    initGenPlan();
    initProjectAdvSlider();
    projectPlansTabs();
    initStepsSlider();
    projectDocs();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
