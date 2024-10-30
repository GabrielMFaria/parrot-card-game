const imagensCartas = [
  'bobrossparrot.gif',
  'explodyparrot.gif',
  'fiestaparrot.gif',
  'metalparrot.gif',
  'revertitparrot.gif',
  'tripletsparrot.gif',
  'unicornparrot.gif'
];

let jogadas = 0;
let cartasViradas = 0;
let primeiraCarta, segundaCarta;

function iniciarJogo() {
  let numCartas = Number(prompt("Com quantas cartas deseja jogar?"));
  while (numCartas < 4 || numCartas > 14 || numCartas % 2 !== 0) {
    numCartas = Number(prompt("Com quantas cartas deseja jogar?"));
  }
  const baralho = document.querySelector(".jogo");
  baralho.innerHTML = "";
  const cartasSelecionadas = imagensCartas.slice(0, numCartas / 2);
  const cartasDuplicadas = [...cartasSelecionadas, ...cartasSelecionadas];
  const cartasEmbaralhadas = cartasDuplicadas.sort(comparador);
  function comparador() { 
    return Math.random() - 0.5; 
  }
  for (let i = 0; i < cartasEmbaralhadas.length; i++) {
    const imagem = cartasEmbaralhadas[i];
    baralho.innerHTML += gifCarta(imagem);
  }
}

function gifCarta(imagem) {
  return `
    <div class="carta" onclick="virarCarta(this)">
      <div class="frente face">
        <img src="back.png" />
      </div>
      <div class="verso face">
        <img src="${imagem}" />
      </div>
    </div>
  `;
}

function virarCarta(carta) {
  if (carta.classList.contains("virada") || segundaCarta) {
    return; 
  }

  carta.classList.add("virada");
  jogadas++;

  if (!primeiraCarta) {
    primeiraCarta = carta;
  } else {
    segundaCarta = carta;
    verificarPar();
  }
}

function verificarPar() {
  const primeiraImagem = primeiraCarta.querySelector(".verso img").src;
  const segundaImagem = segundaCarta.querySelector(".verso img").src;

  if (primeiraImagem === segundaImagem) {
    cartasViradas += 2;
    resetarCartas(true);
  } else {
    setTimeout(() => {
      primeiraCarta.classList.remove("virada");
      segundaCarta.classList.remove("virada");
      resetarCartas(false);
    }, 1000);
  }

  if (cartasViradas === document.querySelectorAll(".carta").length) {
    setTimeout(() => {
      alert(`Você ganhou em ${jogadas} jogadas!`);
    }, 500);
  }
}

function resetarCartas() {
  primeiraCarta = null;
  segundaCarta = null;
}

window.onload = iniciarJogo;
