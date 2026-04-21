export const initPurchasePage = () => {
    // ---- Main tabs: Ипотека / Рассрочка / Сертификаты ----
    const mainBtns   = document.querySelectorAll('[data-main-tab]');
    const mainPanels = document.querySelectorAll('.pp-panel');
    if (!mainBtns.length) return;

    mainBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.dataset.mainTab;

            mainBtns.forEach(b => {
                b.classList.remove('pp-tabs__btn--active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('pp-tabs__btn--active');
            btn.setAttribute('aria-selected', 'true');

            mainPanels.forEach(p => {
                p.classList.toggle('pp-panel--active', p.id === `main-${key}`);
            });
        });
    });

    // ---- Sub tabs (shared logic for both ipoteka & certs) ----
    document.querySelectorAll('[data-sub-tab]').forEach(btn => {
        btn.addEventListener('click', () => {
            const key    = btn.dataset.subTab;
            const parent = btn.closest('.pp-panel') || document;

            // Deactivate sibling sub-tab buttons
            btn.closest('.pp-sub-tabs').querySelectorAll('[data-sub-tab]').forEach(b => {
                b.classList.remove('pp-sub-tabs__btn--active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('pp-sub-tabs__btn--active');
            btn.setAttribute('aria-selected', 'true');

            // Deactivate all sub-panels inside this main panel
            parent.querySelectorAll('.pp-sub-panel').forEach(p => {
                p.classList.toggle('pp-sub-panel--active', p.id === key);
            });
        });
    });
};
