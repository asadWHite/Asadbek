import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, MapPin, Bot, Smartphone } from "lucide-react";
import { useLang } from "../i18n";
import { SectionLabel, FadeUp, ClipImage } from "../components/ui";
import { projects, statusKey } from "../data/projects";
import Magnetic from "../components/Magnetic";

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  { t: "u_stage1_t", b: "u_stage1_b", img: "/images/ustatop-home.jpg", pos: "50% 30%" },
  { t: "u_stage2_t", b: "u_stage2_b", img: "/images/ustatop-home.jpg", pos: "50% 75%" },
  { t: "u_stage3_t", b: "u_stage3_b", img: "/images/ustatop-map.jpg", pos: "50% 50%" },
  { t: "u_stage4_t", b: "u_stage4_b", img: "/images/ustatop-master.jpg", pos: "50% 35%" },
  { t: "u_stage5_t", b: "u_stage5_b", img: "/images/ustatop-master.jpg", pos: "50% 80%" },
  { t: "u_stage6_t", b: "u_stage6_b", img: "/images/ustatop-home.jpg", pos: "50% 50%" },
];

export default function Ustatop() {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cur = useRef(-1);
  const [stage, setStage] = useState(0);
  const p = projects[1];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>("[data-u-word]");
      const descs = gsap.utils.toArray<HTMLElement>("[data-u-desc]");
      const figs = gsap.utils.toArray<HTMLElement>("[data-u-fig]");

      gsap.set(words, { yPercent: 120, autoAlpha: 0 });
      gsap.set(descs, { y: 24, autoAlpha: 0 });
      gsap.set(figs, { clipPath: "inset(100% 0% 0% 0%)", visibility: "hidden" });

      const activate = (i: number, down: boolean) => {
        if (i === cur.current) return;
        const prev = cur.current;
        cur.current = i;
        setStage(i);

        if (prev >= 0) {
          gsap.to(words[prev], { yPercent: down ? -120 : 120, autoAlpha: 0, duration: 0.42, ease: "power2.in", overwrite: "auto" });
          gsap.to(descs[prev], { y: down ? -20 : 20, autoAlpha: 0, duration: 0.32, ease: "power2.in", overwrite: "auto" });
        }
        gsap.fromTo(
          words[i],
          { yPercent: down ? 120 : -120, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.62, ease: "power4.out", overwrite: "auto" }
        );
        gsap.fromTo(descs[i], { y: down ? 26 : -26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55, delay: 0.08, ease: "power3.out", overwrite: "auto" });

        const enterFrom = down ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)";
        figs.forEach((f, fi) => {
          if (fi === i) {
            gsap.set(f, { visibility: "visible", zIndex: 10, clipPath: enterFrom });
            gsap.to(f, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.85, ease: "power4.inOut", overwrite: "auto" });
          } else if (fi === prev) {
            gsap.set(f, { zIndex: 5 });
            gsap.to(f, {
              clipPath: down ? "inset(0% 0% 100% 0%)" : "inset(100% 0% 0% 0%)",
              duration: 0.85,
              ease: "power4.inOut",
              overwrite: "auto",
              onComplete: () => gsap.set(f, { visibility: "hidden" }),
            });
          }
        });
      };

      figs.forEach((f) => {
        const img = f.querySelector("img");
        gsap.fromTo(
          img,
          { yPercent: -4, scale: 1.12 },
          {
            yPercent: 4,
            scale: 1.12,
            ease: "none",
            scrollTrigger: { trigger: wrapRef.current, start: "top top", end: "bottom bottom", scrub: 0.5 },
          }
        );
      });

      ScrollTrigger.create({
        trigger: wrapRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const i = Math.min(STAGES.length - 1, Math.floor(self.progress * STAGES.length * 0.999));
          activate(i, self.direction >= 0);
        },
        onEnter: () => activate(0, true),
        onEnterBack: () => activate(cur.current === -1 ? 0 : cur.current, false),
        onRefresh: (self) => {
          if (self.progress > 0 && self.progress < 1) {
            const i = Math.min(STAGES.length - 1, Math.floor(self.progress * STAGES.length * 0.999));
            activate(i, true);
          }
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative bg-pure">
      {/* ------------ PINNED DOCUMENTARY ------------ */}
      <div ref={wrapRef} className="relative h-[560vh]">
        <div ref={pinRef} className="sticky top-0 h-screen w-full overflow-hidden flex flex-col bg-pure">
          <div className="px-5 sm:px-10 pt-24 sm:pt-24 shrink-0">
            <SectionLabel index="02" text="USTATOP" right={`${t("p_status")}: ${t(statusKey[p.status])}`} />
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 px-5 sm:px-10 py-6 min-h-0">
            {/* text side */}
            <div className="relative flex flex-col justify-center min-h-0">
              <p className="mono text-[10px] tracking-[0.3em] text-smoke mb-6">{t("u_system")}</p>
              <div className="relative h-[150px] sm:h-[220px] overflow-visible">
                {STAGES.map((s) => (
                  <h3
                    key={s.t}
                    data-u-word
                    className="display- absolute inset-0 font-extrabold text-navy flex items-center"
                    style={{ fontSize: "clamp(52px, 8.5vw, 130px)" }}
                  >
                    {t(s.t)}
                  </h3>
                ))}
              </div>
              <div className="relative h-[128px] sm:h-[120px] mt-4 max-w-xl">
                {STAGES.map((s) => (
                  <p key={s.b} data-u-desc className="absolute inset-0 text-[14px] sm:text-[17px] leading-relaxed text-ink/75">
                    {t(s.b)}
                  </p>
                ))}
              </div>
              <div className="mono mt-6 text-[10px] tracking-[0.24em] text-navy">
                <span className="text-ink font-semibold">0{stage + 1}</span> / 06
              </div>
            </div>

            {/* image side */}
            <div className="relative min-h-[220px] lg:min-h-0 overflow-hidden">
              {STAGES.map((s, i) => (
                <figure key={i} data-u-fig className="absolute inset-0 overflow-hidden">
                  <img
                    src={s.img}
                    alt={t("alt_ustatop")}
                    loading="lazy"
                    className="w-full h-[124%] -mt-[8%] object-cover will-change-transform"
                    style={{ objectPosition: s.pos }}
                  />
                  <figcaption className="mono absolute bottom-3 left-3 text-[9px] tracking-[0.22em] bg-paper/90 text-navy px-2.5 py-1.5">
                    {String(i + 1).padStart(2, "0")} — {t(s.t)}
                  </figcaption>
                </figure>
              ))}
              <div className="absolute top-3 right-3 mono text-[9px] tracking-[0.22em] bg-navy text-paper px-2.5 py-1.5 z-20">
                {t("p_case")}
              </div>
            </div>
          </div>

          {/* progress segments */}
          <div className="shrink-0 px-5 sm:px-10 pb-6">
            <div className="flex gap-1.5">
              {STAGES.map((_, i) => (
                <div key={i} className="h-[3px] flex-1 bg-line overflow-hidden">
                  <div
                    className={`h-full bg-navy origin-left transition-transform duration-700 ease-[cubic-bezier(.65,0,.35,1)] ${
                      i <= stage ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ------------ ECOSYSTEM ------------ */}
      <div className="relative bg-paper py-24 sm:py-32">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5 flex flex-col gap-10">
            <FadeUp>
              <h3 className="display- font-extrabold text-ink" style={{ fontSize: "clamp(36px,4.5vw,64px)" }}>
                {t("u_hub_t")}
              </h3>
              <p className="mt-5 text-[16px] leading-relaxed text-ink/75 max-w-md">{t("u_hub_b")}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Magnetic>
                  <a href="https://ustatop360.uz/" target="_blank" rel="noopener noreferrer" data-cursor="open"
                    className="group inline-flex items-center gap-2.5 mono text-[10px] tracking-[0.2em] px-5 py-3.5 bg-navy text-paper hover:bg-abyss transition-colors">
                    ustatop360.uz <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a href="https://ustatopinst.vercel.app/" target="_blank" rel="noopener noreferrer" data-cursor="open"
                    className="inline-flex items-center gap-2.5 mono text-[10px] tracking-[0.2em] px-5 py-3.5 border border-line text-ink hover:border-navy hover:text-navy transition-colors">
                    social hub <ArrowUpRight size={13} />
                  </a>
                </Magnetic>
              </div>
            </FadeUp>

            <FadeUp className="border border-line p-6 sm:p-8 bg-pure">
              <div className="flex items-center gap-3 text-navy">
                <Bot size={18} />
                <p className="mono text-[10px] tracking-[0.24em]">{t("u_bot")}</p>
              </div>
              <a href="https://t.me/UstTop_bot" target="_blank" rel="noopener noreferrer" data-cursor="open" className="u-sweep mt-4 inline-block display- font-bold text-ink text-2xl sm:text-3xl hover:text-navy transition-colors">
                @UstTop_bot
              </a>
            </FadeUp>
          </div>

          {/* mobile lab */}
          <div className="lg:col-span-7">
            <FadeUp className="flex items-center gap-3 text-navy mb-6">
              <Smartphone size={16} />
              <p className="mono text-[10px] tracking-[0.24em]">{t("u_mobile_t")}</p>
              <span className="mono text-[9px] tracking-[0.18em] text-paper bg-steel px-2 py-1 ml-2">{t("st_experiment")}</span>
            </FadeUp>
            <div className="grid grid-cols-12 gap-5 items-start">
              <div className="col-span-12 sm:col-span-7">
                <ClipImage src="/images/ustatop-mobile.jpg" alt={t("alt_mobile")} caption="Kotlin · Compose · Material 3" className="aspect-[4/3]" parallax={5} />
              </div>
              <FadeUp className="col-span-12 sm:col-span-5 sm:pt-10">
                <p className="text-[15px] leading-relaxed text-ink/75">{t("u_mobile_b")}</p>
                <ul className="mono mt-6 space-y-2.5 text-[10px] tracking-[0.18em] text-smoke">
                  {["KOTLIN", "JETPACK COMPOSE", "MATERIAL 3", "MVVM", "CLEAN ARCHITECTURE", "HILT"].map((x) => (
                    <li key={x} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-navy" /> {x}
                    </li>
                  ))}
                </ul>
              </FadeUp>
            </div>
            <FadeUp className="mt-8 flex items-center gap-2 mono text-[10px] tracking-[0.2em] text-smoke">
              <MapPin size={12} className="text-navy" /> GOOGLE MAPS · TELEGRAM · SUPABASE · POSTGRES
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
