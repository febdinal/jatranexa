(function () {
  // Ganti dengan nomor WhatsApp perusahaan (format internasional, tanpa +)
  var WA_NUMBER = '6281234567890';

  document.getElementById('yr').textContent = new Date().getFullYear();

  // reveal saat scroll
  document.documentElement.classList.add('js');
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.1 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

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

  // filter layanan
  var tabs = document.querySelectorAll('.tabs button');
  var cards = document.querySelectorAll('#cards .card');
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      var f = t.getAttribute('data-f');
      tabs.forEach(function (x) {
        x.classList.toggle('on', x === t);
        x.setAttribute('aria-selected', x === t);
      });
      cards.forEach(function (c) { c.hidden = f !== 'all' && c.getAttribute('data-cat') !== f; });
    });
  });

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
