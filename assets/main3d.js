/* ══════════════════════════════════════════════
   RAHOOL GIR — 3D PORTFOLIO JAVASCRIPT
   Three.js Particle Field + All Interactions
   ══════════════════════════════════════════════ */

'use strict';

// ── Loader ──────────────────────────────────────
const loader     = document.getElementById('loader');
const loaderFill = document.getElementById('loaderFill');
const loaderText = document.getElementById('loaderText');
const loaderMsgs = [
  'Initializing systems...',
  'Loading 3D engine...',
  'Building portfolio...',
  'Rendering experience...',
  'Almost ready...'
];
let loadProgress = 0;
let loaderMsgIdx = 0;

const loaderInterval = setInterval(() => {
  loadProgress += Math.random() * 18 + 8;
  if (loadProgress > 100) loadProgress = 100;
  loaderFill.style.width = loadProgress + '%';
  if (loaderMsgIdx < loaderMsgs.length - 1 && loadProgress > (loaderMsgIdx + 1) * 20) {
    loaderMsgIdx++;
    loaderText.textContent = loaderMsgs[loaderMsgIdx];
  }
  if (loadProgress >= 100) {
    clearInterval(loaderInterval);
    setTimeout(() => {
      loader.classList.add('hidden');
      startPortfolio();
    }, 400);
  }
}, 120);

// ── Helpers ──────────────────────────────────────
function $(sel) { return document.querySelector(sel); }
function $$(sel) { return [...document.querySelectorAll(sel)]; }

// ── Main Init ─────────────────────────────────────
function startPortfolio() {
  initThreeJS();
  initCursor();
  initNavbar();
  initMobileMenu();
  initTypewriter();
  initScrollProgress();
  initRevealOnScroll();
  initSkillBars();
  initGlowCards();
  initNavHighlight();
  initEmojiFollower();
  initParticleTrail();
}

// ═══════════════════════════════════════
//  THREE.JS 3D PARTICLE FIELD
// ═══════════════════════════════════════
function initThreeJS() {
  const canvas = document.getElementById('bg-canvas');
  if (!window.THREE) { canvas.style.display = 'none'; return; }

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 30;

  // ─ Particle stars ─
  const N = 3000;
  const positions = new Float32Array(N * 3);
  const colors    = new Float32Array(N * 3);
  const clrOptions = [
    [0.388, 0.4,   0.945],  // accent #6366f1
    [0.659, 0.333, 0.969],  // accent2 #a855f7
    [0.024, 0.714, 0.831],  // cyan
    [1, 1, 1],               // white
  ];
  for (let i = 0; i < N; i++) {
    positions[i*3]   = (Math.random() - 0.5) * 200;
    positions[i*3+1] = (Math.random() - 0.5) * 200;
    positions[i*3+2] = (Math.random() - 0.5) * 100;
    const c = clrOptions[Math.floor(Math.random() * clrOptions.length)];
    colors[i*3]   = c[0];
    colors[i*3+1] = c[1];
    colors[i*3+2] = c[2];
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const mat = new THREE.PointsMaterial({
    size: 0.18,
    vertexColors: true,
    transparent: true,
    opacity: 0.65,
    sizeAttenuation: true
  });
  const particles = new THREE.Points(geo, mat);
  scene.add(particles);

  // ─ Wireframe sphere ─
  const sphereGeo = new THREE.IcosahedronGeometry(12, 1);
  const sphereMat = new THREE.MeshBasicMaterial({
    color: 0x6366f1,
    wireframe: true,
    transparent: true,
    opacity: 0.06
  });
  const spGeom2 = new THREE.IcosahedronGeometry(18, 1);
  const spMat2  = new THREE.MeshBasicMaterial({
    color: 0xa855f7,
    wireframe: true,
    transparent: true,
    opacity: 0.04
  });
  const sphere  = new THREE.Mesh(sphereGeo, sphereMat);
  const sphere2 = new THREE.Mesh(spGeom2, spMat2);
  sphere.position.set(18, -5, -15);
  sphere2.position.set(-22, 8, -20);
  scene.add(sphere);
  scene.add(sphere2);

  // ─ Mouse tracking ─
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // ─ Resize ─
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  // ─ Animate ─
  let scrollY = 0;
  window.addEventListener('scroll', () => { scrollY = window.scrollY; });

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    particles.rotation.y = t * 0.015 + mouseX * 0.05;
    particles.rotation.x = mouseY * 0.03 + scrollY * 0.0001;

    sphere.rotation.x = t * 0.12;
    sphere.rotation.y = t * 0.08;
    sphere2.rotation.x = -t * 0.08;
    sphere2.rotation.y = t * 0.12;

    camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.02;
    camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.02;

    renderer.render(scene, camera);
  }
  animate();
}

