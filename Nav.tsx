import { useEffect, useState } from "react";
import { useLang, type Lang } from "../i18n";

const SECTIONS = ["work", "about", "lab", "contact"] as const;

export default function Nav({ onLang }: { onLang: () => void }) {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, []);

  const items: { id: (typeof SECTIONS)[number]; label: string }[] = [
    { id: "work", label: t("nav_work") },
    { id: "about", label: t("nav_about") },
    { id: "lab", label: t("nav_lab") },
    { id: "contact", label: t("nav_contact") },
  ];

  const LangBtn = ({ l }: { l: Lang }) => (
    <button
      onClick={() => {
        if (lang !== l) {
          setLang(l);
          onLang();
        }
      }}
      className={`relative px-2.5 py-1.5 transition-colors duration-300 ${
        lang === l ? "text-paper" : "text-smoke hover:text-navy"
      }`}
      aria-pressed={lang === l}
    >
      {lang === l && (
        <span className="absolute inset-0 bg-navy transition-all duration-300" style={{ borderRadius: 999 }} aria-hidden />
      )}
      <span className="relative z-10">{l.toUpperCase()}</span>
    </button>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-[90] flex justify-center pointer-events-none">
      <div
        className={`pointer-events-auto flex items-center justify-between w-full transition-all duration-500 ease-[cubic-bezier(.65,0,.35,1)] ${
          scrolled
            ? "mt-3 mx-3 sm:mx-0 sm:max-w-[680px] rounded-full border border-navy/15 bg-paper/90 backdrop-blur-md px-5 sm:px-6 py-2.5 shadow-[0_10px_40px_-18px_rgba(11,31,58,0.35)]"
            : "mt-0 max-w-full px-5 sm:px-10 py-5 bg-transparent border border-transparent"
        }`}
      >
        <a href="#top" data-cursor="link" className="mono font-semibold tracking-[0.18em] text-[12px] text-ink hover:text-navy transition-colors">
          ASADBEK<span className="text-navy">.</span>
        </a>

        <nav className="hidden md:flex items-center gap-7" aria-label="Asosiy">
          {items.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              data-cursor="link"
              className={`u-sweep mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-300 ${
                active === it.id ? "text-navy" : "text-smoke hover:text-navy"
              }`}
            >
              {it.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="mono text-[10px] flex items-center border border-line rounded-full px-1 py-0.5" role="group" aria-label="Язык / Language">
            <LangBtn l="ru" />
            <LangBtn l="en" />
          </div>
          <a
            href="#contact"
            data-cursor="talk"
            className="md:hidden mono text-[11px] tracking-[0.16em] uppercase text-navy underline underline-offset-4"
          >
            {t("nav_contact")}
          </a>
        </div>
      </div>
    </header>
  );
}
