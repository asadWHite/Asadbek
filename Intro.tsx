import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useLang } from "../i18n";

export default function Intro({ onDone, onMorphStart }: { onDone: () => void; onMorphStart: () => void }) {
  const { t } = useLang();
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const seen = localStorage.getItem("asdb-seen") === "1";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const finish = (instant = false) => {
      localStorage.setItem("asdb-seen", "1");
      onMorphStart();
      if (root.current) {
        if (instant) {
          root.current.style.display = "none";
          onDone();
        } else {
          gsap.to(root.current, {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 0.9,
            ease: "power4.inOut",
            onComplete: onDone,
          });
        }
      } else onDone();
    };

    if (seen || reduced) {
      finish(true);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.eventCallback("onUpdate", () => {
        const bar = root.current?.querySelector<HTMLElement>("[data-i-prog]");
        if (bar) bar.style.transform = `scaleX(${tl.progress()})`;
      });

      /* PHASE 01 — empty canvas meta  (0 → 1.4) */
      tl.fromTo(
        "[data-im]",
        { opacity: 0, y: 12, filter: "blur(8px)", letterSpacing: "0.5em" },
        { opacity: 1, y: 0, filter: "blur(0px)", letterSpacing: "0.28em", duration: 0.55, stagger: 0.2 }
      );
      tl.to("[data-im]", { opacity: 0, y: -10, filter: "blur(6px)", duration: 0.35, stagger: 0.04 }, "+=0.4");

      /* PHASE 02 — project memory (overlaps phase 01 exit) */
      tl.set("[data-ip]", { opacity: 1 }, "-=0.15");
      tl.fromTo("[data-ip='0']", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.5, ease: "power4.inOut" }, "<");
      tl.fromTo("[data-ip='1']", { yPercent: 120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5 }, "-=0.32");
      tl.fromTo("[data-ip='2']", { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5 }, "-=0.32");
      tl.fromTo("[data-ip='3']", { xPercent: 60, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.5 }, "-=0.32");
      tl.to("[data-ip]", { opacity: 0, y: -14, filter: "blur(5px)", duration: 0.4, stagger: 0.04 }, "+=0.35");

      /* PHASE 03 — building words, each handoff overlaps */
      const words = gsap.utils.toArray<HTMLElement>("[data-ib]");
      words.forEach((w, i) => {
        const mode = i % 4;
        const enter = mode === 0
          ? { from: { clipPath: "inset(100% 0 0 0)", autoAlpha: 1 }, to: { clipPath: "inset(0% 0 0 0)" } }
          : mode === 1
          ? { from: { autoAlpha: 0, letterSpacing: "0.35em", filter: "blur(10px)" }, to: { autoAlpha: 1, letterSpacing: "-0.02em", filter: "blur(0px)" } }
          : mode === 2
          ? { from: { autoAlpha: 0, scale: 1.6 }, to: { autoAlpha: 1, scale: 1 } }
          : { from: { autoAlpha: 0, xPercent: -40 }, to: { autoAlpha: 1, xPercent: 0 } };
        tl.fromTo(w, enter.from as gsap.TweenVars, { ...enter.to, duration: 0.45, ease: "power4.inOut" } as gsap.TweenVars, i === 0 ? "-=0.15" : "-=0.28");
        tl.to(w, { autoAlpha: 0, scale: 0.95, filter: "blur(4px)", duration: 0.26 }, "+=0.14");
      });

      /* PHASE 04 — identity */
      tl.fromTo("[data-ii]", { clipPath: "inset(0 0 100% 0)", y: 34 }, { clipPath: "inset(0 0 0% 0)", y: 0, duration: 0.7, ease: "power4.inOut" }, "-=0.35");
      tl.fromTo("[data-irole]", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }, "-=0.15");
      tl.to("[data-ihold]", { opacity: 0, y: -18, duration: 0.35, ease: "power2.in" }, "+=0.55");

      /* PHASE 05 — statement */
      tl.fromTo("[data-is='0']", { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.5, ease: "power4.inOut" }, "-=0.05");
      tl.fromTo("[data-is='1']", { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 0.5, ease: "power4.inOut" }, "-=0.22");

      /* PHASE 06 — morph into hero */
      tl.to("[data-is]", { opacity: 0, y: -20, duration: 0.3, ease: "power2.in" }, "+=0.7");
      tl.add(() => {
        localStorage.setItem("asdb-seen", "1");
        onMorphStart();
      }, "-=0.05");
      tl.to(root.current, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 1,
        ease: "power4.inOut",
        onComplete: onDone,
      });
    }, root);

    (root.current as any).__skip = () => {
      ctx.revert();
      finish(false);
    };
    return () => ctx.revert();
  }, []);

  const skip = () => {
    (root.current as any)?.__skip?.();
  };

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[120] bg-paper flex items-center justify-center"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      role="dialog"
      aria-label="Intro"
    >
      {/* real progress hairline */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-line/60">
        <div data-i-prog className="h-full w-full bg-navy origin-left" style={{ transform: "scaleX(0)" }} aria-hidden />
      </div>

      {/* phase 01 meta */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4" aria-hidden>
        {["intro_archive", "ASADBEK", "2026"].map((key, i) => (
          <span
            key={key}
            data-im
            className={`mono tracking-[0.28em] opacity-0 ${
              i === 1 ? "text-[15px] font-semibold text-ink" : "text-[10px] text-navy"
            }`}
          >
            {i === 1 ? key : t(key)}
          </span>
        ))}
      </div>

      {/* phase 02 projects */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {["KASHMIR", "USTATOP", "EDUCRM", "DRIVERA"].map((p, i) => (
          <span
            key={p}
            data-ip={i}
            className="absolute mono font-semibold tracking-[0.2em] text-ink opacity-0 text-[13px] sm:text-[15px]"
            style={{
              top: i === 0 ? "26%" : i === 1 ? "62%" : i === 2 ? "38%" : "74%",
              left: i === 0 ? "18%" : i === 1 ? "64%" : i === 2 ? "58%" : "24%",
            }}
          >
            <span className="text-navy mr-2 text-[9px]">0{i + 1}</span>
            {p}
          </span>
        ))}
      </div>

      {/* phase 03 big words */}
      {["intro_w1", "intro_w2", "intro_w3", "intro_w4"].map((k) => (
        <span key={k} data-ib className="absolute display- text-ink font-extrabold opacity-0 text-[clamp(56px,13vw,180px)]" aria-hidden>
          {t(k)}
          <span className="text-navy">.</span>
        </span>
      ))}

      {/* phase 04 identity */}
      <div data-ihold className="absolute inset-0 flex flex-col items-center justify-center text-center px-6" aria-hidden>
        <span data-ii className="display- block font-extrabold text-ink text-[clamp(58px,12vw,170px)]" style={{ clipPath: "inset(0 0 100% 0)" }}>
          ASADBEK<span className="text-navy">.</span>
        </span>
        <span data-irole className="mono mt-5 text-[10px] sm:text-[11px] tracking-[0.3em] text-navy opacity-0">
          {t("intro_role1")} · {t("intro_role2")}
        </span>
        <span data-irole className="mono mt-2 text-[9px] sm:text-[10px] tracking-[0.3em] text-smoke opacity-0">
          {t("intro_loc")}
        </span>
      </div>

      {/* phase 05 statement */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 gap-2 sm:gap-3" aria-hidden>
        <span data-is="0" className="display- block font-extrabold text-navy text-[clamp(34px,7vw,96px)]" style={{ clipPath: "inset(0 0 100% 0)" }}>
          {t("intro_s1")}
        </span>
        <span data-is="1" className="display- block font-extrabold text-ink text-[clamp(34px,7vw,96px)]" style={{ clipPath: "inset(100% 0 0 0)" }}>
          {t("intro_s2")}
        </span>
      </div>

      <button
        onClick={skip}
        className="absolute bottom-6 right-6 mono text-[10px] tracking-[0.24em] text-smoke hover:text-navy border border-line hover:border-navy px-4 py-2.5 transition-colors duration-300 z-10"
      >
        {t("intro_skip")} →
      </button>
    </div>
  );
}
