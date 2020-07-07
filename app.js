/* Declaring variables */

const apiURL = 'https://onepiececover.com/api/chapters';

const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');


/* Event Listeners */

form.addEventListener('submit', e => {
  e.preventDefault();

  const searchNumber = search.value;

  if(!searchNumber) {
    alert('Please, choose a chapter!')
  }else {
    searchChapter(searchNumber);
  }

});

/* Search Chapter and rendering in the DOM */

async function searchChapter(number){
 

  const res = await fetch(`${apiURL}/${number}`);
  const data = await res.json();

  /* I had to use a few Regular Expressions because in some instances the chapters titles contain broken double quotes. */
  let title =`${JSON.stringify(data.title).replace(/\\"/g,'' )}`;
  let summary = `${JSON.stringify(data.summary).replace(/"/g,'' )}`;
  let characters = `${JSON.stringify(data.characters).replace(/"/g,'' )}`;

/* 
  Crucial part: I have been struggling for days to fetch and display the images contained in the Json. I finally realize that the problem with this API is that the cover_images Json key are multiple URLS separated by the symbol | */

  let img = document.createElement("img");
  
  img.src = (data.cover_images).split("|").pop();
  


  
    document.getElementById('title').innerText = title;
  


    document.getElementById('summary').innerText = summary;
  

 
    document.getElementById('characters').innerText = characters;

    
    document.getElementById('images').appendChild(img);
    
}


searchChapter();




