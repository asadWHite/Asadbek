# Asadbek — Личный цифровой архив

React 19 + Vite 7 + Tailwind 4 + GSAP / Lenis.

## Структура

```
index.html            # точка входа (подключает /src/main.tsx)
src/
  main.tsx            # bootstrap React
  App.tsx             # корневой компонент + Lenis/ScrollTrigger
  i18n.tsx            # словари ru/en и провайдер языка
  index.css           # Tailwind + базовые стили
  components/         # Cursor, Intro, Nav, Magnetic, ui
  sections/           # Hero, About, Kashmir, Ustatop, Educrm, Drivera,
                      # HorizontalStory, Lab, Stack, Process, Catalogue,
                      # NowNext, Contact
  data/projects.ts    # данные проектов
  lib/                # scroll.ts, cn.ts
public/
  images/             # скриншоты проектов (/images/*.jpg)
  og.jpg robots.txt sitemap.xml
vercel.json           # SPA-rewrite на /index.html (статика имеет приоритет)
```

## Команды

```bash
npm install
npm run dev       # dev-сервер (http://localhost:5173)
npm run build     # production-сборка в dist/
npm run preview   # предпросмотр собранной версии
```

## Деплой

Vercel: framework `vite`, build `npm run build`, output `dist`.
