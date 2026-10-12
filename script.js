(function () {
  // Ganti dengan nomor WhatsApp perusahaan (format internasional, tanpa +)
  var WA_NUMBER = '6281234567890';

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
