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
import { initUiHelpers } from './modules/uiHelpers.js';
import { initContactForm } from './modules/validateForm.js';
import { initCatalogMap } from './modules/catalogMap.js';
import { initCatalogSort } from './modules/catalogSort.js';
import { initApartmentsFilter } from './modules/apartmentsFilter.js';
import { initAptDetail } from './modules/aptDetail.js';
import { initPurchasePage } from './modules/purchasePage.js';
import { initFaqTabs } from './modules/faqTabs.js';
import { initAboutCompany } from './modules/aboutCompany.js';
import { initDocsReadMore } from './modules/docsReadMore.js';
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
    initUiHelpers();
    initContactForm();
    initCatalogMap();
    initCatalogSort();
    initApartmentsFilter();
    initAptDetail();
    initPurchasePage();
    initFaqTabs();
    initAboutCompany();
    initDocsReadMore();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
