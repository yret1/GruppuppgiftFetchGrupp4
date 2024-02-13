
//Api query:



let searchValue = "cats";
const API_KEY = "687ed96588d723d61f7a8b89012440c0";
const secret = "76aedade9fbbc0e8";

// Search settings

const safe_search = 1;
const content_type = 1;
const privacy_filter = 1;
const media = "photos";

//

// DOM elements
const imageContainer = document.querySelector(".search__display");
const imgSearchBtn = document.querySelector(".search__submit");
let searchInput = document.querySelector(".search__input");
let pagecounter = document.querySelector(".pagecount");
const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");





//search trigger
imgSearchBtn.addEventListener("click", searchFunction);
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchFunction();
  }
})

//Page Counter and photoarray
let photoArray = [];
let totalPages = 20;
let currentPage = 1;

//Fetch function with async handling
const fetchData = async () => {
  fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&sort=date-taken-asc&tags=${searchValue}&media=${media}&safe_search=${safe_search}&per_page=20&privacy_filter=${privacy_filter}&page=${currentPage}&content_types=${content_type}&format=json&nojsoncallback=1`)
    .then((response) => response.json())

    .then((data) => {
        photoArray = [];
      data.photos.photo.forEach((item) => {
        photoArray.push(
          `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`
        );
      });
    })

    .then(() => clearImgs())

    .then(() => photoRender())

    .then(() => lightBox())

    .catch((error) => console.log(error));
};


//Search Function

const searchFunction = () => {
  let search = searchInput.value;
  searchValue = search;
  currentPage = 1;
 console.log(search)

  fetchData();
}


//Lightbox feature

const lightBox = () => {

  let images = document.querySelectorAll(".imgWrapper");

  const lightboxClose = document.querySelector(".lightbox__close");

  lightboxClose.addEventListener("click", closeLightbox);

  images.forEach((image) => {
    image.addEventListener("click", () => {
      let light_Box = document.querySelector(".display__lightbox");
      let img_Lightbox = document.querySelector(".lightbox__img");
      light_Box.style.display = "flex";
      img_Lightbox.src = image.firstChild.src; 
    })
  })
}


const closeLightbox = () => {
    let light_Box = document.querySelector(".display__lightbox");
    let img_Lightbox = document.querySelector(".lightbox__img");
    light_Box.style.display = "none";
    img_Lightbox.src = " ";
}


//Page Handling
const nextPage = () => {
  if (currentPage >= 20) {
    currentPage = 1
    fetchData()
  }else {
    currentPage += 1;
    fetchData()
  }

}

const prevPage = () => {

  if(currentPage == 1) {
    currentPage = 20;
    fetchData()
  }else {
    currentPage -= 1;
    fetchData()
  }

}


//Rendering Logic
const clearImgs = () => {
  while(imageContainer.firstChild){
    imageContainer.removeChild(imageContainer.firstChild);
  }
}

const photoRender = () => {
  pagecounter.innerHTML = `Page ${currentPage} of ${totalPages}`
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


//Eventlisteners
nextButton.addEventListener("click", nextPage);
prevButton.addEventListener("click", prevPage);


//On first load image render
fetchData();
