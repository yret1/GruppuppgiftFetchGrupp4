//Api query:

const searchFunction = () => {
  let search = searchInput.value;
  searchValue = search;

 console.log(search)

  fetchData();
}

let searchValue;
const API_KEY = "687ed96588d723d61f7a8b89012440c0";
const secret = "76aedade9fbbc0e8";




const media = "photos";

//

// DOM elements
const imageContainer = document.querySelector(".search__display");
const imgSearchBtn = document.querySelector(".search__submit");
let searchInput = document.querySelector(".search__input");


imgSearchBtn.addEventListener("click", searchFunction);
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchFunction();
  }
})

let photoArray = [];

const fetchData = async () => {
  fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&secret=${secret}&tags=${searchValue||"dog"}&media=${media}&safe_search=2&per_page=10&page=1&format=json&nojsoncallback=1`)
    .then((response) => response.json())

    .then((data) => {
      console.log(data)
        photoArray = [];
      data.photos.photo.forEach((item) => {
        photoArray.push(
          `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`
        );
      });
    })

    .then(() => clearImgs())

    .then(() => photoRender())

    .catch((error) => console.log(error));
};


const clearImgs = () => {
  while(imageContainer.firstChild){
    imageContainer.removeChild(imageContainer.firstChild);
  }
}

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