// ═══════════════════════════════════════
//  CUSTOM CURSOR
// ═══════════════════════════════════════
function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let dx = 0, dy = 0;
  let rx = 0, ry = 0;

  document.addEventListener('mousemove', (e) => {
    dx = e.clientX; dy = e.clientY;
    dot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
  });

  (function animRing() {
    rx += (dx - rx) * 0.12;
    ry += (dy - ry) * 0.12;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(animRing);
  })();

  // Hover effects
  document.querySelectorAll('a, button, .glow-card, .project-card, .c-tag, .about-card').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('expanded'));
    el.addEventListener('mouseleave', () => ring.classList.remove('expanded'));
  });
}

// ═══════════════════════════════════════
//  NAVBAR
// ═══════════════════════════════════════
function initNavbar() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// ═══════════════════════════════════════
//  MOBILE MENU
// ═══════════════════════════════════════
function initMobileMenu() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('open');
    btn.classList.toggle('open');
  });

  menu.querySelectorAll('.mob-link').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
    });
  });
}

// ═══════════════════════════════════════
//  TYPEWRITER
// ═══════════════════════════════════════
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrases = [
    'Senior Software Engineer',
    'Java & Microservices Expert',
    'Core Banking Developer',
    'Full-Stack Engineer',
    'Vue.js + React Developer',
    'AI Application Builder',
  ];

  let phraseIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const current = phrases[phraseIdx];
    if (deleting) {
      el.textContent = current.slice(0, --charIdx);
    } else {
      el.textContent = current.slice(0, ++charIdx);
    }

    let delay = deleting ? 40 : 90;
    if (!deleting && charIdx === current.length) {
      delay = 2200;
      deleting = true;
    } else if (deleting && charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = 400;
    }
    setTimeout(type, delay);
  }
  setTimeout(type, 600);
}

// ═══════════════════════════════════════
//  SCROLL PROGRESS
// ═══════════════════════════════════════
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (window.scrollY / max * 100) + '%';
  }, { passive: true });
}

// ═══════════════════════════════════════
//  REVEAL ON SCROLL
// ═══════════════════════════════════════
function initRevealOnScroll() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => io.observe(el));
}

// ═══════════════════════════════════════
//  SKILL BARS
// ═══════════════════════════════════════
function initSkillBars() {
  const fills = document.querySelectorAll('.sb-fill');
  if (!fills.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const w = e.target.dataset.w;
        e.target.style.width = w + '%';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(f => io.observe(f));
}

// ═══════════════════════════════════════
//  GLOW CARDS (Mouse tracking)
// ═══════════════════════════════════════
function initGlowCards() {
  document.querySelectorAll('.glow-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
      const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
  });
}

// ═══════════════════════════════════════
//  NAV ACTIVE HIGHLIGHT
// ═══════════════════════════════════════
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[data-section="${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => io.observe(s));
}

// ═══════════════════════════════════════
//  CONTACT FORM
// ═══════════════════════════════════════
window.handleContact = function(e) {
  e.preventDefault();
  const btn    = document.getElementById('contactSubmitBtn');
  const status = document.getElementById('contactStatus');
  const name   = document.getElementById('c-name').value.trim();
  const email  = document.getElementById('c-email').value.trim();

  btn.textContent = 'Sending...';
  btn.disabled = true;

  setTimeout(() => {
    status.className = 'contact-status success';
    status.textContent = `Thanks ${name}! Your message has been received. I'll get back to you at ${email} soon.`;
    e.target.reset();
    btn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
    btn.disabled = false;
    setTimeout(() => { status.style.display = 'none'; }, 6000);
  }, 1200);
};

// ═══════════════════════════════════════
//  LIGHTBOX
// ═══════════════════════════════════════
window.openLightbox = function(src) {
  const lb  = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  img.src = src;
  lb.classList.add('open');
};
window.closeLightbox = function() {
  document.getElementById('lightbox').classList.remove('open');
};
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') window.closeLightbox();
});

// ═══════════════════════════════════════
//  AVATAR 3D TILT
// ═══════════════════════════════════════
const avatarScene = document.getElementById('avatarScene');
if (avatarScene) {
  document.addEventListener('mousemove', (e) => {
    const rx = (0.5 - e.clientY / window.innerHeight) * 16;
    const ry = (e.clientX / window.innerWidth - 0.5) * 16;
    avatarScene.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  document.addEventListener('mouseleave', () => {
    avatarScene.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
  });
}

// ═══════════════════════════════════════
//  SMOOTH SCROLL FOR NAV LINKS
// ═══════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ═══════════════════════════════════════
//  COUNTER ANIMATION (stat numbers)
// ═══════════════════════════════════════
function animateCounters() {
  const els = document.querySelectorAll('.stat-n[data-count]');
  els.forEach(el => {
    const target = parseInt(el.dataset.count);
    let current = 0;
    const step  = target / 40;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.round(current);
    }, 35);
  });
}

// Run counters when hero is visible
const heroEl = document.getElementById('hero');
if (heroEl) {
  const heroIO = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      heroIO.disconnect();
    }
  }, { threshold: 0.3 });
  heroIO.observe(heroEl);
}

