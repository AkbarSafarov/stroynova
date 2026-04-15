/**
 * Apt Filter — range sliders + room-type toggle
 */
export const initAptFilter = () => {
  const section = document.querySelector('.apt-filter');
  if (!section) return;

  // Update range input fill and output value
  const updateRange = (input, outputEl, formatter) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const val = Number(input.value);
    const pct = ((val - min) / (max - min)) * 100;
    input.style.setProperty('--range-pct', `${pct}%`);
    if (outputEl) outputEl.value = formatter(val);
  };

  // Floors slider
  const floorsInput = document.getElementById('filter-floors');
  const floorsOutput = document.getElementById('floors-min-val');
  if (floorsInput) {
    floorsInput.addEventListener('input', () => updateRange(floorsInput, floorsOutput, v => v));
    updateRange(floorsInput, floorsOutput, v => v);
  }

  // Price slider (значения в миллионах)
  const priceInput = document.getElementById('filter-price');
  const priceOutput = document.getElementById('price-output');
  if (priceInput) {
    const formatPrice = v => Number(v).toLocaleString('ru-RU', { maximumFractionDigits: 1 });
    priceInput.addEventListener('input', () => updateRange(priceInput, priceOutput, formatPrice));
    updateRange(priceInput, priceOutput, formatPrice);
  }

  // Room-type toggle
  section.querySelectorAll('.rooms-picker__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      section.querySelectorAll('.rooms-picker__btn').forEach(b => {
        b.classList.remove('rooms-picker__btn--active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('rooms-picker__btn--active');
      btn.setAttribute('aria-pressed', 'true');
    });
  });

  // Reset button
  const resetBtn = section.querySelector('.apt-filter__reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      const select = document.getElementById('filter-project');
      if (select) select.value = '';

      if (floorsInput) {
        floorsInput.value = floorsInput.min;
        updateRange(floorsInput, floorsOutput, v => v);
      }
      if (priceInput) {
        priceInput.value = priceInput.max;
        updateRange(priceInput, priceOutput, v => Number(v).toLocaleString('ru-RU', { maximumFractionDigits: 1 }));
      }

      section.querySelectorAll('.rooms-picker__btn').forEach(b => {
        b.classList.remove('rooms-picker__btn--active');
        b.setAttribute('aria-pressed', 'false');
      });
    });
  }
};
