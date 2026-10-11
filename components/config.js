
(function () {
  var script = document.currentScript;
  var root = new URL('../', script.src).href; // raiz do site, funciona em file:// e hospedado

  window.SITE = {
    root: root,
    url: function (caminho) { return root + caminho; },

    nome: 'STEM para meninas',
    subtitulo: 'Jornada Ada Lovelace · Unifesp',
    descricaoCurta: 'Projeto de extensão da Unifesp que leva ciência, tecnologia e matemática para meninas de 10 a 12 anos.',

    evento: {
      // Ajuste data e horário da SUA sede (formato ISO com fuso de Brasília)
      data: '2026-11-07T08:00:00-03:00',   // início = credenciamento
      // Para mudar a data: altere data, dataTexto, dataCurta e diaSemana.
      dataTexto: 'Sábado, 7 de novembro de 2026',
      dataCurta: '7 de novembro',
      diaSemana: 'sábado',
      horario: 'das 8h às 13h',
      local: 'MIC - Museu Interativo de Ciências',
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
      { nome: '@numerosprimos_cripto', url: 'https://www.instagram.com/numerosprimos_cripto/' },
      { nome: '@jornadasada', url: 'https://www.instagram.com/jornadasada/' },
      { nome: '@adalovelace.unifesp', url: 'https://www.instagram.com/adalovelace.unifesp/' },
      { nome: '@unifesp', url: 'https://www.instagram.com/unifespoficial/' }
    ],

     logos: {
      unifesp: { nome: 'Unifesp', img: 'images/logo-unifesp.png', link: 'https://portal.unifesp.br' },
      unifespBranco: { nome: 'Unifesp', img: 'images/logo-unifesp-branco.png', link: 'https://portal.unifesp.br' },
      adaBranco: { nome: 'Ada Lovelace Day', img: 'images/logo-ada-branco.png', link: 'https://adalovelace.net.ar' },            
      ada: {nome: 'Ada Lovelace Day', img: 'images/logo-ada.png', link: 'https://adalovelace.net.ar'}          
    },

    // APOIADORES (rodapé): nome, img e url do site oficial
    apoiadores: [
      { nome: 'IMPA', img: 'images/logo-impa.png', url: 'https://impa.br/' },
      { nome: 'FGV EMAp', img: 'images/logo-fgv.png', url: 'https://emap.fgv.br/' },
      { nome: 'SBMAC', img: 'images/logo-sbmac.png', url: 'https://www.sbmac.org.br/' },
      { nome: 'SEGLABS', img: 'images/logo-seglabs.png', url: 'https://seglabs.io'},
      { nome: 'Dassault Systèmes', img: 'images/logo-dessault.png', url: 'https://www.3ds.com/' }
     // { nome: 'Apoiador tal', img: '', url: '#' }
    ],

    organizacao: {
      titulo: 'Organização',
      logos: [
        { nome: 'Unifesp', img: 'images/logo-unifesp.png', url: 'https://www.unifesp.br' },
        { nome: 'Mulheres da SBMAC', img: 'images/sbmacm-logo.png', url: 'https://www.mulheressbmac.com.br' },
        { nome: 'MIC', img: 'images/mic-logo.jpeg', url: 'https://www.sjc.sp.gov.br/servicos/educacao-e-cidadania/museu-interativo-de-ciencias' }
      ]
    },

    membros: [
      { nome: 'Grasiele Jorge',   img: 'images/grasi_jorge.jpeg',      funcao: 'Coordenação', curso: 'Professora de matemática, apaixonada por gatos, bike, trilhas e natureza' },
      { nome: 'Cláudia Aline',    img: 'images/claudia_aline.jpeg',    funcao: 'Coordenação', curso: 'Professora de matemática, ama dançar e conhecer novos sabores' },
      { nome: 'Maíra Matos',      img: 'images/maira_matos.jpeg',      funcao: 'Professora Apoiadora', curso: '[curso / departamento]' },
      { nome: 'Noelma Santos',    img: 'images/noelma.jpeg',           funcao: 'Professora Apoiadora', curso: 'Pedagoga, e nas horas vagas aprendo a cuidar de suculentas e orquídeas!' },
      { nome: 'Camila de Morais', img: 'images/camila_de_morais.jpeg', funcao: 'Professora Apoiadora', curso: 'professora de ciencias e da arte da investigacao ama series policiais e rock n roll' },
      { nome: 'Leonardo',         img: 'images/leonardo.jpeg',         funcao: 'Professor Apoiador', curso: 'Leonardo, professor de Matemática e fã de comédia' },
      { nome: 'Clara Yumi',       img: 'images/clara.jpeg',            funcao: 'Monitora e Dev do Site', curso: 'Estudante de matemática computacional e dançarina que ama gatos' },
      { nome: 'Malu Balbo',       img: 'images/malu.jpeg',             funcao: 'Monitora', curso: 'estudante de ciência e tecnologia que adora filmes' },
      { nome: 'Ellen Yukie',      img: 'images/ellen.jpeg',            funcao: 'Monitora', curso: 'Estudante do Bacharelado Interdisciplinar de Ciência e Tecnologia, que gosta de quebra-cabeças e jogos online.' },
      { nome: 'Heloíse Martinez', img: 'images/helo.jpeg',             funcao: 'Monitora', curso: 'Estudante de engenharia de computação e entusiasta de aquarismo e dígitos de pi' },
      { nome: 'Juliana Sene',     img: 'images/juliana.jpeg',          funcao: 'Monitora', curso: 'Profissional de Finanças, estudante de matemática. Gosto de pintura e micronacionalismo' },
      { nome: 'Vitor Soares',     img: 'images/vitor_soares.jpeg',     funcao: 'Dev do Site', curso: 'Desenvolvedor, entusiasta de matemática e segurança da informação' }
    ],

        // CRÉDITOS DO SITE (rodapé): nome e link do LinkedIn de quem desenvolveu
    desenvolvedores: [
      { nome: 'Vitor Soares', linkedin: 'https://www.linkedin.com/in/vitor-soares-goncalves-807213366/' },
      { nome: 'Clara Yumi', linkedin: 'https://www.linkedin.com/in/clara-yumi-shiraishi/' }
    ],

    // URL do Google Apps Script publicado (formulário). Vazio = modo demonstração.
    formularioUrl: 'https://script.google.com/macros/s/AKfycbydholvDmKnOBhmClzWzr0B9rSY4RzdDyzdB2Iv5iayR2Tl1T22L8rkRYdNPn2qL-yg9Q/exec'
  };

  // Gera uma logo clicável: imagem real (se houver) ou espaço tracejado, sempre como link
  window.SITE.logo = function (item, classe) {
  var url = item.link || item.url || '#';

  // Se "link" for uma chave de SITE.links, usa o endereço correspondente
  if (window.SITE.links[url]) {
    url = window.SITE.links[url];
  }

  var externo = /^https?:/.test(url);

  var attrs =
    'href="' + url + '"' +
    (externo ? ' target="_blank" rel="noopener"' : '') +
    ' aria-label="' + item.nome + (externo ? ' (abre em nova aba)' : '') + '"';

  if (item.img) {
    return '<a class="logo-link ' + (classe || '') + '" ' + attrs + '>' +
      '<img src="' + window.SITE.url(item.img) + '" alt="' + item.nome + '">' +
      '</a>';
  }

  return '<a class="logo-ph ' + (classe || '') + '" ' + attrs + '>' +
    'LOGO<br>' + item.nome +
    '</a>';
};

  // Preenche <a data-link="ada|unifesp|primos"> e <span data-evento="dataTexto|dataCurta|diaSemana|horario|local">
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-evento]').forEach(function (el) {
      var v = window.SITE.evento[el.dataset.evento];
      if (v) el.textContent = v;
    });
    document.querySelectorAll('a[data-link]').forEach(function (a) {
      var destino = window.SITE.links[a.dataset.link];
      if (destino) {
        a.href = destino;
        if (/^https?:/.test(destino)) { a.target = '_blank'; a.rel = 'noopener'; }
      }
    });
  });
})();