//Api query:

const API_KEY = "687ed96588d723d61f7a8b89012440c0";
const secret = "76aedade9fbbc0e8";
const API = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&secret=${secret}&tags=dog&per_page=20&page=1&format=json&nojsoncallback=1`;

const media = "photos";

//

// DOM elements
const imageContainer = document.querySelector(".search__display");

let photoArray = [];

const fetchData = async () => {
  fetch(API)
    .then((response) => response.json())

    .then((data) => {
      console.log(data);
      data.photos.photo.forEach((item) => {
        photoArray.push(
          `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`
        );
        console.log(photoArray);
      });
    })

    .then(() => photoRender())

    .catch((error) => console.log(error));
};

const photoRender = () => {
  photoArray.forEach((photoUrl, index) => {
    const imgWrapper = document.createElement("div");
    imgWrapper.classList.add("imgWrapper");
    const img = document.createElement("img");
    img.classList.add("img");
    img.src = photoUrl;
    imgWrapper.appendChild(img);
    imageContainer.appendChild(imgWrapper);
  });
};

fetchData();
