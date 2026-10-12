(function () {
  // Ganti dengan nomor WhatsApp perusahaan (format internasional, tanpa +)
  var WA_NUMBER = '6281234567890';

  document.documentElement.classList.add('js');
  document.getElementById('yr').textContent = new Date().getFullYear();

  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');
  burger.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      menu.classList.remove('open');
      burger.setAttribute('aria-expanded', false);
    }
  });

  // run-of-show: playhead berjalan melalui cue
  var ros = document.getElementById('ros');
  var cues = Array.prototype.slice.call(document.querySelectorAll('#cues .cue'));
  var head = ros.querySelector('.ros__head');
  var idx = 0, timer = null, held = false;
  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function show(i) {
    idx = i;
    cues.forEach(function (c, n) {
      c.classList.toggle('on', n === i);
      c.firstElementChild.setAttribute('aria-pressed', n === i);
    });
    head.style.transform = 'translateX(' + (i * 100) + '%)';
  }
  function play() {
    if (still || timer) return;
    timer = setInterval(function () { if (!held) show((idx + 1) % cues.length); }, 2600);
  }
  cues.forEach(function (c, n) {
    c.firstElementChild.addEventListener('click', function () { show(n); });
  });
  ros.addEventListener('mouseenter', function () { held = true; });
  ros.addEventListener('mouseleave', function () { held = false; });
  ros.addEventListener('focusin', function () { held = true; });
  ros.addEventListener('focusout', function () { held = false; });
  show(0);
  play();

  // reveal saat scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // form -> WhatsApp
  var form = document.getElementById('form');
  var err = document.getElementById('err');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = new FormData(form);
    var nama = (d.get('nama') || '').trim();
    var pesan = (d.get('pesan') || '').trim();
    if (!nama || !pesan) { err.hidden = false; return; }
    err.hidden = true;
    var text = 'Halo Jatranexa.id, saya ' + nama + '.\nLayanan: ' + d.get('layanan') + '\n' + pesan;
    window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
  });
})();
