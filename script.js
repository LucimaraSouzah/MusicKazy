let musicas = [
  {
    titulo: "Demons",
    artista: "Imagine Dragons",
    source: "musicas/Imagine_Dragons_-_Demons_(BornMP3.com).mp3",
    img: "images/imagine.jpg",
  },
  {
    titulo: "Do I Wanna Know",
    artista: "Artic Monkeys",
    source: "musicas/Arctic_Monkeys_-_Do_I_Wanna_Know_(BornMP3.com).mp3",
    img: "images/artic.jpg",
  },
  {
    titulo: "Cigarette Daydream",
    artista: "Cage the Elephant",
    source:
      "musicas/Cigarette Daydreams   Cage The Elephant   Melophobia MP3.mp3",
    img: "images/indie.jpg",
  },
];

// INICIO
let musica = document.querySelector("audio");
let musicaIndex = 0;

let nomeMusica = document.querySelector("h1");
let nomeArtista = document.querySelector("i");
let imagem = document.querySelector("img");
let tempoDecorrido = document.querySelector(".inicio");
let duracaoMusica = document.querySelector(".fim");

nomeMusica.textContent = musicas[musicaIndex].titulo;
nomeArtista.textContent = musicas[musicaIndex].artista;
imagem.setAttribute("src", musicas[musicaIndex].img);
duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));

// EVENTOS
document.querySelector(".botao-play").addEventListener("click", tocarMusica);

document.querySelector(".botao-pause").addEventListener("click", pausarMusica);

musica.addEventListener("timeupdate", atualizarBarra);

document.querySelector(".seta-anterior").addEventListener("click", () => {
  musicaIndex--;
  if (musicaIndex < 0) {
    musicaIndex = 2;
  }
  renderizarMusica(musicaIndex);
});

document.querySelector(".seta-proximo").addEventListener("click", () => {
  musicaIndex++;
  if (musicaIndex > 2) {
    musicaIndex = 0;
  }
  renderizarMusica(musicaIndex);
});

// FUNÇÕES

function renderizarMusica(musicaIndex) {
  musica.setAttribute("src", musicas[musicaIndex].source);

  musica.addEventListener("loadeddata", () => {
    nomeMusica.textContent = musicas[musicaIndex].titulo;
    nomeArtista.textContent = musicas[musicaIndex].artista;
    imagem.src = musicas[musicaIndex].img;

    duracaoMusica.textContent = segundosParaMinutos(
      Math.floor(musica.duration)
    );
  });
  pausarMusica();
  document.body.append(musica);
}

function tocarMusica() {
  musica.play();
  document.querySelector(".botao-play").style.display = "none";
  document.querySelector(".botao-pause").style.display = "block";
}

function pausarMusica() {
  musica.pause();
  document.querySelector(".botao-play").style.display = "block";
  document.querySelector(".botao-pause").style.display = "none";
}

function segundosParaMinutos(segundos) {
  let campoMinutos = Math.floor(segundos / 60);
  let campoSegundos = segundos % 60;

  if (campoSegundos < 10) {
    campoSegundos = "0" + campoSegundos;
  }
  return campoMinutos + ":" + campoSegundos;
}

function atualizarBarra() {
  let barra = document.querySelector("progress");
  barra.style.width =
    Math.floor((musica.currentTime / musica.duration) * 100) + "%";
  tempoDecorrido.textContent = segundosParaMinutos(
    Math.floor(musica.currentTime)
  );
}
