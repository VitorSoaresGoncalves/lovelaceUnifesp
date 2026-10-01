/* Lógica do formulário de inscrição (#form-inscricao)
   - valida a idade da participante na data do evento
   - envia para o Google Apps Script (SITE.formularioUrl)
   - sem URL configurada: modo demonstração (não envia nada) */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('form-inscricao');
    if (!form) return;
    var S = window.SITE;
    var status = document.getElementById('form-status');
    var sucesso = document.getElementById('form-sucesso');
    var botao = form.querySelector('[type="submit"]');
    var nasc = form.elements['nascimento'];

    function idadeNoEvento(iso) {
      var n = new Date(iso), e = new Date(S.evento.data);
      var idade = e.getFullYear() - n.getFullYear();
      var m = e.getMonth() - n.getMonth();
      if (m < 0 || (m === 0 && e.getDate() < n.getDate())) idade--;
      return idade;
    }
    function validarIdade() {
      if (!nasc.value) return;
      var i = idadeNoEvento(nasc.value);
      nasc.setCustomValidity(i < S.evento.idadeMin || i > S.evento.idadeMax
        ? 'A Jornada é para meninas de ' + S.evento.idadeMin + ' a ' + S.evento.idadeMax + ' anos (idade no dia do evento).' : '');
    }
    nasc.addEventListener('change', validarIdade);

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      validarIdade();
      if (form.elements['website'].value) return;       // honeypot anti-robô
      if (!form.reportValidity()) return;

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

      if (!S.formularioUrl) {                            // modo demonstração
        setTimeout(function () { document.getElementById('aviso-demo').hidden = false; concluir(); }, 500);
        return;
      }
      fetch(S.formularioUrl, { method: 'POST', mode: 'no-cors', body: dados })
        .then(concluir)
        .catch(function () {
          botao.disabled = false;
          status.textContent = 'Não foi possível enviar. Verifique sua conexão e tente de novo.';
        });
    });
  });
})();
