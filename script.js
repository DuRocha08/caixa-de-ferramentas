let historico = JSON.parse(localStorage.getItem('meuHistorico')) || [];
mostrarHistorico();

function mudarTema() {
  const corpo = document.body;
  const botao = document.getElementById('botaoTema');

  corpo.classList.toggle('escuro');

  if (corpo.classList.contains('escuro')) {
    botao.textContent = 'Modo Claro';
  } else {
    botao.textContent = 'Modo Escuro';
  }
}

function abrirAba(idTela, idBotao) {
  document.getElementById('telaConta').style.display = 'none';
  document.getElementById('telaSenha').style.display = 'none';
  document.getElementById('telaTemp').style.display = 'none';

  document.getElementById('aba1').classList.remove('selecionado');
  document.getElementById('aba2').classList.remove('selecionado');
  document.getElementById('aba3').classList.remove('selecionado');

  document.getElementById(idTela).style.display = 'block';
  document.getElementById(idBotao).classList.add('selecionado');
}

function salvarNoHistorico(texto) {
  historico.unshift(texto);

  if (historico.length > 5) {
    historico.pop();
  }

  localStorage.setItem('meuHistorico', JSON.stringify(historico));
  mostrarHistorico();
}

function mostrarHistorico() {
  const ul = document.getElementById('listaHistorico');
  ul.innerHTML = '';

  if (historico.length === 0) {
    ul.innerHTML = '<li>Nenhum registro ainda.</li>';
    return;
  }

  for (let i = 0; i < historico.length; i++) {
    const item = document.createElement('li');
    item.textContent = historico[i];
    ul.appendChild(item);
  }
}

function limparHistorico() {
  historico = [];
  localStorage.removeItem('meuHistorico');
  mostrarHistorico();
}

function calcularConta() {
  const valorStr = document.getElementById('valorConta').value.trim().replace(',', '.');
  const pessoasStr = document.getElementById('qtdPessoas').value.trim();
  const gorjetaStr = document.getElementById('porcentagemGorjeta').value.trim().replace(',', '.');

  const msgErro = document.getElementById('erroConta');
  const boxRes = document.getElementById('resConta');

  msgErro.textContent = '';
  boxRes.style.display = 'none';

  if (valorStr === '' || pessoasStr === '' || gorjetaStr === '') {
    msgErro.textContent = 'Por favor, preencha todos os campos.';
    return;
  }

  const valor = Number(valorStr);
  const pessoas = Number(pessoasStr);
  const gorjeta = Number(gorjetaStr);

  if (isNaN(valor) || isNaN(pessoas) || isNaN(gorjeta)) {
    msgErro.textContent = 'Digite apenas números válidos.';
    return;
  }

  if (valor <= 0 || pessoas < 1 || gorjeta < 0) {
    msgErro.textContent = 'Confira os valores: conta deve ser maior que 0 e pelo menos 1 pessoa.';
    return;
  }

  const total = valor + (valor * gorjeta / 100);
  const porPessoa = total / pessoas;

  const textoFinal = 'Total: R$ ' + total.toFixed(2) + ' | Cada um paga: R$ ' + porPessoa.toFixed(2);
  boxRes.textContent = textoFinal;
  boxRes.style.display = 'block';

  salvarNoHistorico('Conta: ' + textoFinal);
}

function gerarSenha() {
  const tamStr = document.getElementById('tamSenha').value.trim();
  const temNumeros = document.getElementById('checkNumeros').checked;
  const temSimbolos = document.getElementById('checkSimbolos').checked;

  const msgErro = document.getElementById('erroSenha');
  const boxRes = document.getElementById('resSenha');

  msgErro.textContent = '';
  boxRes.style.display = 'none';

  if (tamStr === '' || isNaN(Number(tamStr))) {
    msgErro.textContent = 'Digite um número para o tamanho da senha.';
    return;
  }

  const tamanho = parseInt(tamStr);

  if (tamanho < 6 || tamanho > 30) {
    msgErro.textContent = 'O tamanho precisa ser entre 6 e 30 caracteres.';
    return;
  }

  let letras = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (temNumeros) {
    letras += '0123456789';
  }
  if (temSimbolos) {
    letras += '!@#$%&*_-+';
  }

  let senha = '';
  for (let i = 0; i < tamanho; i++) {
    const pos = Math.floor(Math.random() * letras.length);
    senha += letras[pos];
  }

  boxRes.textContent = senha;
  boxRes.style.display = 'block';

  salvarNoHistorico('Senha gerada (' + tamanho + ' dígitos)');
}

function converterTemp() {
  const celsiusStr = document.getElementById('valorCelsius').value.trim().replace(',', '.');
  const msgErro = document.getElementById('erroTemp');
  const boxRes = document.getElementById('resTemp');

  msgErro.textContent = '';
  boxRes.style.display = 'none';

  if (celsiusStr === '' || isNaN(Number(celsiusStr))) {
    msgErro.textContent = 'Informe uma temperatura válida.';
    return;
  }

  const c = Number(celsiusStr);
  const f = (c * 1.8) + 32;
  const k = c + 273.15;

  const textoFinal = c + '°C = ' + f.toFixed(1) + '°F | ' + k.toFixed(2) + ' K';
  boxRes.textContent = textoFinal;
  boxRes.style.display = 'block';

  salvarNoHistorico('Temp: ' + textoFinal);
}