/* <site-footer></site-footer> — rodapé compartilhado: apoiadores, instagrams e links */
(function () {
  var S = window.SITE;
  class SiteFooter extends HTMLElement {
    connectedCallback() {
      var apoio = S.apoiadores.map(function (n) {
        return '<li><span class="logo-ph rodape__apoio" role="img" aria-label="Espaço para logo: ' + n + '">LOGO<br>' + n + '</span></li>';
      }).join('');
      var insta = S.instagram.map(function (i) {
        return '<li><a href="' + i.url + '" target="_blank" rel="noopener">' + i.nome + '</a></li>';
      }).join('');
      var nav = [
        ['Início', 'index.html'], ['Inscrição', 'pages/formulario.html'], ['Quem somos', 'pages/quem-somos.html'],
        ['Mulheres na STEM', 'pages/mulheres-na-stem.html'], ['Unifesp e Primos', 'pages/unifesp.html']
      ].map(function (p) { return '<li><a href="' + S.url(p[1]) + '">' + p[0] + '</a></li>'; }).join('');
      var ext =
        '<li><a href="' + S.links.ada + '" target="_blank" rel="noopener">Site oficial Ada Lovelace Day ↗</a></li>' +
        '<li><a href="' + S.links.unifesp + '" target="_blank" rel="noopener">Unifesp ↗</a></li>' +
        '<li><a href="' + S.links.primos + '" target="_blank" rel="noopener">Números Primos e Criptografia ↗</a></li>' +
        S.links.outros.map(function (o) { return '<li><a href="' + o.url + '" target="_blank" rel="noopener">' + o.nome + ' ↗</a></li>'; }).join('');

      this.innerHTML =
        '<footer class="rodape"><div class="faixa-cores" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>' +
        '<div class="container"><div class="rodape__grid">' +
          '<div class="rodape__marca">' +
            '<div class="rodape__logos"><span class="logo-ph" aria-hidden="true">LOGO<br>UNIFESP</span><span class="logo-ph" aria-hidden="true">LOGO<br>ADA</span></div>' +
            '<strong>' + S.nome + '</strong><p>' + S.descricaoCurta + '</p>' +
            '<h3>Instagram</h3><ul class="rodape__lista">' + insta + '</ul>' +
          '</div>' +
          '<div><h3>Apoiadores</h3><ul class="rodape__apoiadores">' + apoio + '</ul></div>' +
          '<div><h3>Páginas</h3><ul class="rodape__lista">' + nav + '</ul></div>' +
          '<div><h3>Links</h3><ul class="rodape__lista">' + ext + '</ul></div>' +
        '</div>' +
        '<div class="rodape__base"><span>© ' + new Date().getFullYear() + ' ' + S.nome + '</span><span>Evento realizado dentro da Jornada Latino-Americana de Oficinas STEM Ada Lovelace Day.</span></div>' +
        '</div></footer>';
    }
  }
  customElements.define('site-footer', SiteFooter);
})();
