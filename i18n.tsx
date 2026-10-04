import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ru" | "en";
type Dict = Record<string, { ru: string; en: string }>;

export const dict: Dict = {
  /* ---------- intro ---------- */
  intro_archive: { ru: "ЛИЧНЫЙ ЦИФРОВОЙ АРХИВ", en: "PERSONAL DIGITAL ARCHIVE" },
  intro_loc: { ru: "УЗБЕКИСТАН / 2026", en: "UZBEKISTAN / 2026" },
  intro_role1: { ru: "ВЕБ-РАЗРАБОТЧИК", en: "WEB DEVELOPER" },
  intro_role2: { ru: "СОЗДАТЕЛЬ ПРОДУКТОВ", en: "PRODUCT BUILDER" },
  intro_w1: { ru: "СОЗДАВАТЬ", en: "BUILD" },
  intro_w2: { ru: "ПРОЕКТИРОВАТЬ", en: "DESIGN" },
  intro_w3: { ru: "ЭКСПЕРИМЕНТ", en: "EXPERIMENT" },
  intro_w4: { ru: "ИТЕРАЦИЯ", en: "ITERATE" },
  intro_s1: { ru: "Я ВСЁ ЕЩЁ УЧУСЬ.", en: "STILL LEARNING." },
  intro_s2: { ru: "НО УЖЕ СТРОЮ.", en: "ALREADY BUILDING." },
  intro_skip: { ru: "Пропустить", en: "Skip" },
  intro_loading: { ru: "ОТКРЫВАЮ АРХИВ", en: "OPENING ARCHIVE" },

  /* ---------- nav ---------- */
  nav_work: { ru: "Работы", en: "Work" },
  nav_about: { ru: "Обо мне", en: "About" },
  nav_lab: { ru: "Лаборатория", en: "Lab" },
  nav_contact: { ru: "Контакт", en: "Contact" },
  nav_process: { ru: "Процесс", en: "Process" },
  nav_index: { ru: "Индекс", en: "Index" },
  nav_top: { ru: "Наверх", en: "Top" },

  /* ---------- hero ---------- */
  hero_kicker: { ru: "НЕ ПОРТФОЛИО — ЦИФРОВОЙ АРХИВ", en: "NOT A PORTFOLIO — A DIGITAL ARCHIVE" },
  hero_l1: { ru: "ЦИФРОВЫЕ", en: "DIGITAL" },
  hero_l2: { ru: "ПРОДУКТЫ", en: "PRODUCTS" },
  hero_l3: { ru: "И ЭКСПЕРИМЕНТЫ", en: "& EXPERIMENTS" },
  hero_sub: {
    ru: "Я создаю сайты, цифровые продукты и интерактивные эксперименты. Всё ещё учусь — но уже строю.",
    en: "I build websites, digital products and interactive experiments. Still learning — but already building.",
  },
  hero_meta1: { ru: "ВЕБ-РАЗРАБОТКА", en: "WEB DEVELOPMENT" },
  hero_meta2: { ru: "ПРОДУКТОВЫЕ СИСТЕМЫ", en: "PRODUCT SYSTEMS" },
  hero_meta3: { ru: "ИНТЕРАКТИВНЫЙ ДИЗАЙН", en: "INTERACTION DESIGN" },
  hero_scroll: { ru: "Листайте вниз", en: "Scroll down" },
  hero_availability: { ru: "ОТКРЫТ К НОВЫМ ИДЕЯМ", en: "OPEN TO NEW IDEAS" },
  hero_stat_projects: { ru: "ПРОЕКТОВ", en: "PROJECTS" },
  hero_stat_live: { ru: "В ЖИВУЮ", en: "LIVE" },
  hero_stat_grade: { ru: "КЛАСС — И УЖЕ СТРОЮ", en: "GRADE — ALREADY BUILDING" },

  /* ---------- about ---------- */
  about_kicker: { ru: "01 — НЕ «ОБО МНЕ», А КТО Я", en: "01 — NOT \u201CABOUT ME\u201D BUT WHO I AM" },
  about_title: { ru: "НЕСКОЛЬКО ГЛАВ", en: "A FEW CHAPTERS" },
  about_ch1_t: { ru: "КТО Я", en: "WHO I AM" },
  about_ch1_b: {
    ru: "Я учусь в 11 классе. Несмотря на возраст, отношусь к делу серьёзно: каждый проект я строю не как «школьное задание», а как настоящий продукт. Узбекистан — большой растущий рынок, и я учусь создавать для него.",
    en: "I'm an 11th-grade student. Despite my age, I take the work seriously: every project is built not as a school assignment, but as a real product. Uzbekistan is a big, fast-growing market — and I'm learning to build for it.",
  },
  about_ch2_t: { ru: "ЧТО Я СТРОЮ", en: "WHAT I BUILD" },
  about_ch2_b: {
    ru: "Премиальные сайты, маркетплейсы, платформы управления и продукты внутри экосистемы Telegram. От клиента до карты, от админки до бота — стараюсь продумывать систему целиком, от начала до конца.",
    en: "Premium websites, marketplaces, management platforms and products inside the Telegram ecosystem. From customer to map, from admin panel to bot — I try to think through the whole system, end to end.",
  },
  about_ch3_t: { ru: "КАК Я ДУМАЮ", en: "HOW I THINK" },
  about_ch3_b: {
    ru: "Сначала структура, потом красота. Каждая страница, анимация и кнопка должны иметь смысл. Я выдвигаю гипотезу, собираю прототип, ломаю и строю заново. Использую ИИ-инструменты как быстрого партнёра по мышлению — но финальное решение всегда моё.",
    en: "Structure first, beauty second. Every page, animation and button must mean something. I form a hypothesis, build a prototype, break it and rebuild. I use AI tools as a fast thinking partner — but the final decision is always mine.",
  },
  about_ch4_t: { ru: "ЧЕМУ СЕЙЧАС УЧУСЬ", en: "WHAT I'M LEARNING" },
  about_ch4_b: {
    ru: "Английский и IELTS — одно из главных направлений. Параллельно углубляюсь во фронтенд и интересуюсь авиацией: путь пилота притягивает не только небом, но и дисциплиной. Лучший способ учиться — строить.",
    en: "English and IELTS are one of my main tracks. In parallel I'm going deeper into frontend and I'm drawn to aviation: the pilot path attracts me not only with the sky, but with discipline. The best way to learn is to build.",
  },

  /* ---------- shared project labels ---------- */
  p_number: { ru: "ПРОЕКТ", en: "PROJECT" },
  p_category: { ru: "КАТЕГОРИЯ", en: "CATEGORY" },
  p_status: { ru: "СТАТУС", en: "STATUS" },
  p_year: { ru: "ГОД", en: "YEAR" },
  p_role: { ru: "РОЛЬ", en: "ROLE" },
  p_tech: { ru: "ТЕХНОЛОГИИ", en: "TECH" },
  p_link: { ru: "ССЫЛКА", en: "LINK" },
  p_visit: { ru: "Открыть сайт", en: "Open website" },
  p_case: { ru: "Смотреть кейс", en: "View case" },
  st_live: { ru: "LIVE", en: "LIVE" },
  st_live_dev: { ru: "LIVE / В РАЗРАБОТКЕ", en: "LIVE / IN DEVELOPMENT" },
  st_concept: { ru: "КОНЦЕПТ", en: "CONCEPT" },
  st_support: { ru: "ВСПОМОГАТЕЛЬНЫЙ", en: "SUPPORTING" },
  st_experiment: { ru: "ЭКСПЕРИМЕНТ", en: "EXPERIMENT" },
  scroll_hint: { ru: "Листайте", en: "Scroll" },

  /* ---------- kashmir ---------- */
  k_cat: { ru: "ПРЕМИАЛЬНЫЕ ШТОРЫ · САЙТ ОБ ИНТЕРЬЕРЕ", en: "PREMIUM CURTAINS · INTERIOR WEBSITE" },
  k_lead: {
    ru: "Официальный сайт премиального бренда штор в Узбекистане. Стили штор, вдохновение интерьером и структура, которая ведёт клиента к решению — на трёх языках: узбекском, русском и английском.",
    en: "The official website of a premium curtain brand in Uzbekistan. Curtain styles, interior inspiration and a structure that guides the customer — in three languages: Uzbek, Russian and English.",
  },
  k_note: {
    ru: "Трёхъязычная архитектура · SEO и sitemap · Деплой на Vercel · Мягкие анимации · Полная адаптивность",
    en: "Three-language architecture · SEO & sitemap · Deployed on Vercel · Soft motion · Fully responsive",
  },
  k_img1: { ru: "Главная — полный экран", en: "Homepage — full screen" },
  k_img2: { ru: "Страница коллекции — деталь", en: "Collection page — detail" },
  k_q1: { ru: "Зачем?", en: "Why?" },
  k_q1_b: {
    ru: "Интерьер — это ощущение. Сайт должен был продавать не товар, а настроение: мягкость, спокойствие и доверие.",
    en: "Interior is a feeling. The site had to sell not a product, but a mood: softness, calm and trust.",
  },
  k_q2: { ru: "Подход", en: "Approach" },
  k_q2_b: {
    ru: "Страницы, поставленные как модный журнал: крупные фото, много воздуха, медленное движение. Каждый экран похож на интерьерный каталог.",
    en: "Pages staged like a fashion magazine: large images, plenty of air, slow motion. Every screen feels like an interior catalogue.",
  },
  k_q3: { ru: "Техническая сторона", en: "Technical side" },
  k_q3_b: {
    ru: "SEO-first архитектура: правильные заголовки, sitemap, индексация и отдельные пути для трёх языков. Быстрая загрузка на Vercel.",
    en: "SEO-first architecture: proper headings, sitemap, indexing and separate paths for three languages. Loads fast on Vercel.",
  },

  /* ---------- ustatop ---------- */
  u_cat: { ru: "МАРКЕТПЛЕЙС УСЛУГ", en: "SERVICE MARKETPLACE" },
  u_lead: {
    ru: "Есть проблема? Скажите — найдём мастера. UstaTop соединяет клиентов с проверенными мастерами по всему Узбекистану.",
    en: "Have a problem? Tell us — we'll find the master for it. UstaTop connects customers with verified masters across Uzbekistan.",
  },
  u_system: { ru: "КЛИЕНТ · МАСТЕР · АДМИН — ОДНА СИСТЕМА", en: "CUSTOMER · MASTER · ADMIN — ONE SYSTEM" },
  u_stage1_t: { ru: "ПРОБЛЕМА", en: "PROBLEM" },
  u_stage1_b: {
    ru: "Когда течёт кран или ломается кондиционер, мастера ищут случайно в интернете. Доверия нет, цена неясна, качество — лотерея.",
    en: "When a tap leaks or an AC breaks, people search for a random master online. No trust, unclear price, quality is a lottery.",
  },
  u_stage2_t: { ru: "ПОИСК", en: "DISCOVERY" },
  u_stage2_b: {
    ru: "В UstaTop есть категории услуг и карточки мастеров: опыт, цена, рейтинг и прошлые работы в одном месте.",
    en: "UstaTop has service categories and master cards: experience, price, rating and previous work in one place.",
  },
  u_stage3_t: { ru: "КАРТА", en: "MAP" },
  u_stage3_b: {
    ru: "Карта на Google Maps показывает мастеров поблизости — расстояние тоже часть решения.",
    en: "A Google Maps-based map shows masters nearby — distance is part of the decision.",
  },
  u_stage4_t: { ru: "МАСТЕР", en: "MASTER" },
  u_stage4_b: {
    ru: "У каждого мастера профиль: верификация, годы опыта, оценки и фото работ «до / после».",
    en: "Every master has a profile: verification, years of experience, ratings and before / after work photos.",
  },
  u_stage5_t: { ru: "ДОВЕРИЕ", en: "TRUST" },
  u_stage5_b: {
    ru: "Главный принцип платформы — доверие: модерация админом, настоящие оценки и прозрачные цены находятся в самом центре системы.",
    en: "The platform's core principle is trust: admin moderation, real ratings and transparent pricing sit at the very center of the system.",
  },
  u_stage6_t: { ru: "СИСТЕМА", en: "SYSTEM" },
  u_stage6_b: {
    ru: "Сайт + Telegram-бот + будущее мобильное приложение. Админ модерирует, клиент находит, мастер работает.",
    en: "Website + Telegram bot + a future mobile app. Admin moderates, customer finds, master works.",
  },
  u_hub_t: { ru: "USTATOP SOCIAL HUB", en: "USTATOP SOCIAL HUB" },
  u_hub_b: {
    ru: "Отдельная страница, приводящая трафик из Instagram на основной сайт. Маленькая, но важная часть экосистемы.",
    en: "A separate page that brings Instagram traffic to the main website. A small but important part of the ecosystem.",
  },
  u_bot: { ru: "TELEGRAM-БОТ", en: "TELEGRAM BOT" },
  u_mobile_t: { ru: "МОБИЛЬНОЕ НАПРАВЛЕНИЕ", en: "MOBILE DIRECTION" },
  u_mobile_b: {
    ru: "Android-версия UstaTop исследуется на Kotlin и Jetpack Compose: Material 3, MVVM, Clean Architecture и Hilt.",
    en: "The UstaTop Android version is being explored with Kotlin and Jetpack Compose: Material 3, MVVM, Clean Architecture and Hilt.",
  },

  /* ---------- educrm ---------- */
  e_cat: { ru: "ПЛАТФОРМА УПРАВЛЕНИЯ ОБУЧЕНИЕМ", en: "EDUCATION MANAGEMENT PLATFORM" },
  e_lead: {
    ru: "Система управления для небольших частных учебных центров Узбекистана. Не для государственных школ — для реального частного бизнеса.",
    en: "A management system for small private learning centers in Uzbekistan. Not for public schools — for real private business.",
  },
  e_note: {
    ru: "Веб-админка · Telegram-бот · Telegram Mini App — три лица, один мозг.",
    en: "Web admin · Telegram bot · Telegram Mini App — three faces, one brain.",
  },
  e_owner: {
    ru: "Владелец центра видит из одной панели деньги, долги, посещаемость, зарплаты учителей, учеников и группы.",
    en: "The owner sees money, debts, attendance, teacher salaries, students and groups from a single panel.",
  },
  e_lang: { ru: "ЯЗЫКИ: СНАЧАЛА УЗБЕКСКИЙ · ЗАТЕМ РУССКИЙ · АНГЛИЙСКИЙ ОПЦИОНАЛЬНО", en: "LANGUAGES: UZBEK FIRST · RUSSIAN SECOND · ENGLISH OPTIONAL" },
  e_scr1: { ru: "Панель", en: "Dashboard" },
  e_scr2: { ru: "Ученики", en: "Students" },
  e_scr3: { ru: "Посещаемость", en: "Attendance" },
  e_scr4: { ru: "Финансы", en: "Finance" },
  e_scr5: { ru: "Учителя", en: "Teachers" },
  e_concept_note: {
    ru: "Пока это концепт в разработке — интерфейсы собираются как прототип, без выдуманных бизнес-метрик.",
    en: "Currently a concept in development — interfaces are being built as a prototype, with no fabricated business metrics.",
  },

  /* ---------- drivera ---------- */
  d_cat: { ru: "МАРКЕТПЛЕЙС АРЕНДЫ АВТО", en: "CAR RENTAL MARKETPLACE" },
  d_lead: {
    ru: "Концепт премиального маркетплейса аренды автомобилей: владельцы размещают машины, водители бронируют, платформа берёт комиссию.",
    en: "A concept for a premium car rental marketplace: owners list cars, drivers book, the platform takes a commission.",
  },
  d_f1: { ru: "TELEGRAM-БОТ", en: "TELEGRAM BOT" },
  d_f2: { ru: "MINI APP", en: "MINI APP" },
  d_f3: { ru: "БРОНИРОВАНИЕ", en: "BOOKING" },
  d_f4: { ru: "МОДЕРАЦИЯ", en: "ADMIN APPROVAL" },
  d_f5: { ru: "КОМИССИЯ", en: "COMMISSION MODEL" },
  d_stamp: { ru: "КОНЦЕПТ — НА СТАДИИ ИССЛЕДОВАНИЯ", en: "CONCEPT — RESEARCH PHASE" },

  /* ---------- horizontal archive ---------- */
  ha_kicker: { ru: "АРХИВ — ГОРИЗОНТАЛЬНАЯ СЦЕНА", en: "ARCHIVE — HORIZONTAL SCENE" },
  ha_title: { ru: "ЧЕТЫРЕ ИСТОРИИ", en: "FOUR STORIES" },
  ha_hint: { ru: "Листайте — архив откроется вбок", en: "Scroll — the archive opens sideways" },

  /* ---------- lab ---------- */
  lab_kicker: { ru: "ИНТЕРАКТИВНАЯ ПЛОЩАДКА", en: "INTERACTIVE PLAYGROUND" },
  lab_title: { ru: "ЛАБОРАТОРИЯ", en: "THE LAB" },
  lab_lead: {
    ru: "Здесь нет зрителей — всё можно трогать. Каждый эксперимент по-настоящему работает.",
    en: "No spectators here — everything can be touched. Every experiment actually works.",
  },
  lab1_t: { ru: "КИНЕТИЧЕСКИЙ ШРИФТ", en: "KINETIC TYPE" },
  lab1_d: { ru: "Буквы убегают от курсора", en: "Letters run from the cursor" },
  lab2_t: { ru: "МАГНИТНЫЙ UI", en: "MAGNETIC UI" },
  lab2_d: { ru: "Кнопка тянется к курсору", en: "The button pulls toward the cursor" },
  lab3_t: { ru: "СЕТКА КУРСОРА", en: "CURSOR GRID" },
  lab3_d: { ru: "Клетки реагируют на близость", en: "Cells respond to proximity" },
  lab4_t: { ru: "ДЕФОРМАЦИЯ ИЗОБРАЖЕНИЯ", en: "IMAGE DISTORTION" },
  lab4_d: { ru: "Фото плавится от скорости курсора", en: "The image melts from cursor speed" },
  lab5_t: { ru: "ФИЗИКА СКРОЛЛА", en: "SCROLL PHYSICS" },
  lab5_d: { ru: "Слово слышит скорость скролла", en: "The word hears scroll speed" },
  lab6_t: { ru: "AI-РАБОЧИЙ ПРОЦЕСС", en: "AI WORKFLOW" },
  lab6_d: { ru: "От идеи до продукта", en: "From idea to product" },
  lab6_s1: { ru: "ИДЕЯ", en: "IDEA" },
  lab6_s2: { ru: "ПРОМПТ", en: "PROMPT" },
  lab6_s3: { ru: "ПРОТОТИП", en: "PROTOTYPE" },
  lab6_s4: { ru: "ИТЕРАЦИЯ", en: "ITERATION" },
  lab6_s5: { ru: "ПРОДУКТ", en: "PRODUCT" },
  lab6_b: {
    ru: "ИИ — не волшебник в подсобке, а партнёр за моим столом. Я даю идею, он даёт скорость; я ломаю, он помогает собирать заново.",
    en: "AI isn't a magician in the back room — it's a partner at my desk. I bring the idea, it brings speed; I break things, it helps me reassemble.",
  },

  /* ---------- stack ---------- */
  stack_kicker: { ru: "КАРТА ТЕХНОЛОГИЙ", en: "TECHNOLOGY MAP" },
  stack_title: { ru: "НА ЧЁМ СТОИТ СИСТЕМА", en: "WHAT THE SYSTEM STANDS ON" },
  stack_deploy: { ru: "ДЕПЛОЙ", en: "DEPLOYMENT" },
  stack_eco: { ru: "ЭКОСИСТЕМА", en: "ECOSYSTEM" },
  stack_mobile: { ru: "МОБИЛЬНОЕ", en: "MOBILE" },
  stack_ai: { ru: "AI-ПРОЦЕСС", en: "AI WORKFLOW" },
  stack_note: {
    ru: "ИИ-инструменты — не мой «секретный навык», а открытая часть процесса. Важно то, кто управляет результатом.",
    en: "AI tools are not my \u201Csecret skill\u201D — they're an open part of my process. What matters is who controls the result.",
  },

  /* ---------- process ---------- */
  pr_kicker: { ru: "ЗАКРЕПЛЁННАЯ СЦЕНА", en: "PINNED SCENE" },
  pr_title: { ru: "КАК Я СТРОЮ", en: "HOW I BUILD" },
  pr_s1: { ru: "ИДЕЯ", en: "IDEA" },
  pr_s1_b: { ru: "Всё начинается с простого вопроса: «а можно ли это сделать лучше?»", en: "Everything starts with a simple question: \u201Ccan this be done better?\u201D" },
  pr_s2: { ru: "ИССЛЕДОВАНИЕ", en: "RESEARCH" },
  pr_s2_b: { ru: "Для кого, зачем, что уже сделали другие — сначала понять.", en: "For whom, why, what others have done — understand first." },
  pr_s3: { ru: "СТРУКТУРА", en: "STRUCTURE" },
  pr_s3_b: { ru: "Страницы, состояния, потоки данных — архитектура на бумаге до дизайна.", en: "Pages, states, data flows — paper architecture before design." },
  pr_s4: { ru: "ДИЗАЙН", en: "DESIGN" },
  pr_s4_b: { ru: "Образ, типографика, движение — слой эмоций поверх структуры.", en: "Image, typography, motion — the emotion layer over structure." },
  pr_s5: { ru: "СБОРКА", en: "BUILD" },
  pr_s5_b: { ru: "Первая версия быстрая и неидеальная. Главное — чтобы дышала.", en: "The first version is fast and imperfect. What matters — it breathes." },
  pr_s6: { ru: "ЛОМАТЬ", en: "BREAK" },
  pr_s6_b: { ru: "Смотрю на свою работу жёстко: нахожу слабые места и ломаю их.", en: "I look at my own work harshly: find the weak spots and break them." },
  pr_s7: { ru: "ПЕРЕСБОРКА", en: "REBUILD" },
  pr_s7_b: { ru: "Версия 02 почти всегда радикально лучше версии 01.", en: "Version 02 is almost always radically better than version 01." },
  pr_s8: { ru: "ЗАПУСК", en: "SHIP" },
  pr_s8_b: { ru: "Vercel, домен, индексация — продукт жив, только когда он в руках людей.", en: "Vercel, domain, indexing — a product is alive only in people's hands." },
  pr_v1: { ru: "ВЕРСИЯ 01", en: "VERSION 01" },
  pr_v2: { ru: "ВЕРСИЯ 02", en: "VERSION 02" },
  pr_problem: { ru: "ПРОБЛЕМА", en: "PROBLEM" },
  pr_iter: { ru: "ИТЕРАЦИЯ", en: "ITERATION" },

  /* ---------- catalogue ---------- */
  cat_kicker: { ru: "ПОЛНЫЙ ИНДЕКС", en: "FULL INDEX" },
  cat_title: { ru: "АРХИВ", en: "ARCHIVE" },
  f_all: { ru: "ВСЕ", en: "ALL" },
  f_live: { ru: "LIVE", en: "LIVE" },
  f_products: { ru: "ПРОДУКТЫ", en: "PRODUCTS" },
  f_web: { ru: "ВЕБ", en: "WEB" },
  f_mobile: { ru: "МОБИЛ", en: "MOBILE" },
  f_exp: { ru: "ЭКСПЕРИМЕНТЫ", en: "EXPERIMENTS" },

  /* ---------- now ---------- */
  now_kicker: { ru: "ТЕКУЩЕЕ СОСТОЯНИЕ — 2026", en: "CURRENT STATE — 2026" },
  now_title: { ru: "СЕЙЧАС", en: "NOW" },
  now_b1_t: { ru: "СТРОЮ", en: "BUILDING" },
  now_b1_b: { ru: "новые цифровые продукты и развитие экосистемы UstaTop", en: "new digital products and expanding the UstaTop ecosystem" },
  now_b2_t: { ru: "ИССЛЕДУЮ", en: "EXPLORING" },
  now_b2_b: { ru: "глубокий интерактивный дизайн, кинетическую типографику и скролл-сцены", en: "deep interaction design, kinetic typography and scroll scenes" },
  now_b3_t: { ru: "УЧУСЬ", en: "LEARNING" },
  now_b3_b: { ru: "английский / IELTS, фронтенд-архитектуру и продуктовое мышление", en: "English / IELTS, frontend architecture and product thinking" },
  now_b4_t: { ru: "ДУМАЮ О", en: "THINKING ABOUT" },
  now_b4_b: { ru: "мобильных приложениях, AI-интеграциях и маркетплейсах", en: "mobile apps, AI integrations and marketplaces" },

  /* ---------- next ---------- */
  nx_kicker: { ru: "КАРТА БУДУЩЕГО", en: "FUTURE MAP" },
  nx_title: { ru: "ЧТО ДАЛЬШЕ?", en: "WHAT'S NEXT?" },
  nx_lead: {
    ru: "Не обещания — направления. Этот список обновляется каждый год.",
    en: "Not promises — directions. This list updates every year.",
  },
  nx_i1: { ru: "Более сильные и цельные цифровые продукты", en: "Stronger, more complete digital products" },
  nx_i2: { ru: "Продвинутые интерактивные сцены и микроанимации", en: "Advanced interaction scenes and micro-animations" },
  nx_i3: { ru: "Мобильные приложения — реальная разработка на Compose", en: "Mobile apps — real development with Compose" },
  nx_i4: { ru: "AI-интеграции внутри продуктов", en: "AI integrations inside products" },
  nx_i5: { ru: "Архитектура маркетплейсов и платёжных систем", en: "Marketplace and payment system architecture" },
  nx_i6: { ru: "Сильные визуальные системы для брендов", en: "Strong visual systems for brands" },

  /* ---------- contact ---------- */
  ct_kicker: { ru: "СВЯЗЬ — ОТКРЫТА", en: "CONTACT — OPEN" },
  ct_l1: { ru: "ДАВАЙТЕ", en: "LET'S" },
  ct_l2: { ru: "СОЗДАДИМ ТО,", en: "BUILD SOMETHING" },
  ct_l3: { ru: "ЧТО ХОЧЕТСЯ ОТКРЫТЬ.", en: "WORTH OPENING." },
  ct_cta: { ru: "Написать в Telegram", en: "Message on Telegram" },
  ct_links: { ru: "ССЫЛКИ ИЗ СИСТЕМЫ", en: "LINKS FROM THE SYSTEM" },
  ct_more: { ru: "СТРОИТЬ ЕЩЁ МНОГО.", en: "MORE TO BUILD." },
  ct_foot_note: {
    ru: "Сайт построен на React · TypeScript · Tailwind · GSAP · Lenis. Личный архив — обновляется постоянно.",
    en: "This site is built with React · TypeScript · Tailwind · GSAP · Lenis. A personal archive — constantly evolving.",
  },
  ct_rights: { ru: "ВСЕ ПРАВА — И ВСЕ ПЛАНЫ — ПРИНАДЛЕЖАТ АСАДБЕКУ.", en: "ALL RIGHTS — AND ALL PLANS — BELONG TO ASADBEK." },

  /* ---------- alt / aria ---------- */
  alt_kashmir: { ru: "Макет сайта Kashmir — премиальные шторы", en: "Kashmir — premium curtains website mockup" },
  alt_ustatop: { ru: "Интерфейс платформы UstaTop", en: "UstaTop marketplace interface" },
  alt_educrm: { ru: "Концепт панели EduCRM для учебных центров", en: "EduCRM dashboard concept for learning centers" },
  alt_drivera: { ru: "Концепт Drivera — аренда автомобилей", en: "Drivera — car rental concept" },
  alt_mobile: { ru: "Экраны Android-приложения UstaTop", en: "UstaTop Android app screens" },
  alt_ink: { ru: "Абстрактное изображение для лаборатории", en: "Abstract artwork for the lab" },
};

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string }>({
  lang: "ru",
  setLang: () => {},
  t: (k) => k,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "ru";
    const saved = localStorage.getItem("asdb-lang");
    return saved === "en" ? "en" : "ru";
  });

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("asdb-lang", l);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback(
    (k: string) => {
      const row = dict[k];
      if (!row) return k;
      return row[lang];
    },
    [lang]
  );

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
