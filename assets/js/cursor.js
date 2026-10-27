/** Lightweight, low contrast cursor particles shared by the site. */
(function () {
  "use strict";

  const MOBILE_BREAKPOINT = 768;
  const FRAME_INTERVAL = 1000 / 30;
  const DEFAULT_PALETTE = ["#4169e1", "#7892d0", "#92a2bd"];

  class Particle {
    constructor(width, height, color) {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.18;
      this.vy = (Math.random() - 0.5) * 0.18;
      this.radius = 0.8 + Math.random() * 1.15;
      this.color = color;
    }
  }

  class ReactiveSwarm {
    constructor() {
      this.canvas = document.querySelector(".particle-canvas");
      if (!this.canvas) {
        this.canvas = document.createElement("canvas");
        this.canvas.className = "particle-canvas";
        document.body.prepend(this.canvas);
      }

      this.ctx = this.canvas.getContext("2d", { alpha: true });
      if (!this.ctx) return;

      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.dpr = 1;
      this.isMobile = window.innerWidth < MOBILE_BREAKPOINT;
      this.particleCount = this.isMobile ? 28 : 76;
      this.palette = DEFAULT_PALETTE;
      this.particles = [];
      this.mouse = { x: -1000, y: -1000 };
      this.smoothMouse = { ...this.mouse };
      this.pointerActive = false;
      this.radius = this.isMobile ? 72 : 108;
      this.visible = true;
      this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      this.lastFrame = 0;
      this.rafId = 0;

      this.resize();
      this.createParticles();
      this.bindEvents();
      this.loadSettings();

      if (!this.reducedMotion) this.animate(0);

      window.updateAndys = (settings) => this.updateSettings(settings || {});
    }

    resize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.isMobile = this.width < MOBILE_BREAKPOINT;
      this.radius = this.isMobile ? 72 : 108;
      this.dpr = Math.min(window.devicePixelRatio || 1, this.isMobile ? 1.25 : 1.5);
      this.canvas.width = Math.round(this.width * this.dpr);
      this.canvas.height = Math.round(this.height * this.dpr);
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.createParticles();
    }

    createParticles() {
      const maxCount = this.isMobile ? 48 : 140;
      this.particleCount = Math.max(0, Math.min(maxCount, Math.round(this.particleCount)));
      this.particles = Array.from({ length: this.particleCount }, (_, index) =>
        new Particle(this.width, this.height, this.palette[index % this.palette.length])
      );
    }

    bindEvents() {
      window.addEventListener("resize", () => this.resize(), { passive: true });
      window.addEventListener("pointermove", (event) => {
        if (event.pointerType === "touch") return;
        if (!this.pointerActive) {
          this.smoothMouse.x = event.clientX;
          this.smoothMouse.y = event.clientY;
          this.pointerActive = true;
        }
        this.mouse.x = event.clientX;
        this.mouse.y = event.clientY;
      }, { passive: true });
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          cancelAnimationFrame(this.rafId);
          this.rafId = 0;
          this.ctx.clearRect(0, 0, this.width, this.height);
        } else if (!this.reducedMotion) {
          this.lastFrame = 0;
          this.rafId = requestAnimationFrame((time) => this.animate(time));
        }
      });
      window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener?.("change", (event) => {
        this.reducedMotion = event.matches;
        cancelAnimationFrame(this.rafId);
        if (!this.reducedMotion && !document.hidden) {
          this.lastFrame = 0;
          this.rafId = requestAnimationFrame((time) => this.animate(time));
        } else {
          this.ctx.clearRect(0, 0, this.width, this.height);
        }
      });
    }

    async loadSettings() {
      try {
        const response = await fetch("/content/site.json", { cache: "no-cache" });
        if (!response.ok) return;
        const data = await response.json();
        if (data.settings) this.updateSettings(data.settings);
      } catch (_) {
        // Particle defaults are intentionally self-contained when config is offline.
      }
    }

    updateSettings(settings) {
      const wasVisible = this.visible;
      if (settings.count !== undefined && Number.isFinite(Number(settings.count))) {
        this.particleCount = Number(settings.count);
      } else if (settings.andyCount !== undefined && Number.isFinite(Number(settings.andyCount))) {
        this.particleCount = Number(settings.andyCount);
      }
      const color = settings.color || settings.andyColor;
      if (color && /^#[0-9a-f]{3,8}$/i.test(color)) this.palette = [color];
      if (settings.visible !== undefined || settings.andyVisible !== undefined) {
        this.visible = Boolean(settings.visible ?? settings.andyVisible);
        this.canvas.style.display = this.visible ? "block" : "none";
      }
      this.createParticles();
      if (!this.visible) {
        cancelAnimationFrame(this.rafId);
        this.rafId = 0;
        this.ctx.clearRect(0, 0, this.width, this.height);
      } else if (!wasVisible && !this.reducedMotion && !document.hidden) {
        this.rafId = requestAnimationFrame((time) => this.animate(time));
      }
    }

    animate(time) {
      this.rafId = 0;
      if (document.hidden || this.reducedMotion || !this.visible) return;
      this.rafId = requestAnimationFrame((nextTime) => this.animate(nextTime));
      if (time - this.lastFrame < FRAME_INTERVAL) return;
      this.lastFrame = time;

      const { ctx, width, height } = this;
      ctx.clearRect(0, 0, width, height);
      if (this.pointerActive) {
        this.smoothMouse.x += (this.mouse.x - this.smoothMouse.x) * 0.09;
        this.smoothMouse.y += (this.mouse.y - this.smoothMouse.y) * 0.09;
      }
      const groupedPaths = new Map();
      for (const color of this.palette) groupedPaths.set(color, new Path2D());

      const radiusSquared = this.radius * this.radius;
      for (const particle of this.particles) {
        const dx = this.pointerActive ? particle.x - this.smoothMouse.x : Infinity;
        const dy = this.pointerActive ? particle.y - this.smoothMouse.y : Infinity;
        const distanceSquared = dx * dx + dy * dy;
        if (distanceSquared < radiusSquared && distanceSquared > 1) {
          const distance = Math.sqrt(distanceSquared);
          const force = (1 - distance / this.radius) * 0.085;
          particle.vx += (dx / distance) * force;
          particle.vy += (dy / distance) * force;
        }

        particle.vx *= 0.982;
        particle.vy *= 0.982;
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < -3) particle.x = width + 3;
        else if (particle.x > width + 3) particle.x = -3;
        if (particle.y < -3) particle.y = height + 3;
        else if (particle.y > height + 3) particle.y = -3;
        const path = groupedPaths.get(particle.color);
        if (path) {
          path.moveTo(particle.x + particle.radius, particle.y);
          path.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        }
      }

      ctx.globalAlpha = 0.62;
      for (const [color, path] of groupedPaths) {
        ctx.fillStyle = color;
        ctx.fill(path);
      }
      if (this.pointerActive) {
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(this.smoothMouse.x, this.smoothMouse.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#4c6eff";
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
  }

  const start = () => new ReactiveSwarm();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
