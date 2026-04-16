/* ══════════════════════════════════════════════
   RAHOOL GIR — "BEST PORTFOLIO EVER" 3D ENGINE
   GSAP + Lenis + Three.js Glass Torus Template
   ══════════════════════════════════════════════ */

'use strict';

// ── Loader ──────────────────────────────────────
const loader = document.getElementById('loader');
const loaderFill = document.getElementById('loaderFill');
const loaderText = document.getElementById('loaderText');
let loadProgress = 0;

const loaderInterval = setInterval(() => {
  loadProgress += Math.random() * 15 + 5;
  if (loadProgress > 100) loadProgress = 100;
  
  if (loaderFill) loaderFill.style.width = loadProgress + '%';
  
  if (loadProgress >= 100) {
    clearInterval(loaderInterval);
    setTimeout(() => {
      if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
      }
      initPortfolio();
    }, 400);
  }
}, 80);

function initPortfolio() {
  initLenis();
  initThreeJS();
  initGSAP();
  initCursor();
  initMobileMenu();
}

// ═══════════════════════════════════════
//  SMOOTH SCROLL (LENIS)
// ═══════════════════════════════════════
let lenis;
function initLenis() {
  if (typeof Lenis === 'undefined') return;
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    mouseMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Scroll Progress Bar
  const bar = document.getElementById('scroll-progress');
  if (bar) {
    lenis.on('scroll', (e) => {
      bar.style.transform = `scaleX(${e.progress})`;
    });
  }

  // Smooth inner-links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: -80 });
      }
    });
  });
}

// ═══════════════════════════════════════
//  GSAP AWWWARDS STYLE ANIMATIONS
// ═══════════════════════════════════════
function initGSAP() {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Sync with Lenis
  if (lenis) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  // 1. Text Reveals (Hero & Headers)
  const heroName = document.querySelector('.hero-name');
  if (heroName) {
    gsap.fromTo(heroName, 
      { y: 80, opacity: 0, rotateX: -30 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1.5, ease: "power4.out", delay: 0.2 }
    );
  }

  // Generic reveal class
  document.querySelectorAll('.reveal').forEach(el => {
    gsap.fromTo(el, 
      { y: 60, opacity: 0 },
      { 
        y: 0, opacity: 1, 
        duration: 1.2, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        }
      }
    );
  });

  // 2. Project Card Float In
  document.querySelectorAll('.project-card').forEach((card, i) => {
    gsap.fromTo(card, 
      { y: 100, opacity: 0, scale: 0.95 },
      { 
        y: 0, opacity: 1, scale: 1, 
        duration: 1.2, 
        ease: "expo.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
        }
      }
    );
  });

  // 3. Skill Bars Stagger
  const skillBars = document.querySelectorAll('.sb-fill');
  skillBars.forEach(fill => {
    const width = fill.getAttribute('data-w') || '0';
    gsap.fromTo(fill, 
      { width: "0%" },
      { 
        width: width + '%', 
        duration: 1.8, 
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: fill.parentElement,
          start: "top 95%",
        }
      }
    );
  });

  // 4. Parallax About Hexagon photo
  const hexFrame = document.querySelector('.hex-frame');
  if (hexFrame) {
    gsap.to(hexFrame, {
      y: 50,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }

  // 5. Active Nav state update
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  sections.forEach(section => {
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onToggle: self => {
        if (self.isActive) {
          navLinks.forEach(l => l.classList.remove('active'));
          const act = document.querySelector(`.nav-link[data-section="${section.id}"]`);
          if (act) act.classList.add('active');
        }
      }
    });
  });

  // Typewriter effect in JS instead of CSS if it exists
  const typeEl = document.getElementById('typewriter');
  if (typeEl) {
    const phrases = ['Java & Microservices Expert', 'Senior Software Engineer', 'Full-Stack Developer'];
    let idx = 0; let charIdx = 0; let isDel = false;
    function type() {
      const cur = phrases[idx];
      typeEl.textContent = cur.slice(0, charIdx);
      if(!isDel && charIdx < cur.length) { charIdx++; setTimeout(type, 80); }
      else if(isDel && charIdx > 0) { charIdx--; setTimeout(type, 40); }
      else if(!isDel && charIdx === cur.length) { isDel = true; setTimeout(type, 2000); }
      else if(isDel && charIdx === 0) { isDel = false; idx = (idx+1)%phrases.length; setTimeout(type, 400); }
    }
    setTimeout(type, 1500);
  }
}

