let elTemplate = document.querySelector("[data-music-template]");
let apiKey = `https://deezer.humosoft.uz/`;
let elMusicBox = document.querySelector("[data-box-music]");

async function searchMusic(value) {
  try {
      let response = await fetch(`${apiKey}search?q=${value}`);
      let result = await response.json();
      console.log(result.data);
      renderMusic(result.data);
  } catch (error) {
    renderE(error);
  }
}
async function searchArtistFirst(value) {
  try {
    let response = await fetch(`${apiKey}artist/${value}`);
    let result = await response.json();
    console.log(response ,result);
    renderArtistFirst(result);
  } catch (error) {
    renderE(error);
  }
}

function renderMusic(musicFirst) {
  elMusicBox.innerHTML = "";
  elMusicBox.innerHTML = `<ul></ul>`;
  
  musicFirst.forEach((music) => {
    elMusicBox.querySelector("ul").appendChild(createLi(music));
  });
}

function renderArtistFirst(musicFirst) {
  elMusicBox.innerHTML = "";
  elMusicBox.innerHTML = `<ul></ul>`;
  
    elMusicBox.querySelector("ul").appendChild(createLi(musicFirst));
}

function createLi(music) {
  const card = elTemplate.content.cloneNode(true);
  card.querySelector(".music-card__title").textContent = music.name;
  card.querySelector(".music-name").textContent = music.title;
  if (music.preview === undefined) {
    card.querySelector("audio").classList.add("d-none");
    card.querySelector("a").href = `./artist.html?id=${music.id}`;
    card.querySelector("img").src = music.picture_medium;
  }
  if (music.preview !== undefined) {
    card.querySelector("a").href = `./artist.html?id=${music.id}`;
    card.querySelector("source").src = music.preview;
    card.querySelector("img").src = music.artist.picture_medium;
  }
  return card;
}

function renderE(err) {
  console.log(err);
}
