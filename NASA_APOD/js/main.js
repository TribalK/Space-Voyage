url = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";

fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    document.querySelector('h2').innerText = data.title;
    document.querySelector('img').src = data.url;
    document.querySelector('img').alt = data.title;
    document.querySelector('figcaption').innerText = data.copyright + " " + data.date;
    document.querySelector('p').innerText = data.explanation;
  })
  .catch(err => console.log(err));
