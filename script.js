/* ==========================================================================
   Hoja de vida web · lógica
   - Dibuja el formato Visual o el formato ATS a partir de js/data.js
   - Cambia de formato (y lo guarda en la URL: #visual / #ats)
   - Filtra proyectos en el formato Visual
   - Descarga el PDF del formato que esté activo
   ========================================================================== */
(function () {
  'use strict';

  var D = window.CV_DATA;
  var cv = document.getElementById('cv');
  var root = document.documentElement;
  var pageStyle = document.getElementById('page-style');
  var pdfLabel = document.getElementById('pdf-label');
  var MODES = ['visual', 'ats'];

  if (!D || !cv) { return; }

  /* ---------- utilidades ---------- */

  // Crea un elemento: h('div', { class: 'x' }, hijo1, [hijo2, hijo3], 'texto')
  function h(tag, attrs) {
    var node = document.createElement(tag);
    var kids = Array.prototype.slice.call(arguments, 2);
    Object.keys(attrs || {}).forEach(function (k) {
      var v = attrs[k];
      if (v === null || v === undefined || v === false) { return; }
      if (k === 'class') { node.className = v; }
      else { node.setAttribute(k, v === true ? '' : v); }
    });
    flatten(kids).forEach(function (kid) {
      if (kid === null || kid === undefined || kid === false) { return; }
      node.appendChild(typeof kid === 'object' ? kid : document.createTextNode(String(kid)));
    });
    return node;
  }

  function flatten(list) {
    return list.reduce(function (acc, item) {
      return acc.concat(Array.isArray(item) ? flatten(item) : [item]);
    }, []);
  }

  var fullName = D.nombre + ' ' + D.apellidos;
  var initials = (D.nombre.charAt(0) + D.apellidos.charAt(0)).toUpperCase();

  function range(item) { return item.inicio + ' – ' + (item.fin || 'Actualidad'); }
  function clean(url) { return String(url).replace(/^https?:\/\//, ''); }
  function webHref(url) { return 'https://' + clean(url); }

  function externalLink(text, url, cls) {
    return h('a', { href: webHref(url), target: '_blank', rel: 'noopener noreferrer', class: cls }, text);
  }

  // Lista de datos de contacto, sin campos vacíos
  function contactItems() {
    var c = D.contacto || {};
    var items = [];
    if (D.ubicacion) { items.push({ text: D.ubicacion }); }
    if (c.email) { items.push({ text: c.email, href: 'mailto:' + c.email }); }
    if (c.telefono) { items.push({ text: c.telefono, href: 'tel:' + c.telefono.replace(/[^\d+]/g, '') }); }
    if (c.github) { items.push({ text: clean(c.github), href: webHref(c.github), ext: true }); }
    if (c.linkedin) { items.push({ text: clean(c.linkedin), href: webHref(c.linkedin), ext: true }); }
    if (c.web) { items.push({ text: clean(c.web), href: webHref(c.web), ext: true }); }
    return items;
  }

  function contactNode(item) {
    if (!item.href) { return item.text; }
    return h('a', item.ext ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' } : { href: item.href }, item.text);
  }

  /* ---------- formato ATS: una columna, texto plano, orden estándar ---------- */

  function renderATS() {
    var contact = [];
    contactItems().forEach(function (item, i) {
      if (i > 0) { contact.push(' | '); }
      contact.push(contactNode(item));
    });

    function section(title) {
      var content = Array.prototype.slice.call(arguments, 1);
      return h('section', { class: 'ats-section' }, h('h2', null, title), content);
    }

    return h('article', { class: 'ats' },
      h('header', null,
        h('h1', null, fullName),
        h('p', { class: 'ats__role' }, D.cargo),
        h('p', { class: 'ats__contact' }, contact)
      ),

      section('Perfil profesional', h('p', null, D.perfil)),

      section('Habilidades técnicas',
        D.habilidades.map(function (g) {
          return h('p', { class: 'ats__skills' }, h('strong', null, g.grupo + ': '), g.items.join(', '));
        })
      ),

      section('Experiencia laboral',
        D.experiencia.map(function (job) {
          return h('div', { class: 'ats-item' },
            h('h3', null, job.cargo + ' – ' + job.empresa),
            h('p', { class: 'ats__meta' }, job.lugar + ' | ' + range(job)),
            h('ul', null, job.logros.map(function (l) { return h('li', null, l); }))
          );
        })
      ),

      section('Proyectos',
        D.proyectos.map(function (p) {
          return h('div', { class: 'ats-item' },
            h('h3', null, p.nombre),
            h('p', null, p.descripcion),
            h('p', { class: 'ats__meta' }, 'Tecnologías: ' + p.tecnologias.join(', ') + (p.enlace ? ' | ' + clean(p.enlace) : ''))
          );
        })
      ),

      section('Educación',
        D.educacion.map(function (e) {
          return h('div', { class: 'ats-item' },
            h('h3', null, e.titulo + ' – ' + e.institucion),
            h('p', { class: 'ats__meta' }, e.lugar + ' | ' + range(e))
          );
        })
      ),

      D.certificaciones.length ? section('Certificaciones',
        h('ul', null, D.certificaciones.map(function (c) {
          return h('li', null, c.nombre + ' – ' + c.entidad + ' (' + c.anio + ')');
        }))
      ) : null,

      section('Idiomas',
        h('ul', null, D.idiomas.map(function (l) { return h('li', null, l.idioma + ': ' + l.nivel); }))
      )
    );
  }

  /* ---------- formato Visual: barra lateral + línea de tiempo ---------- */

  function renderVisual() {
    function railBlock(title) {
      var content = Array.prototype.slice.call(arguments, 1);
      return h('section', { class: 'rail-block' }, h('h2', null, title), content);
    }
    function sec(title) {
      var content = Array.prototype.slice.call(arguments, 1);
      return h('section', { class: 'sec' }, h('h2', null, title), content);
    }

    var avatar = D.foto
      ? h('img', { class: 'avatar', src: D.foto, alt: 'Foto de ' + fullName })
      : h('div', { class: 'avatar', 'aria-hidden': 'true' }, initials);

    var hero = h('header', { class: 'hero' },
      avatar,
      h('div', null,
        h('h1', null, h('span', null, D.nombre), ' ', h('span', null, D.apellidos)),
        h('p', { class: 'hero__role' }, D.cargo)
      )
    );

    var rail = h('aside', { class: 'vis__rail', 'aria-label': 'Contacto, habilidades e idiomas' },
      railBlock('Contacto',
        h('ul', { class: 'contact' }, contactItems().map(function (i) { return h('li', null, contactNode(i)); }))
      ),
      railBlock('Habilidades',
        D.habilidades.map(function (g) {
          return h('div', { class: 'skill-group' },
            h('h3', null, g.grupo),
            h('ul', { class: 'chips' }, g.items.map(function (x) { return h('li', null, x); }))
          );
        })
      ),
      railBlock('Idiomas',
        h('ul', { class: 'plain' }, D.idiomas.map(function (l) {
          return h('li', null, h('strong', null, l.idioma), h('span', null, l.nivel));
        }))
      ),
      D.certificaciones.length ? railBlock('Certificaciones',
        h('ul', { class: 'plain plain--stack' }, D.certificaciones.map(function (c) {
          return h('li', null, h('strong', null, c.nombre), h('span', null, c.entidad + ', ' + c.anio));
        }))
      ) : null
    );

    var categories = [];
    D.proyectos.forEach(function (p) {
      if (p.categoria && categories.indexOf(p.categoria) === -1) { categories.push(p.categoria); }
    });

    var filters = categories.length > 1
      ? h('div', { class: 'filters', role: 'group', 'aria-label': 'Filtrar proyectos' },
          ['Todos'].concat(categories).map(function (cat, i) {
            return h('button', { type: 'button', class: 'filter', 'data-cat': cat, 'aria-pressed': i === 0 ? 'true' : 'false' }, cat);
          }))
      : null;

    var main = h('div', { class: 'vis__main' },
      sec('Perfil', h('p', { class: 'lead' }, D.perfil)),

      sec('Experiencia',
        h('ol', { class: 'timeline' }, D.experiencia.map(function (job) {
          return h('li', { class: 'job' + (job.fin ? '' : ' job--current') },
            h('div', { class: 'job__head' },
              h('h3', null, job.cargo),
              h('p', { class: 'job__dates' }, range(job))
            ),
            h('p', { class: 'job__org' }, job.empresa + ', ' + job.lugar),
            h('ul', null, job.logros.map(function (l) { return h('li', null, l); }))
          );
        }))
      ),

      sec('Proyectos',
        filters,
        h('ul', { class: 'projects' }, D.proyectos.map(function (p) {
          return h('li', { class: 'project', 'data-cat': p.categoria || '' },
            h('h3', null, p.nombre),
            p.enlace ? externalLink(clean(p.enlace), p.enlace, 'project__url') : null,
            h('p', null, p.descripcion),
            h('ul', { class: 'tags' }, p.tecnologias.map(function (t) { return h('li', null, t); }))
          );
        }))
      ),

      sec('Educación',
        D.educacion.map(function (e) {
          return h('div', { class: 'edu' },
            h('h3', null, e.titulo),
            h('p', { class: 'edu__org' }, e.institucion + ', ' + e.lugar),
            h('p', { class: 'edu__dates' }, range(e))
          );
        })
      )
    );

    return h('div', { class: 'vis' }, rail, h('div', { class: 'vis__col' }, hero, main));
  }

  /* ---------- comportamiento del formato Visual ---------- */

  function bindVisual() {
    // Filtros de proyectos
    var filters = cv.querySelector('.filters');
    if (filters) {
      filters.addEventListener('click', function (e) {
        var btn = e.target.closest('.filter');
        if (!btn) { return; }
        var cat = btn.getAttribute('data-cat');
        filters.querySelectorAll('.filter').forEach(function (b) {
          b.setAttribute('aria-pressed', String(b === btn));
        });
        cv.querySelectorAll('.project').forEach(function (p) {
          p.classList.toggle('is-filtered-out', cat !== 'Todos' && p.getAttribute('data-cat') !== cat);
        });
      });
    }

    // La línea de tiempo se dibuja una sola vez, cuando entra en pantalla
    var timeline = cv.querySelector('.timeline');
    if (!timeline) { return; }
    var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if ('IntersectionObserver' in window && !calm) {
      var io = new IntersectionObserver(function (entries) {
        if (entries.some(function (en) { return en.isIntersecting; })) {
          timeline.classList.add('in');
          io.disconnect();
        }
      }, { threshold: 0.1 });
      io.observe(timeline);
    } else {
      timeline.classList.add('in');
    }
  }

  /* ---------- cambio de formato y descarga ---------- */

  function setMode(mode, updateUrl) {
    if (MODES.indexOf(mode) === -1) { mode = 'visual'; }
    root.setAttribute('data-mode', mode);

    cv.replaceChildren(mode === 'ats' ? renderATS() : renderVisual());
    if (mode === 'visual') { bindVisual(); }

    document.querySelectorAll('.switch__btn').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-mode') === mode));
    });
    pdfLabel.textContent = mode === 'ats' ? 'ATS' : 'Visual';

    // Márgenes de impresión según el formato (el visual llega hasta el borde de la hoja)
    pageStyle.textContent = mode === 'ats'
      ? '@page { size: letter; margin: 0.6in 0.65in; }'
      : '@page { size: letter; margin: 0.4in 0; }';

    if (updateUrl !== false) {
      try { history.replaceState(null, '', '#' + mode); } catch (err) { /* abierto como archivo local */ }
    }
  }

  function modeFromHash() {
    var m = location.hash.replace('#', '');
    return MODES.indexOf(m) === -1 ? 'visual' : m;
  }

  function downloadPdf() {
    var original = document.title;
    // El navegador usa el título como nombre del archivo PDF
    document.title = 'CV - ' + fullName + ' (' + root.getAttribute('data-mode').toUpperCase() + ')';
    function restore() {
      document.title = original;
      window.removeEventListener('afterprint', restore);
    }
    window.addEventListener('afterprint', restore);
    window.print();
  }

  document.querySelectorAll('.switch__btn').forEach(function (b) {
    b.addEventListener('click', function () { setMode(b.getAttribute('data-mode')); });
  });
  document.getElementById('btn-pdf').addEventListener('click', downloadPdf);
  window.addEventListener('hashchange', function () {
    var m = modeFromHash();
    if (m !== root.getAttribute('data-mode')) { setMode(m, false); }
  });

  setMode(modeFromHash(), false);
})();
