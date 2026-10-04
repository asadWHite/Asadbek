import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowUp, Send } from "lucide-react";
import { useLang } from "../i18n";
import { SectionLabel, FadeUp } from "../components/ui";
import Magnetic from "../components/Magnetic";

gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  { label: "TELEGRAM", value: "@UstTop_bot", href: "https://t.me/UstTop_bot" },
  { label: "KASHMIR", value: "kashmirdecor.uz", href: "https://kashmirdecor.uz/" },
  { label: "USTATOP", value: "ustatop360.uz", href: "https://ustatop360.uz/" },
  { label: "SOCIAL HUB", value: "ustatopinst.vercel.app", href: "https://ustatopinst.vercel.app/" },
];

export default function Contact() {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* big lines reveal */
      gsap.utils.toArray<HTMLElement>("[data-c-line]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { yPercent: 115 },
          { yPercent: 0, duration: 1.2, delay: i * 0.1, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 90%" } }
        );
      });
      /* final word fill */
      gsap.fromTo(
        "[data-c-fill]",
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1.6, ease: "power4.inOut", scrollTrigger: { trigger: "[data-c-final]", start: "top 78%" } }
      );
      /* gentle parallax on giant name */
      gsap.fromTo(
        "[data-c-name]",
        { yPercent: 30 },
        { yPercent: 0, ease: "none", scrollTrigger: { trigger: "[data-c-footer]", start: "top bottom", end: "bottom bottom", scrub: 0.6 } }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={root} className="relative bg-abyss text-paper overflow-hidden border-t border-paper/10">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10 pt-24 sm:pt-36">
        <SectionLabel dark index="12" text={t("ct_kicker")} />

        <h2 className="contact-h1 display- mt-14 font-extrabold leading-[0.95]" style={{ fontSize: "clamp(44px, 8.2vw, 130px)" }}>
          <span className="mask-line"><span data-c-line>{t("ct_l1")}</span></span>
          <span className="mask-line"><span data-c-line className="text-stroke text-paper/85">{t("ct_l2")}</span></span>
          <span className="mask-line"><span data-c-line>{t("ct_l3")}</span></span>
        </h2>

        <FadeUp delay={0.3} className="mt-12">
          <Magnetic strength={0.4}>
            <a
              href="https://t.me/UstTop_bot"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="talk"
              className="group inline-flex items-center gap-4 bg-paper text-navy px-8 sm:px-10 py-5 sm:py-6 mono text-[11px] sm:text-[12px] tracking-[0.2em] font-semibold hover:bg-navy hover:text-paper border border-paper hover:border-paper/30 transition-colors duration-500"
            >
              <Send size={15} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
              {t("ct_cta")}
            </a>
          </Magnetic>
        </FadeUp>

        {/* links */}
        <div className="mt-24 sm:mt-32">
          <p className="mono text-[9px] tracking-[0.26em] text-paper/40 mb-6">{t("ct_links")}</p>
          <div className="border-b border-paper/15">
            {LINKS.map((l, i) => (
              <FadeUp key={l.label} delay={i * 0.05}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="open"
                  className="group flex items-center gap-5 sm:gap-10 border-t border-paper/15 py-5 sm:py-7 hover:bg-paper/[0.05] transition-colors duration-300 px-1 sm:px-3"
                >
                  <span className="mono text-[9px] tracking-[0.22em] text-paper/40 w-28 sm:w-36 shrink-0">{l.label}</span>
                  <span className="display- flex-1 font-bold text-paper/90 group-hover:text-paper text-xl sm:text-3xl transition-all duration-400 group-hover:translate-x-2">
                    {l.value}
                  </span>
                  <ArrowUpRight size={20} className="text-paper/40 group-hover:text-paper group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-400 shrink-0" />
                </a>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* final scene */}
        <div data-c-final className="mt-28 sm:mt-40 text-center">
          <p className="mono text-[9px] tracking-[0.3em] text-paper/40">© 2026 — {t("intro_loc")}</p>
          <p className="final-w relative mt-8 display- font-extrabold leading-none" style={{ fontSize: "clamp(40px, 7.5vw, 120px)" }}>
            <span className="text-stroke text-paper/60">{t("ct_more")}</span>
            <span data-c-fill className="absolute inset-0 text-paper" aria-hidden>
              {t("ct_more")}
            </span>
          </p>
        </div>
      </div>

      {/* footer */}
      <footer data-c-footer className="relative mt-20 sm:mt-28 pt-14 pb-8 overflow-hidden">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-10">
          <div className="h-px w-full bg-paper/15" />
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-10">
            <div className="overflow-hidden">
              <p data-c-name className="foot-name display- font-extrabold text-paper leading-[0.85] will-change-transform" style={{ fontSize: "clamp(70px, 13vw, 220px)" }}>
                ASADBEK<span className="text-navy" style={{ WebkitTextStroke: "0" }}>·</span>
              </p>
            </div>
            <div className="mono text-[9px] leading-loose tracking-[0.2em] text-paper/50 sm:text-right">
              <p>{t("ct_foot_note")}</p>
              <p className="mt-2 text-paper/70">{t("ct_rights")}</p>
            </div>
          </div>
          <div className="mt-10 flex items-center justify-between">
            <p className="mono text-[9px] tracking-[0.24em] text-paper/40">ASADBEK — 2026</p>
            <a href="#top" data-cursor="link" className="group inline-flex items-center gap-3 mono text-[9px] tracking-[0.24em] text-paper/60 hover:text-paper transition-colors">
              {t("nav_top")}
              <span className="w-8 h-8 border border-paper/25 rounded-full flex items-center justify-center group-hover:bg-paper group-hover:text-navy transition-all duration-400">
                <ArrowUp size={12} />
              </span>
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
