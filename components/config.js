
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
      data: '2026-10-03T08:00:00-03:00',   // início = credenciamento
      dataTexto: 'Sábado, 3 de outubro de 2026',
      local: '[Local da sede / campus]',
      idadeMin: 10,
      idadeMax: 12
    },

    // Cronograma previsto (horários 24h, "HH:MM"). cor: roxo | vermelho | amarelo | verde | azul | neutro
    cronograma: [
      { inicio: '08:00', fim: '08:30', titulo: 'Credenciamento e recepção das participantes', cor: 'roxo' },
      { inicio: '08:30', fim: '09:00', titulo: 'Abertura do evento', cor: 'vermelho' },
      { inicio: '09:00', fim: '09:30', titulo: 'Palestra', cor: 'amarelo' },
      { inicio: '09:30', fim: '10:45', titulo: 'Oficina STEM 1', cor: 'verde' },
      { inicio: '10:45', fim: '11:15', titulo: 'Intervalo para lanche', cor: 'neutro' },
      { inicio: '11:15', fim: '12:30', titulo: 'Oficina STEM 2', cor: 'azul' },
      { inicio: '12:30', fim: '13:00', titulo: 'Discussão sobre as atividades e encerramento', cor: 'roxo' }
    ],

    // Links externos (troque os "#" pelos endereços reais)
    links: {
      ada: 'https://adalovelace.net.ar',
      unifesp: 'https://portal.unifesp.br',
      primos: 'https://numeros-primos-theta.vercel.app',
    },

    instagram: [
      { nome: '@numeros primos e criptografia', url: 'https://www.instagram.com/numerosprimos_cripto/' },
      { nome: '@ada.lovelace.day', url: 'https://www.instagram.com/jornadasada/' },
      { nome: '@ada.lovelace.unifesp', url: 'https://www.instagram.com/adalovelace.unifesp/' },
      { nome: '@unifesp', url: 'https://www.instagram.com/unifespoficial/' }
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