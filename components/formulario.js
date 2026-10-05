
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('form-inscricao');
    if (!form) return;
    var S = window.SITE;
    var status = document.getElementById('form-status');
    var sucesso = document.getElementById('form-sucesso');
    var botao = form.querySelector('[type="submit"]');
    var carregando = document.getElementById('form-carregando');
    var fila = document.getElementById('fila-espera');

    // Idade que a menina terá no dia do evento
    function idadeNoEvento(iso) {
      var n = new Date(iso), e = new Date(S.evento.data);
      var idade = e.getFullYear() - n.getFullYear();
      var m = e.getMonth() - n.getMonth();
      if (m < 0 || (m === 0 && e.getDate() < n.getDate())) idade--;
      return idade;
    }

    // Telefone: só números, espaços, parênteses, + e hífen,
    // com 10 a 13 números no total (DDD + número)
    function telefoneValido(valor) {
      if (/[^0-9\s()+-]/.test(valor)) return false;
      var numeros = valor.replace(/\D/g, '').length;
      return numeros >= 10 && numeros <= 13;
    }

    // E-mail formato tal@tal.tal
    function emailValido(valor) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
    }

    // Documento de identidade (RG, passaporte...): precisa ter pelo menos 5 números.

    function documentoValido(valor) {
      if (/[^0-9A-Za-z.\-\/\s]/.test(valor)) return false;
      return valor.replace(/\D/g, '').length >= 5;
    }


    /* ---------- Ajudantes ---------- */

    // Nome do campo para mostrar no aviso: usa o data-nome (se tiver)
    // ou o texto do <label> do campo
    function nomeDoCampo(el) {
      if (el.dataset.nome) return el.dataset.nome;
      var label = form.querySelector('label[for="' + el.id + '"]');
      if (!label) return el.name;
      return label.textContent.replace('(opcional)', '').trim();
    }

  
    function caixaDoCampo(el) {
      return el.closest('.campo, .check');
    }

    function marcarErro(el) {
      var caixa = caixaDoCampo(el);
      if (!caixa) return;
      caixa.classList.remove('com-erro');
      void caixa.offsetWidth;            
      caixa.classList.add('com-erro');
      el.setAttribute('aria-invalid', 'true');
    }

    function limparErro(el) {
      var caixa = caixaDoCampo(el);
      if (caixa) caixa.classList.remove('com-erro');
      el.removeAttribute('aria-invalid');
    }

    // Quando a pessoa mexe no campo, o vermelho some
    form.addEventListener('input', function (ev) { limparErro(ev.target); });
    form.addEventListener('change', function (ev) { limparErro(ev.target); });


    /* ---------- Aviso erro ---------- */

    var aviso = document.createElement('div');
    aviso.className = 'aviso-erro';
    aviso.setAttribute('role', 'alert');
    aviso.hidden = true;
    document.body.appendChild(aviso);
    var timerAviso;

    function mostrarAviso(linhas) {
      aviso.textContent = '';

      var fechar = document.createElement('button');
      fechar.type = 'button';
      fechar.className = 'aviso-erro__fechar';
      fechar.setAttribute('aria-label', 'Fechar aviso');
      fechar.textContent = '×';
      fechar.addEventListener('click', esconderAviso);
      aviso.appendChild(fechar);

      linhas.forEach(function (linha, i) {
        var p = document.createElement('p');
        if (i === 0) {                     // a primeira linha começa com "Atenção!" em negrito
          var titulo = document.createElement('strong');
          titulo.textContent = 'Atenção! ';
          p.appendChild(titulo);
        }
        if (linha.negrito) {
          var destaque = document.createElement('strong');
          destaque.textContent = linha.negrito + ' ';
          p.appendChild(destaque);
        }
        p.appendChild(document.createTextNode(linha.texto));
        aviso.appendChild(p);
      });

      aviso.hidden = true;
      void aviso.offsetWidth;            
      aviso.hidden = false;

      clearTimeout(timerAviso);
      timerAviso = setTimeout(esconderAviso, 10000);   // some sozinho depois de 10 segundos
    }

    function esconderAviso() {
      clearTimeout(timerAviso);
      aviso.hidden = true;
    }


    /* ---------- Formulário ou lista de espera? ---------- */

    var decidido = false;

    function mostrarFormulario() {
      if (decidido) return;
      decidido = true;
      carregando.hidden = true;
      form.hidden = false;
    }

    function mostrarFila() {
      decidido = true;
      esconderAviso();
      carregando.hidden = true;
      form.hidden = true;
      fila.hidden = false;
    }

    if (location.search.indexOf('fila') !== -1) {
      // formulario.html?fila mostra a lista de espera, para testar sem esperar lotar
      mostrarFila();
    } else if (!S.formularioUrl) {
      mostrarFormulario();               
    } else {
      // Pergunta para a planilha se ainda tem vaga
      form.hidden = true;
      carregando.hidden = false;
      fetch(S.formularioUrl)
        .then(function (resposta) { return resposta.json(); })
        .then(function (r) {
          if (r.status === 'lotado') mostrarFila();
          else mostrarFormulario();
        })
        .catch(mostrarFormulario);       
      setTimeout(mostrarFormulario, 8000);   
    }


    /* ---------- Envio da inscrição ---------- */

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (form.elements['website'].value) return;     // campo escondido preenchido = robô

      var faltando = [];
      var invalidos = [];
      var primeiroErro = null;

      form.querySelectorAll('[required]').forEach(function (el) {
        limparErro(el);
        var valor = el.type === 'checkbox' ? '' : el.value.trim();
        var vazio = el.type === 'checkbox' ? !el.checked : valor === '';
        var temProblema = false;

        if (vazio) {
          faltando.push(nomeDoCampo(el));
          temProblema = true;
        } else if (el.type === 'tel' && !telefoneValido(valor)) {
          invalidos.push(nomeDoCampo(el));
          temProblema = true;
        } else if (el.type === 'email' && !emailValido(valor)) {
          invalidos.push(nomeDoCampo(el));
          temProblema = true;
        } else if ((el.name === 'documento_participante' || el.name === 'documento_responsavel') && !documentoValido(valor)) {
          invalidos.push(nomeDoCampo(el));
          temProblema = true;
        } else if (el.name === 'nascimento') {
          var idade = idadeNoEvento(valor);
          if (idade < S.evento.idadeMin || idade > S.evento.idadeMax) {
            invalidos.push(nomeDoCampo(el) + ' (a participante precisa ter de ' + S.evento.idadeMin + ' a ' + S.evento.idadeMax + ' anos no dia da Jornada)');
            temProblema = true;
          }
        }

        if (temProblema) {
          marcarErro(el);
          if (!primeiroErro) primeiroErro = el;
        }
      });

      if (primeiroErro) {
        var linhas = [];
        if (faltando.length) linhas.push({ texto: 'Faltam preencher os campos: ' + faltando.join(', ') + '.' });
        if (invalidos.length) linhas.push({ negrito: 'Campos inválidos:', texto: invalidos.join(', ') + '.' });
        mostrarAviso(linhas);
        primeiroErro.focus({ preventScroll: true });
        primeiroErro.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      esconderAviso();
      var dados = new URLSearchParams(new FormData(form));
      botao.disabled = true;
      status.textContent = 'Enviando inscrição…';

      function concluir() {
        status.textContent = '';
        document.getElementById('email-confirmado').textContent = form.elements['email'].value;
        form.hidden = true;
        sucesso.hidden = false;
        sucesso.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      if (!S.formularioUrl) {
        setTimeout(function () { document.getElementById('aviso-demo').hidden = false; concluir(); }, 500);
        return;
      }
      fetch(S.formularioUrl, { method: 'POST', body: dados })
        .then(function (resposta) { return resposta.json(); })
        .then(function (r) {
          if (r.status === 'ok') {
            concluir();
          } else if (r.status === 'lotado') {
            // as vagas acabaram enquanto a pessoa preenchia: troca para a lista de espera
            status.textContent = '';
            mostrarFila();
            fila.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            throw new Error(r.status);
          }
        })
        .catch(function () {
          botao.disabled = false;
          status.textContent = 'Não foi possível enviar. Verifique sua conexão e tente de novo.';
        });
    });


    /* ---------- Lista de espera ---------- */

    var formFila = document.getElementById('form-fila');
    var emailFila = document.getElementById('email_fila');
    var mensagemFila = document.getElementById('fila-mensagem');
    var botaoFila = formFila.querySelector('[type="submit"]');
    var filaDemo = [];                   // só usada no modo demonstração

    // Mostra a frase embaixo da caixa de e-mail: tipo 'ok' (verde) ou 'erro' (vermelho)
    function respostaFila(tipo, texto) {
      mensagemFila.textContent = texto;
      mensagemFila.className = 'fila__mensagem fila__mensagem--' + tipo;
      if (tipo === 'erro') marcarErro(emailFila);
      else limparErro(emailFila);
    }

    // Quando a pessoa volta a digitar, o vermelho e a frase somem
    emailFila.addEventListener('input', function () {
      limparErro(emailFila);
      mensagemFila.textContent = '';
    });

    formFila.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var email = emailFila.value.trim().toLowerCase();
      if (!email) return respostaFila('erro', 'Digite seu e-mail.');
      if (!emailValido(email)) return respostaFila('erro', 'E-mail inválido.');

      botaoFila.disabled = true;
      mensagemFila.className = 'fila__mensagem';
      mensagemFila.textContent = 'Enviando…';

      function tratar(resultado) {
        botaoFila.disabled = false;
        if (resultado === 'ok') respostaFila('ok', 'Você está na lista de espera!');
        else if (resultado === 'repetido') respostaFila('erro', 'Esse e-mail já está na fila.');
        else respostaFila('erro', 'Não foi possível enviar. Verifique sua conexão e tente de novo.');
      }

      if (!S.formularioUrl) {            
        setTimeout(function () {
          if (filaDemo.indexOf(email) !== -1) return tratar('repetido');
          filaDemo.push(email);
          tratar('ok');
        }, 400);
        return;
      }
      fetch(S.formularioUrl, { method: 'POST', body: new URLSearchParams({ tipo: 'fila', email: email }) })
        .then(function (resposta) { return resposta.json(); })
        .then(function (r) { tratar(r.status); })
        .catch(function () { tratar('erro'); });
    });
  });
})();