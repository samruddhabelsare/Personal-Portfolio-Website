/* ==============================
   CUSTOM CURSOR
============================== */
const cursorDot = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');

document.addEventListener('mousemove', (e) => {
  cursorDot.style.left = e.clientX + 'px';
  cursorDot.style.top = e.clientY + 'px';
  setTimeout(() => {
    cursorRing.style.left = e.clientX + 'px';
    cursorRing.style.top = e.clientY + 'px';
  }, 50);
});

document.querySelectorAll('a, button, input, textarea, .filter-btn').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('cursor-active'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('cursor-active'));
});

/* ==============================
   TYPEWRITER UTILITY
============================== */
async function typeWriter(elementId, lines, speed = 60, keepCursor = false) {
  const element = document.getElementById(elementId);
  element.innerHTML = '';

  for (let i = 0; i < lines.length; i++) {
    let lineDiv = document.createElement('div');
    element.appendChild(lineDiv);

    let lineText = lines[i];
    let printedText = '';

    for (let char of lineText) {
      if (char === ' ' && !lineText.includes('>')) {
        printedText += '&nbsp;';
      } else {
        printedText += char;
      }
      lineDiv.innerHTML = printedText + '<span class="blink-cursor">|</span>';
      await new Promise(r => setTimeout(r, speed));
    }

    if (i !== lines.length - 1 || !keepCursor) {
      lineDiv.innerHTML = printedText;
    }
  }
}

/* ==============================
   BOOT SCREEN SEQUENCE
============================== */
const bootLines = [
  "> INITIALIZING SYSTEM...",
  "> LOADING PORTFOLIO.EXE...",
  "> CONNECTING TO PORTFOLIO SERVER...",
  "> STATUS: ALL SYSTEMS OPERATIONAL",
  "> WELCOME, RECRUITERS AND VISITORS."
];

const heroLines = [
  "> NAME: Samruddha Belsare",
  "> ROLE: Aspiring Full Stack Developer | AI & ML Enthusiast ",
  "> SPEC: AI & Chatbot Builder | Web Developer",
  "> STATUS: Open to Internships | Hackathon | PROJECTS",
  "> SKILL: Building intelligent systems | Chatbots & real-world web apps."
];

window.addEventListener('load', async () => {
  await typeWriter('boot-terminal', bootLines, 60, false);
  await new Promise(r => setTimeout(r, 700));

  const bootScreen = document.getElementById('boot-screen');
  bootScreen.style.opacity = '0';

  setTimeout(() => {
    bootScreen.style.pointerEvents = 'none';
    bootScreen.style.display = 'none';

    typeWriter('hero-terminal', heroLines, 40, true).then(() => {
      document.getElementById('hero-ctas').style.opacity = '1';
    });
  }, 600);

  initCodeRain();
});

/* ==============================
   CODE RAIN (holo-core canvas)
============================== */
function initCodeRain() {
  const canvas = document.getElementById('codeRainCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const SIZE = 160;
  canvas.width = SIZE;
  canvas.height = SIZE;

  const chars = 'アイウエオカキクケコサシスセソ01ハヒフヘホABCDF{}[];$<>'.split('');
  const fontSize = 9;
  const cols = Math.floor(SIZE / fontSize);
  const drops = Array(cols).fill(1);
  const colors = ['#00FFFF', '#00FFFF', '#00FFFF', '#BF5FFF'];

  function drawRain() {
    ctx.fillStyle = 'rgba(5, 5, 8, 0.18)';
    ctx.fillRect(0, 0, SIZE, SIZE);

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
      ctx.font = fontSize + 'px Share Tech Mono, monospace';
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > SIZE && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(drawRain, 60);
}

/* ==============================
   NAVIGATION & SCROLL
============================== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* Mobile Menu */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenu = document.getElementById('close-menu');
const mobileLinks = mobileMenu.querySelectorAll('a');

hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
closeMenu.addEventListener('click', () => mobileMenu.classList.remove('open'));
mobileLinks.forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* Active Nav Link Highlighting */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const sectionTop = sec.offsetTop;
    const sectionHeight = sec.clientHeight;
    if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) {
      a.classList.add('active');
    }
  });
});

/* ==============================
   SCROLL ANIMATIONS
============================== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.scroll-anim').forEach(el => observer.observe(el));

/* ==============================
   PROJECTS FILTER
============================== */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    projectCards.forEach(card => {
      if (filter === 'ALL' || card.getAttribute('data-tag') === filter) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

/* ==============================
   CONTACT FORM SUBMIT
============================== */
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const msgEl = document.getElementById('formMessage');
  msgEl.style.display = 'block';
  e.target.reset();
  setTimeout(() => { msgEl.style.display = 'none'; }, 5000);
});
