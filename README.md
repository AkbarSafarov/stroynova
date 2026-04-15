# stroynova
# Vite Project Boilerplate

сборка для фронтенд-разработки: **HTML5 + SCSS (BEM) + ES6+ JS + Vite**.

## Стек технологий

- **HTML5** — семантическая вёрстка, WCAG 2.1 AA
- **SCSS** — BEM-методология, компонентная архитектура
- **JavaScript** (ES6+) — модульная структура, без jQuery
- **Vite** — сборщик с HMR и tree shaking
- **ESLint** + **Stylelint** + **Prettier** — контроль качества кода

## Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера (http://localhost:3000)
npm run dev

# Production-сборка
npm run build

# Предпросмотр production-сборки
npm run preview
```

## Команды

| Команда | Описание |
|---|---|
| `npm run dev` | Dev-сервер с hot reload |
| `npm run build` | Production-сборка в `/dist` |
| `npm run preview` | Просмотр production-сборки |
| `npm run lint:js` | Линтинг JS (ESLint) |
| `npm run lint:css` | Линтинг SCSS (Stylelint) |
| `npm run lint` | JS + CSS линтинг |
| `npm run format` | Форматирование кода (Prettier) |

## Структура проекта

```
/
├── public/                  # Статичные ассеты (favicon, robots.txt)
├── src/
│   ├── assets/
│   │   ├── images/          # Изображения (webp, avif, jpg)
│   │   ├── svg/             # SVG-спрайт
│   │   └── fonts/           # Шрифты
│   ├── styles/
│   │   ├── abstracts/       # Переменные, миксины, функции, брейкпоинты
│   │   ├── base/            # Reset, типографика, базовые стили
│   │   ├── components/      # BEM-компоненты (кнопки, карточки, аккордеоны...)
│   │   ├── layout/          # Контейнер, хедер, футер, сетка
│   │   └── main.scss        # Точка входа CSS
│   └── scripts/
│       ├── modules/         # JS-модули по логическим блокам
│       ├── utils/           # Вспомогательные утилиты (dom, a11y)
│       └── main.js          # Точка входа JS
├── index.html
├── vite.config.js
├── .eslintrc.json
├── .stylelintrc.json
└── .prettierrc.json
```

## SCSS-архитектура

```
abstracts/
  _variables.scss   — цвета, типографика, отступы, тени
  _breakpoints.scss — брейкпоинты + миксины respond-to/respond-below
  _mixins.scss      — flex-center, visually-hidden, focus-ring, transition…
  _functions.scss   — rem(), em(), clamp-size()
  index.scss        — @forward всех abstracts (для additionalData в vite.config)
```

## Доступность

- Все интерактивные элементы доступны с клавиатуры (`Tab`, `Enter`, `Escape`)
- Реализован skip-link «Перейти к содержимому»
- Фокус-кольцо видно при навигации с клавиатуры (скрыто для мышки)
- Мобильное меню: ловушка фокуса + `aria-expanded` + закрытие по `Escape`
- Изображения: `alt`, `width/height` для предотвращения CLS
- Аккордеон — pure CSS через `<details>`/`<summary>` без JS

## SEO

- Один `<h1>` на страницу
- Правильная иерархия заголовков
- OpenGraph + Twitter Card мета-теги
- Schema.org: Organization, Article, FAQPage
- Canonical, robots.txt

## Брейкпоинты

| Имя | Размер |
|---|---|
| `xs` | 480px |
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

```scss
// Использование:
@include respond-to('md') { ... }   // min-width
@include respond-below('md') { ... } // max-width
```

## Требования к окружению

- Node.js ≥ 18
- npm ≥ 9
