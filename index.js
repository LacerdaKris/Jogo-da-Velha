let simbolo1 = document.querySelector("input[name='simbolo1']");
let simbolo2 = document.querySelector("input[name='simbolo2']");
const jogo = document.getElementById("areaIniciar");
const quadrantes = document.querySelectorAll("button[class='botões']");


//começar com opções radio marcadas, clicando pode trocar
simbolo1.value = "X";
simbolo2.value = "O";
document.getElementById("simboloX1").checked = true;
document.getElementById("simboloO2").checked = true;

const radios = document.querySelectorAll("input[type='radio']");
//seleciona todos os inputs do tipo radio e adiciona ouvinte
radios.forEach(function (radio) {
  radio.addEventListener("click", function () {
    //pra cada opção radio clicada, seleciona o oposto no outro jogador
    if (radio.id === "simboloX1") {
      simbolo1.value = "X";
      simbolo2.value = "O";
      document.getElementById("simboloO2").checked = true;
    } else if (radio.id === "simboloO1") {
      simbolo1.value = "O";
      simbolo2.value = "X";
      document.getElementById("simboloX2").checked = true;
    } else if (radio.id === "simboloX2") {
      simbolo1.value = "O";
      simbolo2.value = "X";
      document.getElementById("simboloO1").checked = true;
    } else if (radio.id === "simboloO2") {
      simbolo1.value = "X";
      simbolo2.value = "O";
      document.getElementById("simboloX1").checked = true;
    }
  });
});

const iniciar = document.getElementById("iniciar");
//seleciona o botão iniciar e aciona revezamento de qual jogador é a vez
iniciar.addEventListener("click", function () {
  const inputnome1 = document.getElementById("nome1").value;
  const inputnome2 = document.getElementById("nome2").value;
  //se ambos inputs estiverem preenchidos, seguir execução do jogo
  if (inputnome1 !== "" && inputnome2 !== "") {
    jogar();
  } else {
    alert("Nomes devem estar preenchidos para jogar");
  }
});

//criar título p/ vencedor ou empate e botão de jogar novamente
let h2 = document.createElement("h2");
let jogarNovamente = document.createElement("button");
jogarNovamente.innerText = "JOGAR NOVAMENTE";

let vezDeJogar = "jogador1"
let quadranteClicado;
//execução do jogo
function jogar() {
  jogo.removeChild(iniciar);
  vezDeJogar === "jogador1" ? jogador1.style.setProperty("border-color", "#ca7397") : jogador2.style.setProperty("border-color", "#ca7397");
  //add ouvinte aos botões do jogo, e chama função que alterna a vezDeJogar
  quadrantes.forEach(function (quadrante) {
    quadrante.addEventListener("click", function quadranteClicado() {
      if (vezDeJogar === "jogador1") {
        quadrante.innerText = simbolo1.value;
        jogador1.style.setProperty("border-color", "white");
        jogador2.style.setProperty("border-color", "#ca7397");
        vezDeJogar = "jogador2";
      } else if (vezDeJogar === "jogador2") {
        quadrante.innerText = simbolo2.value;
        jogador1.style.setProperty("border-color", "#ca7397");
        jogador2.style.setProperty("border-color", "white");
        vezDeJogar = "jogador1";
      }
      
      //remove o event listener após o primeiro clique
      quadrante.removeEventListener("click", quadranteClicado)
    
      //verifica após cada clique se há vencedor ou empate
      const alguemVenceu = verificaGanhador();
      if (alguemVenceu !== null) {
        const jogador1 = document.getElementById("nome1")
        const jogador2 = document.getElementById("nome2")
        let vencedor = ""
        vezDeJogar === "jogador1" ? vencedor=jogador2.value : vencedor=jogador1.value;
        jogo.appendChild(h2);
        h2.innerText = vencedor + " venceu!";
        jogo.appendChild(jogarNovamente);
        removerEventListeners();
        limparVezDeJogar();
      } else if (botõesPreenchidos()) {
        jogo.appendChild(h2);
        h2.innerText = "Empate!";
        jogo.appendChild(jogarNovamente);
        limparVezDeJogar();
      }
    })    
  })
};

jogarNovamente.addEventListener("click", limparJogo);

//verifica se todos os botões do jogo tem innerText preenchido
function botõesPreenchidos() {
  for (let i = 0; i < quadrantes.length; i++) {
    if (quadrantes[i].innerText === "") {
      return false;
    }
  }
  return true;
}

//pega todas as combinações em linha e verifica se o texto é igual
function verificaGanhador() {
  const linhas = [
    //linhas horizontais
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //linhas verticais
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //linhas diagonais
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < linhas.length; i++) {
    const [a, b, c] = linhas[i];
    if (
      quadrantes[a].innerText !== "" &&
      quadrantes[a].innerText === quadrantes[b].innerText &&
      quadrantes[b].innerText === quadrantes[c].innerText
    ) {
      //há um ganhador, e os quadrantes dele chamam a classe do CSS
      quadrantes[a].classList.add("vencedor");
      quadrantes[b].classList.add("vencedor");
      quadrantes[c].classList.add("vencedor");
      return quadrantes[a].innerText;
    }
  }
  //não há ganhador
  return null;
}

function removerEventListeners() {
  quadrantes.forEach(function(quadrante) {
    quadrante.removeEventListener("click", quadranteClicado);
  });
}

//deixar pronto para nova partida
function limparJogo() {
  quadrantes.forEach((quadrante) => {
    quadrante.innerText = "";
    quadrante.classList.remove("vencedor");
  });
  limparVezDeJogar();
  jogo.appendChild(iniciar);
  jogo.removeChild(h2);
  jogo.removeChild(jogarNovamente);
}

//limpar cor de destaque da vez de jogar
function limparVezDeJogar() {
  jogador1.style.setProperty("border-color", "white");
  jogador2.style.setProperty("border-color", "white");
}
