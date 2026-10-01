/* <carrossel-membros titulo="..." texto="..."></carrossel-membros> */
(function () {
  var S = window.SITE;
  var cores = ['roxo', 'vermelho', 'azul', 'verde', 'amarelo'];
  var seta = function (d) {
    return '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + (d < 0 ? 'm15 5-7 7 7 7' : 'm9 5 7 7-7 7') + '"/></svg>';
  };

  class CarrosselMembros extends HTMLElement {
    connectedCallback() {
      var titulo = this.getAttribute('titulo') || 'Quem faz acontecer';
      var texto = this.getAttribute('texto') || '';
      var cards = S.membros.map(function (m, i) {
        var cor = cores[i % cores.length];
        return '<li class="membro">' +
          '<div class="imagem-ph imagem-ph--' + cor + ' membro__foto" style="--ratio:4/5" role="img" aria-label="Espaço para foto de ' + m.nome + '">Foto · 4:5<small>retrato</small></div>' +
          '<h3>' + m.nome + '</h3><p class="membro__funcao">' + m.funcao + '</p><p class="membro__curso">' + m.curso + '</p></li>';
      }).join('');

      this.innerHTML =
        '<section class="secao secao--creme carrossel" aria-roledescription="carrossel" aria-label="' + titulo + '">' +
          '<div class="container carrossel__topo">' +
            '<div><h2>' + titulo + '</h2>' + (texto ? '<p class="lead">' + texto + '</p>' : '') + '</div>' +
            '<div class="carrossel__controles">' +
              '<button type="button" class="carrossel__btn" data-dir="-1" aria-label="Membros anteriores">' + seta(-1) + '</button>' +
              '<button type="button" class="carrossel__btn" data-dir="1" aria-label="Próximos membros">' + seta(1) + '</button>' +
            '</div>' +
          '</div>' +
          '<ul class="carrossel__faixa" tabindex="0" aria-label="Lista de membros">' + cards + '</ul>' +
        '</section>';

      var faixa = this.querySelector('.carrossel__faixa');
      this.querySelectorAll('.carrossel__btn').forEach(function (b) {
        b.addEventListener('click', function () {
          var card = faixa.querySelector('.membro');
          var passo = (card ? card.offsetWidth : 260) + 28;
          faixa.scrollBy({ left: passo * Number(b.dataset.dir), behavior: 'smooth' });
        });
      });
    }
  }
  customElements.define('carrossel-membros', CarrosselMembros);
})();
