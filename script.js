
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


// Unsplash API
let count = 5;
const apiKey = "DzyuQu_peGmZxNCWODbhGvN1MqXaqBBqz8uKjPMZmgY";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
// Check if all image were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
  }
}
// Helper function to Set Attributes to HTML elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
// Create element for Links and Photos and Add it to the DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // Run function for each photo in photosArray
  photosArray.forEach((photo) => {
    // Create <a> element to link to Unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank"
    })
    
    // Create <img> element and set src attribute
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.created_at
    });
    // Event listener checks if image is loaded
    img.addEventListener("load",imageLoaded);
    // Add img to <a> then Add <a> to imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
  }
// Get photos from Unsplash API
async function getPhotos() {
try {
  const response = await fetch(apiUrl);
  photosArray = await response.json();
  displayPhotos();
} catch (error) {
  alert(error);
}
}
// Check when the user scrolls to the bottom of the page
window.addEventListener("scroll", () => {
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
})

// On load
getPhotos();