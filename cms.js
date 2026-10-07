/* =========================================================================
   Fingers Read Space — dynamic areas fed by the partners' content manager
   (touchit-admin.buinho.eu). The page structure stays in this repository;
   only the content of these fixed areas comes from the backoffice:

     [data-cms="models"]       3D model library            (Resources)
     [data-cms="videos"]       video guides of the models   (Resources)
     [data-cms="documents"]    guides, methodology, reports (Resources)
     [data-cms="activities"]   activity reports with photos (Activities)
     [data-partner-logo=key]   partner logos                (Partners)
     .timeline-item[data-from][data-to]  automatic Done / Now / Next

   If the backoffice is unreachable, the original placeholders stay in place.
   ========================================================================= */
(function () {
  'use strict';

  var API = (window.FRS_CMS_API || 'https://touchit-admin.buinho.eu').replace(/\/$/, '');
  var lang = (document.documentElement.lang || 'en').slice(0, 2).toLowerCase();

  var T = {
    en: { download: 'Download', guide: 'Teaching guide', print: 'Print settings', video: 'Watch the video guide',
          subject: 'Subject', age: 'Age', all: 'All', allSchools: 'All schools', by: 'By', files: 'files',
          done: 'Done', now: 'Now', next: 'Next', more: 'Read more', less: 'Show less',
          cat: { guide: 'Teaching guide', methodology: 'Methodology', training: 'Training material',
                 curriculum: 'Curriculum review', report: 'Report', other: 'Document' } },
    pt: { download: 'Descarregar', guide: 'Guia pedagógico', print: 'Parâmetros de impressão', video: 'Ver o guia em vídeo',
          subject: 'Disciplina', age: 'Idade', all: 'Todas', allSchools: 'Todas as escolas', by: 'Por', files: 'ficheiros',
          done: 'Concluído', now: 'A decorrer', next: 'Próximo', more: 'Ler mais', less: 'Mostrar menos',
          cat: { guide: 'Guia pedagógico', methodology: 'Metodologia', training: 'Material de formação',
                 curriculum: 'Revisão curricular', report: 'Relatório', other: 'Documento' } },
    es: { download: 'Descargar', guide: 'Guía didáctica', print: 'Parámetros de impresión', video: 'Ver la guía en vídeo',
          subject: 'Materia', age: 'Edad', all: 'Todas', allSchools: 'Todas las escuelas', by: 'Por', files: 'archivos',
          done: 'Completado', now: 'En curso', next: 'Próximamente', more: 'Leer más', less: 'Mostrar menos',
          cat: { guide: 'Guía didáctica', methodology: 'Metodología', training: 'Material de formación',
                 curriculum: 'Revisión curricular', report: 'Informe', other: 'Documento' } },
    sr: { download: 'Преузми', guide: 'Водич за наставу', print: 'Подешавања штампе', video: 'Погледај видео водич',
          subject: 'Предмет', age: 'Узраст', all: 'Сви', allSchools: 'Све школе', by: 'Аутор', files: 'фајлова',
          done: 'Завршено', now: 'У току', next: 'Следи', more: 'Прочитај више', less: 'Прикажи мање',
          cat: { guide: 'Водич за наставу', methodology: 'Методологија', training: 'Материјал за обуку',
                 curriculum: 'Преглед наставних планова', report: 'Извештај', other: 'Документ' } }
  };
  var t = T[lang] || T.en;

  // ---- helpers -----------------------------------------------------------
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function pick(map) { return (map && (map[lang] || map.en)) || ''; }
  function mb(bytes) { return (bytes / 1048576).toFixed(bytes < 1048576 ? 2 : 1) + ' MB'; }
  function paragraphs(text, host) {
    String(text || '').split(/\n\s*\n/).forEach(function (para) {
      if (para.trim()) host.appendChild(el('p', null, para.trim()));
    });
  }
  function fileLink(f, label) {
    var a = el('a', 'cms-file');
    a.href = f.download;
    a.setAttribute('download', '');
    a.appendChild(el('span', 'cms-file-label', label));
    a.appendChild(el('span', 'cms-file-meta', f.type.toUpperCase() + ' · ' + mb(f.size)));
    return a;
  }
  function fmtDate(iso) {
    if (!iso) return '';
    var d = new Date(iso + 'T12:00:00');
    try { return d.toLocaleDateString(lang === 'sr' ? 'sr-Cyrl' : lang, { day: 'numeric', month: 'long', year: 'numeric' }); }
    catch (e) { return iso; }
  }
  function getJSON(path) {
    return fetch(API + path, { cache: 'no-store', credentials: 'omit' }).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    });
  }
  function collapsible(host, text) {
    var body = el('div', 'cms-body');
    paragraphs(text, body);
    host.appendChild(body);
    if (body.children.length > 1 || String(text).length > 320) {
      body.classList.add('is-clamped');
      var btn = el('button', 'cms-more', t.more);
      btn.type = 'button';
      btn.setAttribute('aria-expanded', 'false');
      btn.addEventListener('click', function () {
        var open = body.classList.toggle('is-clamped') === false;
        btn.textContent = open ? t.less : t.more;
        btn.setAttribute('aria-expanded', String(open));
      });
      host.appendChild(btn);
    }
  }

  // ---- 3D model library -------------------------------------------------
  function modelCard(it) {
    var card = el('article', 'cms-card');
    if (it.images.length) {
      var img = el('img', 'cms-cover');
      img.src = it.images[0].url;
      img.alt = it.images[0].caption || pick(it.title);
      img.loading = 'lazy';
      card.appendChild(img);
    }
    var inner = el('div', 'cms-card-inner');
    var tags = el('p', 'cms-tags');
    if (it.subject) tags.appendChild(el('span', null, it.subject));
    if (it.age_range) tags.appendChild(el('span', null, it.age_range));
    if (tags.children.length) inner.appendChild(tags);
    inner.appendChild(el('h3', null, pick(it.title)));
    inner.appendChild(el('p', 'cms-by', it.partner.name + (it.partner.country ? ' · ' + it.partner.country : '')));
    collapsible(inner, pick(it.body));
    var dl = el('div', 'cms-downloads');
    it.models.forEach(function (f) { dl.appendChild(fileLink(f, t.download + ' ' + (f.name.length > 28 ? f.type.toUpperCase() : f.name))); });
    it.pdfs.forEach(function (f) { dl.appendChild(fileLink(f, t.guide)); });
    inner.appendChild(dl);
    if (it.print_notes) {
      var det = el('details', 'cms-print');
      det.appendChild(el('summary', null, t.print));
      paragraphs(it.print_notes, det);
      inner.appendChild(det);
    }
    if (it.video_url) {
      var v = el('a', 'cms-video-link', t.video + ' →');
      v.href = it.video_url; v.target = '_blank'; v.rel = 'noopener';
      inner.appendChild(v);
    }
    if (it.images.length > 1) {
      var thumbs = el('div', 'cms-thumbs');
      it.images.slice(1).forEach(function (im) {
        var a = el('a'); a.href = im.url; a.target = '_blank'; a.rel = 'noopener';
        var i = el('img'); i.src = im.url; i.alt = im.caption || ''; i.loading = 'lazy';
        a.appendChild(i); thumbs.appendChild(a);
      });
      inner.appendChild(thumbs);
    }
    card.appendChild(inner);
    card.dataset.subject = it.subject || '';
    card.dataset.partner = it.partner.key;
    return card;
  }

  function renderModels(host, items) {
    if (!items.length) return;
    host.innerHTML = '';
    var grid = el('div', 'cms-grid');
    items.forEach(function (it) { grid.appendChild(modelCard(it)); });

    if (items.length > 4) {
      var bar = el('div', 'cms-filters');
      function select(label, values, attr) {
        var lab = el('label', null, label + ' ');
        var s = el('select');
        s.appendChild(new Option(attr === 'partner' ? t.allSchools : t.all, ''));
        values.forEach(function (v) { s.appendChild(new Option(v[1], v[0])); });
        s.dataset.attr = attr;
        lab.appendChild(s);
        bar.appendChild(lab);
        return s;
      }
      var subjects = [], partners = [], seen = {};
      items.forEach(function (it) {
        if (it.subject && !seen['s' + it.subject]) { seen['s' + it.subject] = 1; subjects.push([it.subject, it.subject]); }
        if (!seen['p' + it.partner.key]) { seen['p' + it.partner.key] = 1; partners.push([it.partner.key, it.partner.name]); }
      });
      var s1 = select(t.subject, subjects.sort(), 'subject');
      var s2 = select(t.by, partners, 'partner');
      function apply() {
        Array.prototype.forEach.call(grid.children, function (c) {
          var ok = (!s1.value || c.dataset.subject === s1.value) && (!s2.value || c.dataset.partner === s2.value);
          c.hidden = !ok;
        });
      }
      s1.addEventListener('change', apply); s2.addEventListener('change', apply);
      host.appendChild(bar);
    }
    host.appendChild(grid);
  }

  function renderVideos(host, items) {
    var withVideo = items.filter(function (it) { return it.video_url; });
    if (!withVideo.length) return;
    host.innerHTML = '';
    var list = el('ul', 'cms-list');
    withVideo.forEach(function (it) {
      var li = el('li');
      var a = el('a', null, pick(it.title));
      a.href = it.video_url; a.target = '_blank'; a.rel = 'noopener';
      li.appendChild(a);
      li.appendChild(el('span', 'cms-by', it.partner.name));
      list.appendChild(li);
    });
    host.appendChild(list);
  }

  // ---- documents ---------------------------------------------------------
  function renderDocuments(host, items) {
    if (!items.length) return;
    host.innerHTML = '';
    var list = el('div', 'cms-docs');
    items.forEach(function (it) {
      var row = el('article', 'cms-doc');
      var txt = el('div');
      txt.appendChild(el('p', 'cms-tags', (t.cat[it.category] || t.cat.other)));
      txt.appendChild(el('h3', null, pick(it.title)));
      txt.appendChild(el('p', 'cms-by', it.partner.name));
      collapsible(txt, pick(it.body));
      row.appendChild(txt);
      var dl = el('div', 'cms-downloads');
      it.pdfs.forEach(function (f) { dl.appendChild(fileLink(f, t.download + ' PDF')); });
      row.appendChild(dl);
      list.appendChild(row);
    });
    host.appendChild(list);
  }

  // ---- activity reports --------------------------------------------------
  function renderActivities(host, items) {
    if (!items.length) return;
    var section = host.closest('[data-cms-section]');
    if (section) section.hidden = false;
    host.innerHTML = '';
    items.forEach(function (it) {
      var art = el('article', 'cms-activity');
      var meta = [fmtDate(it.date), it.place, it.partner.name].filter(Boolean).join(' · ');
      art.appendChild(el('p', 'cms-tags', meta));
      art.appendChild(el('h3', null, pick(it.title)));
      collapsible(art, pick(it.body));
      if (it.images.length) {
        var gal = el('div', 'cms-gallery');
        it.images.forEach(function (im) {
          var fig = el('figure');
          var a = el('a'); a.href = im.url; a.target = '_blank'; a.rel = 'noopener';
          var i = el('img'); i.src = im.url; i.alt = im.caption || ''; i.loading = 'lazy';
          a.appendChild(i); fig.appendChild(a);
          if (im.caption) fig.appendChild(el('figcaption', null, im.caption));
          gal.appendChild(fig);
        });
        art.appendChild(gal);
      }
      if (it.pdfs.length) {
        var dl = el('div', 'cms-downloads');
        it.pdfs.forEach(function (f) { dl.appendChild(fileLink(f, f.name.replace(/\.pdf$/i, ''))); });
        art.appendChild(dl);
      }
      host.appendChild(art);
    });
  }

  // ---- partner logos -----------------------------------------------------
  function renderLogos(partners) {
    partners.forEach(function (p) {
      if (!p.logo) return;
      document.querySelectorAll('[data-partner-logo="' + p.key + '"]').forEach(function (slot) {
        slot.innerHTML = '';
        var img = el('img'); img.src = p.logo; img.alt = p.name;
        slot.appendChild(img);
        slot.classList.add('has-logo');
      });
    });
  }

  // ---- timeline status (no backoffice needed) ----------------------------
  function timelineStatus() {
    var now = new Date();
    var ym = now.getFullYear() * 12 + now.getMonth();
    document.querySelectorAll('.timeline-item[data-from][data-to]').forEach(function (item) {
      function v(s) { var p = s.split('-'); return (+p[0]) * 12 + (+p[1] - 1); }
      var a = v(item.dataset.from), b = v(item.dataset.to);
      var state = ym > b ? 'done' : (ym < a ? 'next' : 'now');
      var date = item.querySelector('.timeline-date');
      if (!date || date.querySelector('.tl-status')) return;
      var chip = el('span', 'tl-status ' + state, t[state]);
      date.appendChild(chip);
    });
  }

  // ---- boot ----------------------------------------------------------------
  function boot() {
    timelineStatus();
    var need = {
      models: document.querySelector('[data-cms="models"]'),
      videos: document.querySelector('[data-cms="videos"]'),
      documents: document.querySelector('[data-cms="documents"]'),
      activities: document.querySelector('[data-cms="activities"]')
    };
    if (need.models || need.videos) {
      getJSON('/api/content?kind=model').then(function (items) {
        if (need.models) renderModels(need.models, items);
        if (need.videos) renderVideos(need.videos, items);
      }).catch(function () {});
    }
    if (need.documents) getJSON('/api/content?kind=document').then(function (i) { renderDocuments(need.documents, i); }).catch(function () {});
    if (need.activities) getJSON('/api/content?kind=activity').then(function (i) { renderActivities(need.activities, i); }).catch(function () {});
    if (document.querySelector('[data-partner-logo]')) getJSON('/api/partners').then(renderLogos).catch(function () {});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
