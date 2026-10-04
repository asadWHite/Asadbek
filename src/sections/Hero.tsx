import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import { useLang } from "../i18n";

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ ready }: { ready: boolean }) {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const squareRef = useRef<HTMLDivElement>(null);
  const played = useRef(false);

  /* entrance choreography */
  useEffect(() => {
    if (!ready || played.current) return;
    played.current = true;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo("[data-h-line]", { yPercent: 118 }, { yPercent: 0, duration: 1.25, stagger: 0.1 }, 0.05);
      tl.fromTo("[data-h-kicker]", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, 0.35);
      tl.fromTo("[data-h-meta]", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.55);
      tl.fromTo("[data-h-ghost]", { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 1.4, ease: "power3.out" }, 0.4);
      tl.fromTo("[data-h-sq]", { scale: 0, rotate: -90 }, { scale: 1, rotate: 0, duration: 0.9, ease: "back.out(1.6)" }, 0.7);
      tl.fromTo("[data-h-marq]", { yPercent: 100 }, { yPercent: 0, duration: 0.9, ease: "power3.inOut" }, 0.8);
    }, root);
    return () => ctx.revert();
  }, [ready]);

  /* pointer parallax + scroll scrub */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const qxT = gsap.quickTo(titleRef.current, "x", { duration: 1.1, ease: "power3.out" });
      const qyT = gsap.quickTo(titleRef.current, "y", { duration: 1.1, ease: "power3.out" });
      const qxM = gsap.quickTo(metaRef.current, "x", { duration: 1.3, ease: "power3.out" });
      const qyM = gsap.quickTo(metaRef.current, "y", { duration: 1.3, ease: "power3.out" });
      const qxG = gsap.quickTo(ghostRef.current!, "x", { duration: 1.6, ease: "power3.out" });
      const qxS = gsap.quickTo(squareRef.current!, "x", { duration: 1.2, ease: "power3.out" });
      const qyS = gsap.quickTo(squareRef.current!, "y", { duration: 1.2, ease: "power3.out" });

      const onMove = (e: MouseEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        qxT(nx * 6); qyT(ny * 4);
        qxM(nx * 10); qyM(ny * 8);
        qxG(nx * -26);
        qxS(nx * 22); qyS(ny * 16);
      };
      if (window.matchMedia("(pointer: fine)").matches) window.addEventListener("mousemove", onMove, { passive: true });

      gsap.to(titleRef.current, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.6 },
      });
      gsap.to("[data-h-kicker2]", {
        opacity: 0.15,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "40% top", end: "bottom top", scrub: true },
      });
      return () => window.removeEventListener("mousemove", onMove);
    }, root);
    return () => ctx.revert();
  }, []);

  const marqueeItems = ["KASHMIR", "USTATOP", "EDUCRM", "DRIVERA", "SOCIAL HUB", "MOBILE LAB"];

  return (
    <section id="top" ref={root} className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-paper pt-28 pb-16">
      {/* ghost outline word */}
      <div ref={ghostRef} className="pointer-events-none absolute right-[-4%] top-[16%] select-none" aria-hidden>
        <span data-h-ghost className="display- text-stroke text-navy/25 font-extrabold text-[clamp(90px,18vw,280px)] opacity-0">
          ARXIV
        </span>
      </div>

      {/* rotating navy square */}
      <div ref={squareRef} className="absolute right-[10%] bottom-[30%] hidden lg:block" aria-hidden>
        <div data-h-sq className="w-16 h-16 border border-navy/30 flex items-center justify-center">
          <div className="w-8 h-8 bg-navy animate-spin-slow" />
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-10">
        <p data-h-kicker className="mono text-[10px] sm:text-[11px] tracking-[0.3em] text-navy mb-6 sm:mb-10 opacity-0">
          {t("hero_kicker")}
        </p>

        <div ref={titleRef}>
          <h1 className="hero-h1 display- font-extrabold text-ink leading-[0.9]" style={{ fontSize: "clamp(46px, 11.5vw, 180px)" }}>
            <span className="mask-line"><span data-h-line>{t("hero_l1")}</span></span>
            <span className="mask-line"><span data-h-line className="inline-flex items-baseline gap-[0.06em]">
              {t("hero_l2")}<span className="w-[0.13em] h-[0.13em] bg-navy translate-y-[0.05em] self-center" aria-hidden />
            </span></span>
            <span className="mask-line"><span data-h-line className="text-navy">{t("hero_l3")}</span></span>
          </h1>
        </div>

        <div ref={metaRef} className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end" data-h-kicker2>
          <p data-h-meta className="lg:col-span-5 text-[17px] sm:text-[19px] leading-relaxed text-ink/80 max-w-xl opacity-0 text-balance">
            {t("hero_sub")}
          </p>
          <div data-h-meta className="lg:col-span-4 mono text-[10px] tracking-[0.22em] text-smoke space-y-2.5 opacity-0">
            <p className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-navy" /> {t("hero_meta1")}</p>
            <p className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-navy" /> {t("hero_meta2")}</p>
            <p className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-navy" /> {t("hero_meta3")}</p>
          </div>
          <div data-h-meta className="lg:col-span-3 flex lg:justify-end opacity-0">
            <a href="#work" data-cursor="view" className="group inline-flex items-center gap-4 mono text-[10px] tracking-[0.24em] text-navy">
              <span className="relative flex w-10 h-10 items-center justify-center border border-navy/30 rounded-full overflow-hidden">
                <ArrowDown size={14} className="relative z-10 transition-transform duration-500 group-hover:translate-y-0.5" />
                <span className="absolute inset-0 bg-navy scale-y-0 origin-bottom transition-transform duration-500 group-hover:scale-y-100" aria-hidden />
              </span>
              {t("hero_scroll")}
            </a>
          </div>
        </div>
      </div>

      {/* project marquee */}
      <div className="absolute bottom-0 left-0 w-full border-t border-line overflow-hidden">
        <div data-h-marq className="flex whitespace-nowrap py-3.5 animate-marquee will-change-transform">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0" aria-hidden={dup === 1}>
              {marqueeItems.concat(marqueeItems).map((m, i) => (
                <span key={`${dup}-${i}`} className="mono text-[10px] tracking-[0.3em] text-smoke mx-6 flex items-center gap-6">
                  {m} <span className="w-1 h-1 bg-navy/40 inline-block" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