// ═══════════════════════════════════════
//  EMOJI CURSOR FOLLOWER
// ═══════════════════════════════════════
function initEmojiFollower() {
  const follower = document.getElementById('emoji-follower');
  const face     = follower ? follower.querySelector('.emoji-face') : null;
  if (!follower || !face) return;

  // Emojis that cycle based on section
  const sectionEmojis = {
    hero:       '👨‍💻',
    about:      '🚀',
    experience: '🏦',
    skills:     '⚡',
    projects:   '🛠️',
    education:  '🎓',
    contact:    '📬',
  };

  let ex = window.innerWidth  / 2;
  let ey = window.innerHeight / 2;
  let cx = ex, cy = ey;
  let isHidden  = false;
  let isHovering = false;

  // Smooth lag follow
  function animFollow() {
    cx += (ex - cx) * 0.08;
    cy += (ey - cy) * 0.08;
    follower.style.left = cx + 'px';
    follower.style.top  = cy + 'px';
    requestAnimationFrame(animFollow);
  }
  animFollow();

  document.addEventListener('mousemove', (e) => {
    ex = e.clientX;
    ey = e.clientY;
    if (isHidden) {
      follower.style.opacity = '1';
      follower.style.transform = 'translate(-50%,-50%) scale(1)';
      isHidden = false;
    }
  });

  // Hide when off-screen or idle
  let idleTimer;
  document.addEventListener('mousemove', () => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      follower.style.opacity    = '0';
      follower.style.transform  = 'translate(-50%,-50%) scale(0.6)';
      isHidden = true;
    }, 3000);
  });

  // Hover effect: bounce + grow
  const interactEls = 'a, button, .project-card, .glow-card, .about-card, .cert-card, .c-tag';
  document.querySelectorAll(interactEls).forEach(el => {
    el.addEventListener('mouseenter', () => {
      follower.classList.add('hovering');
      isHovering = true;
    });
    el.addEventListener('mouseleave', () => {
      follower.classList.remove('hovering');
      isHovering = false;
    });
  });

  // Scroll: swap emoji by section
  const sections = document.querySelectorAll('section[id]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const emoji = sectionEmojis[e.target.id] || '👨‍💻';
        // Animate swap
        face.style.transform  = 'scale(0) rotate(180deg)';
        face.style.opacity    = '0';
        setTimeout(() => {
          face.textContent      = emoji;
          face.style.transform  = 'scale(1) rotate(0deg)';
          face.style.opacity    = '1';
        }, 200);
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => io.observe(s));

  // Style face transition
  face.style.transition = 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease';
  follower.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
}

// ═══════════════════════════════════════
//  PARTICLE TRAIL (Canvas sparkles)
// ═══════════════════════════════════════
function initParticleTrail() {
  const canvas = document.getElementById('trail-canvas');
  if (!canvas) return;

  const ctx  = canvas.getContext('2d');
  let W = canvas.width  = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });

  const particles = [];
  const colors = [
    'rgba(99,102,241,',   // indigo
    'rgba(168,85,247,',   // purple
    'rgba(6,182,212,',    // cyan
    'rgba(16,185,129,',   // green
    'rgba(255,255,255,',  // white
  ];

  let mouseX = W / 2, mouseY = H / 2;
  let isMoving = false, moveTimer;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMoving = true;
    clearTimeout(moveTimer);
    moveTimer = setTimeout(() => { isMoving = false; }, 100);

    // Spawn particles on move
    for (let i = 0; i < 3; i++) {
      particles.push({
        x:    mouseX + (Math.random() - 0.5) * 10,
        y:    mouseY + (Math.random() - 0.5) * 10,
        vx:   (Math.random() - 0.5) * 2.5,
        vy:   (Math.random() - 0.5) * 2.5 - 1,
        r:    Math.random() * 4 + 1.5,
        life: 1,
        decay: Math.random() * 0.025 + 0.015,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: Math.random() > 0.6 ? 'star' : 'circle',
      });
    }
  });

  function drawStar(ctx, x, y, r, opacity, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
      const px = Math.cos(angle) * r;
      const py = Math.sin(angle) * r;
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = color + opacity + ')';
    ctx.fill();
    ctx.restore();
  }

  function drawFrame() {
    ctx.clearRect(0, 0, W, H);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x    += p.vx;
      p.y    += p.vy;
      p.vy   += 0.06; // gravity
      p.r    *= 0.97;
      p.life -= p.decay;

      if (p.life <= 0 || p.r < 0.3) { particles.splice(i, 1); continue; }

      ctx.save();
      ctx.globalAlpha = p.life;
      if (p.shape === 'star') {
        drawStar(ctx, p.x, p.y, p.r, p.life, p.color);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.life + ')';
        ctx.fill();
      }
      // Tiny glow
      ctx.shadowBlur  = 8;
      ctx.shadowColor = p.color + '0.8)';
      ctx.restore();
    }

    requestAnimationFrame(drawFrame);
  }
  drawFrame();
}
