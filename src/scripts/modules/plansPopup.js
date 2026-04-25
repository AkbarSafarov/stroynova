/**
 * Plans Popup — shown when clicking "Показать N квартиры" buttons
 */
import { trapFocus } from '../utils/a11y.js';

export const initPlansPopup = () => {
    const popup = document.getElementById('plans-popup');
    if (!popup) return;

    const titleText = popup.querySelector('.plans-popup__title-text');
    const list = popup.querySelector('.plans-popup__list');
    const overlay = popup.querySelector('.plans-popup__overlay');
    const closeBtn = popup.querySelector('.plans-popup__close');
    const container = popup.querySelector('.plans-popup__container');

    let releaseTrap = null;

    const open = () => {
        popup.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            releaseTrap = trapFocus(container);
        }, 50);
    };

    const close = () => {
        popup.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (releaseTrap) { releaseTrap(); releaseTrap = null; }
    };

    overlay.addEventListener('click', close);
    closeBtn.addEventListener('click', close);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && popup.getAttribute('aria-hidden') === 'false') { close(); }
    });

    document.querySelectorAll('.plans-show-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();

            const tabInner = btn.closest('.tab-inner');
            const planTitle = tabInner.querySelector('.tab-inner__title')?.textContent.trim() ?? '';
            const params = tabInner.querySelectorAll('.tab-inner__params-item');
            const area = params[1]?.querySelector('.tab-inner__params-value')?.textContent.trim() ?? '';
            const price = params[2]?.querySelector('.tab-inner__params-value')?.textContent.trim() ?? '';
            const imgSrc = tabInner.querySelector('.tab-inner__left img')?.src ?? '';

            titleText.textContent = `${planTitle}, ${area}`;

            list.innerHTML = [0, 1].map((_, i) => `
                <div class="plans-popup__apt">
                    <div class="plans-popup__apt-img">
                        <img src="${imgSrc}" alt="${planTitle}" loading="lazy">
                    </div>
                    <div class="plans-popup__apt-info">
                        <div class="plans-popup__apt-name">${planTitle}, ${area}</div>
                        <div class="plans-popup__apt-badge">Предчистовая отделка</div>
                    </div>
                    <div class="plans-popup__apt-details">
                        <div>1 корпус</div>
                        <div>секция 5.1</div>
                        <div>${i === 0 ? '9/26 этаж' : '10/26 этаж'}</div>
                        <div>номер: ${i === 0 ? 4 : 5}</div>
                    </div>
                    <div class="plans-popup__apt-price">
                        <div class="plans-popup__apt-price-label">Стоимость</div>
                        <div class="plans-popup__apt-price-val">${price}</div>
                    </div>
                </div>
            `).join('');

            open();
        });
    });
};
