/**
 * REPLICA DE ALTA PRECISIÓN: MICROORGANISMOS REACTIVOS (ULTRA-STABLE)
 * Estética: Bacilos Gram, cortos, redondeados y con volumen.
 */

class Particle {
  constructor(color) {
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.vx = (Math.random() - 0.5) * 0.1;
    this.vy = (Math.random() - 0.5) * 0.1;
    this.size = 1.0 + Math.random() * 1.0; // 1-2 pixels
    this.aspect = 1.0; 
    this.color = color;
    this.phase = Math.random() * Math.PI * 2;
    this.pulseSpeed = 0.04 + Math.random() * 0.05;
  }
}

class ReactiveSwarm {
  constructor() {
    this.canvas = document.querySelector('.particle-canvas');
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.className = 'particle-canvas';
      // Insertar al principio para que esté detrás de todo por defecto
      document.body.insertBefore(this.canvas, document.body.firstChild);
    }

    this.ctx = this.canvas.getContext('2d', { alpha: true });
    this.dpr = window.devicePixelRatio || 1;

    this.numParticles = (window.innerWidth < 768) ? 180 : 420; // Default
    this.palette = ["#4169E1", "#526BAF", "#646D7E", "#4B5D8B"]; // Azul Rey a Gris Ratón
    this.isVisible = true;
    
    fetch('/content/site.json?t=' + Date.now())
      .then(r => r.json())
      .then(d => {
         if (d && d.settings) {
             if (d.settings.andyCount !== undefined) this.numParticles = parseInt(d.settings.andyCount);
             if (d.settings.andyColor) this.palette = [d.settings.andyColor];
             if (d.settings.andyVisible !== undefined) this.isVisible = d.settings.andyVisible;
             
             this.canvas.style.display = this.isVisible ? 'block' : 'none';
             this.createParticles();
         }
      })
      .catch(()=>{});
      
    window.updateAndys = (cfg) => {
       if (cfg.count !== undefined) this.numParticles = parseInt(cfg.count);
       if (cfg.color !== undefined) this.palette = [cfg.color];
       if (cfg.visible !== undefined) {
           this.isVisible = cfg.visible;
           this.canvas.style.display = this.isVisible ? 'block' : 'none';
       }
       this.createParticles();
    };

    this.radius = 110; // Reduced repulsion radius (half of 220)
    this.friction = 0.985;

    this.FORCE_A = 1.35;
    this.ALPHA = 0.012;
    this.BETA = 4.8;
    this.swirl = 0.22;

    this.particles = [];
    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.smoothMouse = { ...this.mouse };

    this.setupEventListeners();
    this.resize();
    this.createParticles();
    this.animate();
  }

  resize() {
    this.dpr = window.devicePixelRatio || 1;
    const rect = { width: window.innerWidth, height: window.innerHeight };
    this.canvas.width = rect.width * this.dpr;
    this.canvas.height = rect.height * this.dpr;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push(new Particle(this.palette[i % this.palette.length]));
    }
  }

  setupEventListeners() {
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }

  forceField(dist, R) {
    const nd = dist / R;
    if (nd >= 1) return 0;
    return this.FORCE_A * Math.exp(-this.ALPHA * dist) * (1 - Math.exp(-this.BETA * (1 - nd)));
  }

  animate() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    this.smoothMouse.x += (this.mouse.x - this.smoothMouse.x) * 0.15;
    this.smoothMouse.y += (this.mouse.y - this.smoothMouse.y) * 0.15;

    this.ctx.lineCap = "round";

    const w = window.innerWidth;
    const h = window.innerHeight;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      const dx = p.x - this.smoothMouse.x;
      const dy = p.y - this.smoothMouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const force = this.forceField(dist, this.radius);
      if (force > 0) {
        const nx = dx / (dist || 1);
        const ny = dy / (dist || 1);
        p.vx += nx * force * 2.5;
        p.vy += ny * force * 2.5;
        p.vx += -ny * force * this.swirl * 4.5;
        p.vy += nx * force * this.swirl * 4.5;
      }

      p.vx *= this.friction;
      p.vy *= this.friction;
      p.x += p.vx;
      p.y += p.vy;
      p.phase += p.pulseSpeed;

      if (p.x < -30) p.x = w + 30;
      else if (p.x > w + 30) p.x = -30;
      if (p.y < -30) p.y = h + 30;
      else if (p.y > h + 30) p.y = -30;

      const pulse = 1 + Math.sin(p.phase) * 0.15;
      const angle = Math.atan2(p.vy, p.vx);
      const size = p.size * pulse;

      // DIBUJO DE PARTÍCULAS: Círculos simples de 1-2px
      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(0, 0, size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    if (this.smoothMouse.x > 0) {
      this.ctx.globalCompositeOperation = "source-over";
      this.ctx.beginPath();
      this.ctx.arc(this.smoothMouse.x, this.smoothMouse.y, 4, 0, Math.PI * 2);
      this.ctx.fillStyle = "#4c6eff";
      this.ctx.fill();
    }

    requestAnimationFrame(() => this.animate());
  }
}

// Inicialización segura
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new ReactiveSwarm());
} else {
  new ReactiveSwarm();
}