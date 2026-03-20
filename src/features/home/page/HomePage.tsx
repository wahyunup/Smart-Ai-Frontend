import { useEffect, useRef } from "react";
import Footer from "../../../shared/components/partials/Footer";
import Navbar from "../../../shared/components/partials/Navbar";
import SectionClient from "../components/SectionClient";
import SectionFeature from "../components/SectionFeature";
import SectionHome from "../components/SectionHome";
import SectionHowItWorks from "../components/SectionHowItWorks";
import SectionWhoWeAre from "../components/SectionWhoWeAre";

/* ─── Particle canvas ─── */
const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      life: number;
      maxLife: number;
      reset(): void;
      update(): void;
      draw(): void;
    };

    const makeParticle = (): Particle => ({
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      r: 0,
      life: 0,
      maxLife: 0,
      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.r = Math.random() * 1.5 + 0.5;
        this.life = 0;
        this.maxLife = 200 + Math.random() * 300;
      },
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;
        if (
          this.life > this.maxLife ||
          this.x < 0 ||
          this.x > W ||
          this.y < 0 ||
          this.y > H
        )
          this.reset();
      },
      draw() {
        const t = this.life / this.maxLife;
        const alpha = t < 0.2 ? t / 0.2 : t > 0.8 ? (1 - t) / 0.2 : 1;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(22,255,110,${alpha * 0.6})`;
        ctx!.fill();
      },
    });

    const particles = Array.from({ length: 80 }, () => {
      const p = makeParticle();
      p.reset();
      return p;
    });

    let raf: number;
    const frame = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(22,255,110,${(1 - d / 120) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
        particles[i].update();
        particles[i].draw();
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-35"
    />
  );
};

/* ─── Glow orbs ─── */
const GlowOrbs = () => (
  <>
    <div className="fixed top-[10%] -left-[5%] w-[400px] h-[400px] rounded-full bg-[#16FF6E]/[.04] blur-[80px] pointer-events-none z-0" />
    <div className="fixed top-[40%] -right-[10%] w-[500px] h-[500px] rounded-full bg-[#09E86E]/[.03] blur-[80px] pointer-events-none z-0" />
    <div className="fixed bottom-[20%] left-[30%] w-[300px] h-[300px] rounded-full bg-[#16FF6E]/[.03] blur-[80px] pointer-events-none z-0" />
  </>
);

/* ─── Section divider ─── */
const Divider = () => (
  <div className="h-px bg-gradient-to-r from-transparent via-[#16FF6E]/10 to-transparent max-w-[1100px] mx-auto" />
);

const HomePage = () => {
  return (
    <div className="bg-[#040B0E] min-h-screen">
      {/* Background effects */}
      <ParticleCanvas />
      <GlowOrbs />

      {/* Navbar */}
      <Navbar />

      {/* Sections */}
      <SectionHome />

      <div className="flex flex-col">
        <Divider />
        <SectionClient />
        <Divider />
        <SectionFeature />
        <Divider />
        <SectionHowItWorks />
        <Divider />
        <SectionWhoWeAre />
        <Divider />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