// ═══════════════════════════════════════
//  THREE.JS BACKGROUND (AWWWARDS 3D TORUS)
// ═══════════════════════════════════════
function initThreeJS() {
  const canvas = document.getElementById('bg-canvas');
  if (!window.THREE || !canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 25;

  // Modern Viral 3D Element: The Glass Torus Knot
  const geometry = new THREE.TorusKnotGeometry(9, 2.8, 200, 32);
  const material = new THREE.MeshPhysicalMaterial({
    color: 0x6366f1, // indigo accent
    metalness: 0.15,
    roughness: 0.2,
    transmission: 0.9, // glass transmission
    thickness: 1.5,
    wireframe: true,
    transparent: true,
    opacity: 0.07 // very subtle
  });
  const torusKnot = new THREE.Mesh(geometry, material);
  scene.add(torusKnot);

  // Surrounding Particle Dust
  const pggeo = new THREE.BufferGeometry();
  const pts = [];
  for (let i = 0; i < 2000; i++) {
    pts.push(
      (Math.random() - 0.5) * 120,
      (Math.random() - 0.5) * 120,
      (Math.random() - 0.5) * 80 - 20
    );
  }
  pggeo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
  const pmat = new THREE.PointsMaterial({ 
    color: 0xa855f7, 
    size: 0.12, 
    transparent: true, 
    opacity: 0.4,
    blending: THREE.AdditiveBlending 
  });
  const bgParticles = new THREE.Points(pggeo, pmat);
  scene.add(bgParticles);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xffffff, 1.2);
  pointLight.position.set(15, 15, 15);
  scene.add(pointLight);

  // Mouse interact
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.005;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.005;
  });

  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Render loop
  const clock = new THREE.Clock();
  let scrollY = 0;
  window.addEventListener('scroll', () => { scrollY = window.scrollY; });

  function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    // Smooth physics based cursor follow
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    // Fluid Rotation
    torusKnot.rotation.y = time * 0.1 + targetX;
    torusKnot.rotation.x = time * 0.15 + targetY;
    
    // Scroll Parallax mapping
    torusKnot.position.y = -scrollY * 0.008;
    bgParticles.rotation.y = targetX * 0.1;
    bgParticles.position.y = -scrollY * 0.004;

    // Camera micro-movements
    camera.position.x += (targetX * 0.5 - camera.position.x) * 0.02;
    camera.position.y += (-targetY * 0.5 - camera.position.y) * 0.02;

    renderer.render(scene, camera);
  }
  animate();
}

