/* Declaring variables */

const proxyUrl = 'https://fathomless-garden-50014.herokuapp.com';

const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');

/* Event Listeners */

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchNumber = search.value;

  if (!searchNumber) {
    alert('Please, choose a chapter!');
  } else {
    searchChapter(searchNumber);
  }
});

/* Search Chapter and rendering in the DOM */

async function searchChapter(number) {
  const res = await fetch(`${proxyUrl}/api/chapters/${number}`);
  const data = await res.json();

  let title = data.title;
  let summary = data.summary;
  let characters = data.characters;

  /* 
  Crucial part: I have been struggling for days to fetch and display the images contained in the Json. I finally realize that the problem with this API is that the cover_images Json key are multiple URLS separated by the symbol | */

  const imgSrc = data.cover_images.split('|').pop();

  document.getElementById('title').innerText = title;

  document.getElementById('summary').innerText = summary;

  document.getElementById('characters').innerText = characters;

  let images = document.getElementById('images');
  let image = images.querySelectorAll('img')[0];
  image.src = imgSrc;
  imgSrc.alt = title;
}

searchChapter(1);
