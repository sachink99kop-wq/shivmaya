// ===== PARTICLE BACKGROUND =====
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null };
    this.resize();
    this.init();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  init() {
    const count = Math.min(80, Math.floor(window.innerWidth / 18));
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: Math.random() > 0.5 ? '#00d4ff' : '#7b2fff'
      });
    }
    this.animate();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.opacity;
      this.ctx.fill();

      // Draw connections
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = '#00d4ff';
          this.ctx.globalAlpha = (1 - dist / 150) * 0.12;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }

      // Mouse interaction
      if (this.mouse.x !== null) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(this.mouse.x, this.mouse.y);
          this.ctx.strokeStyle = '#00d4ff';
          this.ctx.globalAlpha = (1 - dist / 120) * 0.25;
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();
        }
      }
    });

    this.ctx.globalAlpha = 1;
    requestAnimationFrame(() => this.animate());
  }
}

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', () => {

  // Init particles
  const canvas = document.getElementById('particles-canvas');
  if (canvas) new ParticleSystem(canvas);

  // ===== NAVBAR SCROLL =====
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-glass');
      navbar.classList.remove('py-5');
      navbar.classList.add('py-3');
    } else {
      navbar.classList.remove('navbar-glass');
      navbar.classList.remove('py-3');
      navbar.classList.add('py-5');
    }
  });

  // ===== HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('menu-overlay');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('translate-x-full');
    mobileMenu.classList.toggle('translate-x-0');
    overlay.classList.toggle('active');
  });

  // Close mobile menu on link click
  document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.add('translate-x-full');
      mobileMenu.classList.remove('translate-x-0');
      overlay.classList.remove('active');
    });
  });

  overlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.add('translate-x-full');
    mobileMenu.classList.remove('translate-x-0');
    overlay.classList.remove('active');
  });

  // ===== SCROLL REVEAL =====
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('active');
        }, index * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===== ACTIVE NAV LINK =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (scrollY >= top) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('!text-cyan-400');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('!text-cyan-400');
      }
    });
  });

  // ===== COUNTER ANIMATION =====
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            el.textContent = target + suffix;
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(current) + suffix;
          }
        }, 25);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  // ===== CONTACT FORM =====
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = `<svg class="animate-spin h-5 w-5 mx-auto" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>`;
      btn.disabled = true;

      const formData = new FormData(form);
      formData.append("access_key", "efeeec9a-d5cf-48f6-90af-06fc264c1610");

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });

        const data = await response.json();

        if (data.success) {
          btn.innerHTML = '✓ Message Sent!';
          btn.classList.remove('from-cyan-500', 'to-purple-600');
          btn.classList.add('bg-emerald-500');
          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            btn.classList.add('from-cyan-500', 'to-purple-600');
            btn.classList.remove('bg-emerald-500');
            form.reset();
          }, 2500);
        } else {
          btn.innerHTML = '❌ Error!';
          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
          }, 2500);
        }
      } catch (error) {
        console.error(error);
        btn.innerHTML = '❌ Error!';
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.disabled = false;
        }, 2500);
      }
    });
  }

  // ===== SMOOTH SCROLL FOR ALL ANCHORS =====

  // ===== BACK TO TOP BUTTON =====
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.classList.remove('opacity-0', 'invisible', 'translate-y-10');
        backToTop.classList.add('opacity-100', 'visible', 'translate-y-0');
      } else {
        backToTop.classList.add('opacity-0', 'invisible', 'translate-y-10');
        backToTop.classList.remove('opacity-100', 'visible', 'translate-y-0');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});