// ═══════════════════════════════════════
//  EMOJI FOLLOWER + MAGNET CURSOR
// ═══════════════════════════════════════
function initCursor() {
  const follower = document.getElementById('emoji-follower');
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  
  let mouse = { x: window.innerWidth/2, y: window.innerHeight/2 };
  let pos = { x: mouse.x, y: mouse.y };
  
  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    if(dot) dot.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`;
  });

  // Physics loop
  function loop() {
    pos.x += (mouse.x - pos.x) * 0.12;
    pos.y += (mouse.y - pos.y) * 0.12;
    if(ring) ring.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    if(follower) follower.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    requestAnimationFrame(loop);
  }
  loop();

  // Highlight/Magnetic effects
  document.querySelectorAll('a, button, .project-card, .btn-primary, .c-tag').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if(ring) ring.classList.add('expanded');
      if(follower) follower.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
      if(ring) ring.classList.remove('expanded');
      if(follower) follower.classList.remove('hovering');
    });
  });

  // Cycle emojis by scroll
  const face = follower ? follower.querySelector('.emoji-face') : null;
  if(face) {
    const emojis = { hero:'👨‍💻', about:'🚀', experience:'🏦', skills:'⚡', projects:'🛠️', education:'🎓', contact:'📬' };
    document.querySelectorAll('section[id]').forEach(sec => {
      ScrollTrigger.create({
        trigger: sec,
        start: "top center",
        onEnter: () => {
          face.style.transform = 'scale(0) rotate(180deg)';
          setTimeout(() => {
            face.textContent = emojis[sec.id] || '✨';
            face.style.transform = 'scale(1) rotate(0deg)';
          }, 200);
        },
        onEnterBack: () => {
          face.style.transform = 'scale(0) rotate(-180deg)';
          setTimeout(() => {
            face.textContent = emojis[sec.id] || '✨';
            face.style.transform = 'scale(1) rotate(0deg)';
          }, 200);
        }
      });
    });

    // Hide idle
    let idleTimer;
    document.addEventListener('mousemove', () => {
      clearTimeout(idleTimer);
      follower.style.opacity = '1';
      idleTimer = setTimeout(() => { follower.style.opacity = '0'; }, 3000);
    });
  }

  // Draw Trail Particles on Canvas
  const tCanvas = document.getElementById('trail-canvas');
  if(!tCanvas) return;
  const ctx = tCanvas.getContext('2d');
  let W = tCanvas.width = window.innerWidth;
  let H = tCanvas.height = window.innerHeight;
  window.addEventListener('resize', () => { W = tCanvas.width = window.innerWidth; H = tCanvas.height = window.innerHeight; });

  const pArr = [];
  const pColors = ['rgba(99,102,241,', 'rgba(168,85,247,', 'rgba(6,182,212,'];
  
  document.addEventListener('mousemove', (e) => {
    for (let i = 0; i < 2; i++) {
      pArr.push({
        x: e.clientX, y: e.clientY,
        vx: (Math.random()-0.5)*2,
        vy: (Math.random()-0.5)*2 - 0.5,
        r: Math.random()*3 + 1,
        life: 1,
        decay: Math.random()*0.02 + 0.015,
        color: pColors[Math.floor(Math.random()*pColors.length)]
      });
    }
  });

  function drawTrail() {
    ctx.clearRect(0, 0, W, H);
    for(let i = pArr.length-1; i>=0; i--) {
      let p = pArr[i];
      p.x += p.vx; p.y += p.vy;
      p.vy += 0.05; // gravity
      p.r *= 0.98; p.life -= p.decay;
      if(p.life<=0 || p.r<0.2) { pArr.splice(i,1); continue; }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = p.color + p.life + ')';
      ctx.fill();
    }
    requestAnimationFrame(drawTrail);
  }
  drawTrail();
}

// ═══════════════════════════════════════
//  MOBILE MENU & LIGHTBOX (UTILITIES)
// ═══════════════════════════════════════
function initMobileMenu() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if(!btn || !menu) return;
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

window.openLightbox = function(src) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  if(img && lb) { img.src = src; lb.classList.add('open'); }
};
window.closeLightbox = function() {
  const lb = document.getElementById('lightbox');
  if(lb) lb.classList.remove('open');
};
document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeLightbox(); });

window.handleContact = function(e) {
  e.preventDefault();
  const btn = document.getElementById('contactSubmitBtn');
  const status = document.getElementById('contactStatus');
  if(!btn || !status) return;
  
  btn.innerHTML = 'Sending...';
  btn.disabled = true;

  setTimeout(() => {
    status.style.display = 'block';
    status.className = 'contact-status success';
    status.textContent = 'Message securely received. Thank you!';
    e.target.reset();
    btn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
    btn.disabled = false;
    setTimeout(() => { status.style.display = 'none'; }, 6000);
  }, 1200);
};
