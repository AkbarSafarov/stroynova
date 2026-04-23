import Swiper from 'swiper';
import { Navigation, Pagination, A11y } from 'swiper/modules';

export const initAboutCompany = () => {
    // ---- Галерея ----
    const galleryEl = document.querySelector('.about-gallery-slider');
    if (galleryEl) {
        new Swiper(galleryEl, {
            modules: [Pagination, A11y],
            loop: true,
            pagination: {
                el: '.about-gallery-pagination',
                clickable: true,
            },
            a11y: {
                prevSlideMessage: 'Предыдущий слайд галереи',
                nextSlideMessage: 'Следующий слайд галереи',
            },
        });
    }

    // ---- Слайдер наград ----
    const awardsEl = document.querySelector('.awards-slider');
    if (awardsEl) {
        new Swiper(awardsEl, {
            modules: [Navigation, A11y],
            loop: false,
            navigation: {
                nextEl: '.awards-section .arrow--next',
                prevEl: '.awards-section .arrow--prev',
            },
            a11y: {
                prevSlideMessage: 'Предыдущая награда',
                nextSlideMessage: 'Следующая награда',
            },
        });
    }

    // ---- Вкладки лет в наградах ----
    const yearBtns = document.querySelectorAll('.awards-year-btn');
    yearBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            yearBtns.forEach(b => b.classList.remove('awards-year-btn--active'));
            btn.classList.add('awards-year-btn--active');
        });
    });
};
