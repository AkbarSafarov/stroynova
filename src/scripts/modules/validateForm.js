/**
 * Contact CTA form — validation + phone mask
 */

const RULES = {
    name: {
        validate: (v) => v.trim().length >= 2 && /^[а-яёА-ЯЁa-zA-Z\s\-]+$/.test(v.trim()),
        message: 'Введите имя (минимум 2 буквы)',
    },
    phone: {
        validate: (v) => /^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/.test(v),
        message: 'Введите корректный номер телефона',
    },
    consent: {
        validate: (el) => el.checked,
        message: 'Необходимо ваше согласие',
    },
};

// ---- Phone mask ----
const applyPhoneMask = (input) => {
    input.addEventListener('input', () => {
        let digits = input.value.replace(/\D/g, '');

        if (digits.startsWith('8')) digits = '7' + digits.slice(1);
        if (!digits.startsWith('7')) digits = '7' + digits;
        digits = digits.slice(0, 11);

        const d = digits.padEnd(11, '_');
        let masked = `+${d[0]}(${d[1]}${d[2]}${d[3]})-${d[4]}${d[5]}${d[6]}-${d[7]}${d[8]}-${d[9]}${d[10]}`;
        masked = masked.replace(/[_\-()]+$/, '');
        input.value = masked;
    });

    input.addEventListener('focus', () => {
        if (!input.value) input.value = '+7(';
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && input.value === '+7(') {
            e.preventDefault();
            input.value = '';
        }
    });
};

// ---- Error badge helpers ----
// For text inputs: badge is absolute inside __input-wrap
const showInputError = (field, wrap, message) => {
    field.classList.add('is-invalid');
    let badge = wrap.querySelector('.contact-cta__error');
    if (!badge) {
        badge = document.createElement('span');
        badge.className = 'contact-cta__error';
        badge.setAttribute('role', 'alert');
        wrap.appendChild(badge);
    }
    badge.textContent = message;
};

const clearInputError = (field, wrap) => {
    field.classList.remove('is-invalid');
    wrap.querySelector('.contact-cta__error')?.remove();
};

// For checkbox: error appended inside checkbox-wrap
const showCheckboxError = (wrap, message) => {
    wrap.classList.add('is-invalid');
    let err = wrap.querySelector('.contact-cta__error');
    if (!err) {
        err = document.createElement('span');
        err.className = 'contact-cta__error';
        err.setAttribute('role', 'alert');
        wrap.appendChild(err);
    }
    err.textContent = message;
};

const clearCheckboxError = (wrap) => {
    wrap.classList.remove('is-invalid');
    wrap.querySelector('.contact-cta__error')?.remove();
};

// ---- Validate helpers ----
const validateInput = (name, input, field, wrap) => {
    const valid = RULES[name].validate(input.value);
    if (valid) clearInputError(field, wrap);
    else showInputError(field, wrap, RULES[name].message);
    return valid;
};

const validateConsent = (checkbox, wrap) => {
    const valid = RULES.consent.validate(checkbox);
    if (valid) clearCheckboxError(wrap);
    else showCheckboxError(wrap, RULES.consent.message);
    return valid;
};

// ---- Init ----
export const initContactForm = () => {
    const form = document.querySelector('.contact-cta__form');
    if (!form) return;

    const nameInput    = form.querySelector('#cta-name');
    const phoneInput   = form.querySelector('#cta-phone');
    const consentInput = form.querySelector('[name="consent"]');
    if (!nameInput || !phoneInput || !consentInput) return;

    const nameField    = nameInput.closest('.contact-cta__field');
    const nameWrap     = nameInput.closest('.contact-cta__input-wrap');
    const phoneField   = phoneInput.closest('.contact-cta__field');
    const phoneWrap    = phoneInput.closest('.contact-cta__input-wrap');
    const consentWrap  = consentInput.closest('.contact-cta__checkbox-wrap');

    applyPhoneMask(phoneInput);

    // validate on blur
    nameInput.addEventListener('blur',    () => validateInput('name',  nameInput,  nameField,  nameWrap));
    phoneInput.addEventListener('blur',   () => validateInput('phone', phoneInput, phoneField, phoneWrap));
    consentInput.addEventListener('change', () => validateConsent(consentInput, consentWrap));

    // re-validate live after first error
    nameInput.addEventListener('input', () => {
        if (nameField.classList.contains('is-invalid'))
            validateInput('name', nameInput, nameField, nameWrap);
    });
    phoneInput.addEventListener('input', () => {
        if (phoneField.classList.contains('is-invalid'))
            validateInput('phone', phoneInput, phoneField, phoneWrap);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const v1 = validateInput('name',  nameInput,  nameField,  nameWrap);
        const v2 = validateInput('phone', phoneInput, phoneField, phoneWrap);
        const v3 = validateConsent(consentInput, consentWrap);

        if (!v1 || !v2 || !v3) {
            form.querySelector('.is-invalid input, .is-invalid')?.focus();
            return;
        }

        const submit = form.querySelector('.contact-cta__submit');
        submit.disabled = true;
        submit.textContent = 'Отправлено!';

        setTimeout(() => {
            form.reset();
            submit.disabled = false;
            submit.textContent = 'Отправить';
        }, 3000);
    });
};
