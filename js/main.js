const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* 1. Fondo animado (3 estilos: Matrix, Binario, Sólido) */
const MODES = [
  { n: 'Matrix',  chars: 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789', c: '#00ff41' },
  { n: 'Binario', chars: '01', c: '#00d4ff' },
  { n: 'Sólido',  chars: null }
];
const cv = $('#matrix'), cx = cv.getContext('2d'), FS = 18;
let mi = 0, raf, drops = [], animate = !reduce;
function size() {
  cv.width = innerWidth;
  cv.height = innerHeight;
  drops = Array.from({ length: Math.floor(cv.width / FS) }, () => Math.random() * cv.height / FS);
}
function draw() {
  const m = MODES[mi];
  cx.fillStyle = 'rgba(2,11,5,.07)';
  cx.fillRect(0, 0, cv.width, cv.height);
  if (!m.chars) return;
  cx.font = FS + 'px monospace';
  drops.forEach((y, i) => {
    const ch = m.chars[Math.floor(Math.random() * m.chars.length)];
    cx.fillStyle = '#d8ffe0';  cx.fillText(ch, i * FS, y * FS);        // cabeza brillante
    cx.fillStyle = m.c;        cx.fillText(ch, i * FS, (y - 1) * FS);  // estela
    if (y * FS > cv.height && Math.random() > .975) drops[i] = 0;
    drops[i]++;
  });
}
function loop() { draw(); raf = requestAnimationFrame(loop); }
function start() {
  cancelAnimationFrame(raf);
  cx.fillStyle = '#020b05'; cx.fillRect(0, 0, cv.width, cv.height);
  if (!MODES[mi].chars) return;
  if (animate) loop(); else for (let i = 0; i < 150; i++) draw();   // sin animación: imagen fija
}
size();
addEventListener('resize', () => { size(); start(); });
start();
const bgBtn = $('#bg');
bgBtn.onclick = () => {
  mi = (mi + 1) % MODES.length;
  animate = true;                       // elegir un fondo es una decisión explícita
  bgBtn.textContent = 'Fondo: ' + MODES[mi].n;
  start();
};

/* 2. Subtítulo que se escribe solo */
const typed = $('#typed'), full = typed.textContent;
const roles = ['Desarrollador de software', 'Estudiante de Ingeniería en Informática', 'Plataformas B2B · Python · Modelado 3D'];
let r = 0, c = 0, del = false;
function type() {
  const w = roles[r];
  typed.textContent = w.slice(0, c);
  if (!del && c === w.length) { del = true; return setTimeout(type, 1400); }
  if (del && c === 0) { del = false; r = (r + 1) % roles.length; }
  c += del ? -1 : 1;
  setTimeout(type, del ? 30 : 70);
}
if (!reduce) type();

/* 3. Filtros de proyectos */
$$('.chip').forEach(b => b.onclick = () => {
  $$('.chip').forEach(x => x.classList.remove('on'));
  b.classList.add('on');
  const f = b.dataset.f;
  $$('.card').forEach(k =>
    k.classList.toggle('hide', f !== 'all' && !k.dataset.tags.split(' ').includes(f)));
});

/* 4. Aparición suave al hacer scroll */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .1 });
$$('main section').forEach(s => { s.classList.add('reveal'); io.observe(s); });

/* 5. Modo ATS y descarga en PDF */
const atsBtn = $('#ats');
function setAts(on) {
  document.body.classList.toggle('ats', on);
  atsBtn.classList.toggle('on', on);
  cancelAnimationFrame(raf);
  if (!on) start();
}
atsBtn.onclick = () => setAts(!document.body.classList.contains('ats'));

let wasAts = false;
addEventListener('beforeprint', () => {   // al imprimir, siempre versión limpia
  wasAts = document.body.classList.contains('ats');
  setAts(true);
  typed.textContent = full;
});
addEventListener('afterprint', () => setAts(wasAts));
$('#pdf').onclick = () => print();
