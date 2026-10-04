import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "../i18n";
import { SectionLabel, RevealLine, ClipImage, FadeUp } from "../components/ui";
import { projects, statusKey } from "../data/projects";
import Magnetic from "../components/Magnetic";

gsap.registerPlugin(ScrollTrigger);

export default function Kashmir() {
  const { t, lang } = useLang();
  const root = useRef<HTMLElement>(null);
  const p = projects[0];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-k-shift]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 60 + i * 30 },
          { y: -(40 + i * 20), ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.8 } }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={root} className="relative bg-paper pt-24 sm:pt-36 pb-20 overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10">
        <SectionLabel index="02" text={t("nav_work").toUpperCase()} right={`${t("p_number")} ${p.number} / 06`} />

        {/* header */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <RevealLine>
              <h2 className="display- font-extrabold text-ink" style={{ fontSize: "clamp(60px, 10vw, 160px)" }}>
                KASHMIR<span className="text-navy">.</span>
              </h2>
            </RevealLine>
            <FadeUp delay={0.15}>
              <p className="mono mt-4 text-[10px] sm:text-[11px] tracking-[0.24em] text-navy">{t("k_cat")}</p>
            </FadeUp>
          </div>
          <FadeUp delay={0.2} className="lg:col-span-4">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mono text-[10px] tracking-[0.18em]">
              <div>
                <p className="text-smoke">{t("p_status")}</p>
                <p className="mt-1.5 flex items-center gap-2 text-navy font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-navy animate-pulse-dot" /> {t(statusKey[p.status])}
                </p>
              </div>
              <div>
                <p className="text-smoke">{t("p_year")}</p>
                <p className="mt-1.5 text-ink font-semibold">{p.year}</p>
              </div>
              <div className="col-span-2">
                <p className="text-smoke">{t("p_role")}</p>
                <p className="mt-1.5 text-ink font-semibold">{lang === "ru" ? p.roleRu : p.roleEn}</p>
              </div>
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={0.1} className="mt-10 max-w-3xl">
          <p className="text-[17px] sm:text-[21px] leading-relaxed text-ink/80 text-balance">{t("k_lead")}</p>
        </FadeUp>

        {/* full-bleed screenshot */}
        <div className="mt-14 sm:mt-20">
          <ClipImage
            src="/images/kashmir-main.jpg"
            alt={t("alt_kashmir")}
            caption={t("k_img1")}
            className="aspect-[4/3] sm:aspect-[16/9]"
            parallax={5}
            cropTop={8}
          />
        </div>

        {/* editorial row */}
        <div className="mt-16 sm:mt-28 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 grid grid-cols-12 gap-5">
            <div className="col-span-7" data-k-shift>
              <ClipImage
                src="/images/kashmir-detail.jpg"
                alt={t("alt_kashmir")}
                caption={t("k_img2")}
                className="aspect-[3/4]"
                parallax={5}
                cropTop={8}
              />
            </div>
            <div className="col-span-5 flex flex-col justify-end gap-6" data-k-shift>
              <div className="bg-mist p-6 sm:p-8">
                <p className="mono text-[9px] tracking-[0.24em] text-navy">UZ · RU · EN</p>
                <p className="display- mt-3 font-extrabold text-navy text-4xl sm:text-5xl">3 TIL</p>
                <p className="mono mt-3 text-[9px] tracking-[0.18em] text-steel leading-loose">SEO · SITEMAP · VERCEL</p>
              </div>
              <p className="mono text-[10px] leading-loose tracking-[0.14em] text-smoke max-w-[240px]">{t("k_note")}</p>
            </div>
          </div>

          {/* case study micro-blocks */}
          <div className="lg:col-span-5 flex flex-col">
            {[
              { q: "k_q1", b: "k_q1_b" },
              { q: "k_q2", b: "k_q2_b" },
              { q: "k_q3", b: "k_q3_b" },
            ].map((item, i) => (
              <FadeUp key={item.q} delay={i * 0.08} className="border-t border-line py-7 first:border-t-0 first:pt-0">
                <p className="mono text-[10px] tracking-[0.24em] text-navy">
                  0{i + 1} — {t(item.q)}
                </p>
                <p className="mt-3 text-[15px] sm:text-[16px] leading-relaxed text-ink/75">{t(item.b)}</p>
              </FadeUp>
            ))}
            <FadeUp delay={0.2} className="mt-auto pt-8 flex flex-wrap gap-3">
              {[p.url, p.url2].map((u, i) => (
                <Magnetic key={u}>
                  <a
                    href={u}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="open"
                    className={`group inline-flex items-center gap-2.5 mono text-[10px] tracking-[0.2em] px-5 py-3.5 border transition-colors duration-400 ${
                      i === 0
                        ? "bg-navy text-paper border-navy hover:bg-paper hover:text-navy"
                        : "border-line text-ink hover:border-navy hover:text-navy"
                    }`}
                  >
                    {i === 0 ? p.urlLabel : p.url2Label}
                    <ArrowUpRight size={13} className="transition-transform duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Magnetic>
              ))}
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
