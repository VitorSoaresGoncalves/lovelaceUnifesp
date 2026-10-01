/* =========================================================
   config.js — CARREGAR PRIMEIRO em todas as páginas.
   Tudo que muda (nomes, links, instagrams, membros, apoiadores)
   fica aqui. Edite só este arquivo para atualizar o site inteiro.
   ========================================================= */
(function () {
  var script = document.currentScript;
  var root = new URL('../', script.src).href; // raiz do site, funciona em file:// e hospedado

  window.SITE = {
    root: root,
    url: function (caminho) { return root + caminho; },

    nome: '[Nome do projeto]',
    subtitulo: 'Jornada Ada Lovelace · Unifesp',
    descricaoCurta: 'Projeto de extensão da Unifesp que leva ciência, tecnologia e matemática para meninas de 10 a 12 anos.',

    evento: {
      // Ajuste data e horário da SUA sede (formato ISO com fuso de Brasília)
      data: '2026-10-03T09:30:00-03:00',
      dataTexto: 'Sábado, 3 de outubro de 2026',
      local: '[Local da sede / campus]',
      idadeMin: 10,
      idadeMax: 12
    },

    // Links externos (troque os "#" pelos endereços reais)
    links: {
      ada: '#site-oficial-ada-lovelace',
      unifesp: 'https://www.unifesp.br',
      primos: '#site-numeros-primos-e-criptografia',
      outros: [
        { nome: '[Outro projeto 1]', url: '#' },
        { nome: '[Outro projeto 2]', url: '#' }
      ]
    },

    instagram: [
      { nome: '@[projeto]', url: '#' },
      { nome: '@[ada.lovelace.day]', url: '#' },
      { nome: '@[unifesp]', url: '#' }
    ],

    apoiadores: ['Apoiador 1', 'Apoiador 2', 'Apoiador 3', 'Apoiador 4'],

    membros: [
      { nome: '[Nome Sobrenome]', funcao: 'Coordenação', curso: '[Curso / Departamento]' },
      { nome: '[Nome Sobrenome]', funcao: 'Oficineira', curso: '[Curso]' },
      { nome: '[Nome Sobrenome]', funcao: 'Oficineiro', curso: '[Curso]' },
      { nome: '[Nome Sobrenome]', funcao: 'Comunicação', curso: '[Curso]' },
      { nome: '[Nome Sobrenome]', funcao: 'Oficineira', curso: '[Curso]' },
      { nome: '[Nome Sobrenome]', funcao: 'Design', curso: '[Curso]' },
      { nome: '[Nome Sobrenome]', funcao: 'Oficineiro', curso: '[Curso]' },
      { nome: '[Nome Sobrenome]', funcao: 'Apoio', curso: '[Curso]' }
    ],

    // URL do Google Apps Script publicado (formulário). Vazio = modo demonstração.
    formularioUrl: ''
  };

  // Preenche automaticamente <a data-link="ada|unifesp|primos">
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[data-link]').forEach(function (a) {
      var destino = window.SITE.links[a.dataset.link];
      if (destino) {
        a.href = destino;
        if (/^https?:/.test(destino)) { a.target = '_blank'; a.rel = 'noopener'; }
      }
    });
  });
})();
