const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to download an image given its URL
function downloadImage(image) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () =>
      reject(new Error(`Failed to load image's URL: ${image.url}`));
    img.src = image.url;
  });
}

// Function to display downloaded images on the webpage
function displayImages(images) {
  images.forEach((img) => output.appendChild(img)); 
}

// Event listener for the download button
btn.addEventListener("click", () => {
  // Map each image URL to a downloadImage promise
  const downloadPromises = images.map(downloadImage);

  // Use Promise.all to download all images in parallel
  Promise.all(downloadPromises)
    .then(displayImages) // Display images on success
    .catch((error) => console.error(error)); // Log error on failure
});