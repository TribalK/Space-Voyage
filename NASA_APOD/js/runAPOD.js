let dateToday = new Date();
const dateObj = document.querySelector('#dateSelect');

let key = config.NASA_API_KEY;

if(key.length == 0) {
  key = "DEMO_KEY";
}

getInitialDateImage();

dateObj.addEventListener('change', fetchImage);

function fetchImage() {
  url = `https://api.nasa.gov/planetary/apod?api_key=${key}&date=${dateObj.value}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      document.querySelector('h2').innerText = data.title;

      if(data.media_type === 'image') {
        document.querySelector('img').src = data.url;
        document.querySelector('img').alt = data.title;
        document.querySelector('iframe').src = "";
      } else if(data.media_type === 'video') {
        document.querySelector('iframe').src = data.url;
        document.querySelector('img').src = "";
        document.querySelector('img').alt = "";
      }

      document.querySelector('figcaption').innerText = data.copyright + " " + data.date;
      document.querySelector('p').innerText = data.explanation;
    })
    .catch(err => console.log(err));
}

function getInitialDateImage() {
  const dd = String(dateToday.getDate()).padStart(2, '0');
  const mm = String(dateToday.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = dateToday.getFullYear();

  dateToday = `${yyyy}-${mm}-${dd}`;

  dateObj.value = dateToday;
  dateObj.max = dateToday;
  fetchImage();
}
