const modelPath = './model_quantized.tflite'; // Path to your TFLite model
const datasetPath = './dataset.json'; // Path to your dataset JSON

let model;
let dataset;

// Load the TFLite model and dataset
async function loadModelAndDataset() {
  const tflite = await tfliteModel.loadTFLiteModel(modelPath); // Load TFLite model
  model = tflite;

  const response = await fetch(datasetPath); // Load dataset
  dataset = await response.json();
}

// Show or hide the loading spinner
function toggleLoading(show) {
  const spinner = document.getElementById('loadingSpinner');
  spinner.style.display = show ? 'block' : 'none';
}

// Classify image
async function classifyImage(imageElement) {
  const tensor = tf.browser
    .fromPixels(imageElement)
    .resizeNearestNeighbor([224, 224]) // Resize to model input size
    .toFloat()
    .expandDims();
  const predictions = model.predict(tensor);
  const categories = ['coats', 'boots', 'pants', 'skirts', 'sweaters']; // Predefined categories
  const categoryIndex = predictions.argMax(1).dataSync()[0]; // Get predicted category index
  return categories[categoryIndex];
}

// Get dominant color of the item
function getItemColor(imageElement) {
  // Create a canvas for center cropping
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const width = imageElement.naturalWidth;
  const height = imageElement.naturalHeight;

  // Define a central square crop
  const cropSize = Math.min(width, height) * 0.5; // Central square crop (50% of the smaller dimension)
  const startX = (width - cropSize) / 2;
  const startY = (height - cropSize) / 2;

  canvas.width = cropSize;
  canvas.height = cropSize;

  // Draw the central cropped area
  ctx.drawImage(imageElement, startX, startY, cropSize, cropSize, 0, 0, cropSize, cropSize);

  // Get cropped image data URL
  const croppedImage = canvas.toDataURL();
  const croppedImgElement = new Image();
  croppedImgElement.src = croppedImage;

  // Extract dominant color using Color Thief
  const colorThief = new ColorThief();
  const dominantColor = colorThief.getColor(croppedImgElement);

  return dominantColor;
}

// Match products based on category and color
function matchProducts(category, color) {
  return dataset.filter(product => {
    return (
      product.category === category &&
      isColorSimilar(product.color, color)
    );
  });
}

// Check if colors are similar
function isColorSimilar(color1, color2) {
  const distance = Math.sqrt(
    Math.pow(color1[0] - color2[0], 2) +
    Math.pow(color1[1] - color2[1], 2) +
    Math.pow(color1[2] - color2[2], 2)
  );
  return distance < 50; // Adjust threshold as needed
}

// Render matching products with thumbnails
function renderMatchingProducts(products) {
  const productList = document.getElementById('productList');
  productList.innerHTML = ''; // Clear previous results

  if (products.length === 0) {
    // Display error message if no matches found
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'No matching products found. Please try a different image.';
    productList.appendChild(errorMessage);
    return;
  }

  products.forEach(product => {
    const li = document.createElement('li');
    li.style.display = 'flex';
    li.style.alignItems = 'center';
    li.style.marginBottom = '10px';

    // Add product image (thumbnail)
    if (product.file) {
      const img = document.createElement('img');
      img.src = `matched_items/${product.file}`;
      img.alt = product.name;
      img.style.width = '50px';
      img.style.height = '50px';
      img.style.marginRight = '10px';
      li.appendChild(img);
    }

    // Add product name and color
    const productText = document.createElement('span');
    productText.textContent = `${product.name} (${product.color.join(', ')})`;
    li.appendChild(productText);

    productList.appendChild(li);
  });

  // Add a button to download the results as a CSV file
  const downloadButton = document.createElement('button');
  downloadButton.textContent = 'Download Results as CSV';
  downloadButton.onclick = () => downloadCSV(products);
  productList.appendChild(downloadButton);
}

// Download results as a CSV file
function downloadCSV(products) {
  const csvContent = [
    ['Name', 'Category', 'Color'].join(','), // Header row
    ...products.map(product => [product.name, product.category, product.color.join(' ')].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'matching_products.csv';
  link.click();
}

// Main function to handle image upload and processing
document.getElementById('classifyButton').addEventListener('click', async () => {
  const imageInput = document.getElementById('imageInput');
  if (!imageInput.files[0]) {
    alert('Please upload an image!');
    return;
  }

  toggleLoading(true); // Show the loading spinner

  const imageFile = imageInput.files[0];
  const imageElement = document.createElement('img');
  imageElement.src = URL.createObjectURL(imageFile);
  imageElement.onload = async () => {
    const category = await classifyImage(imageElement);
    const color = getItemColor(imageElement);
    const matchingProducts = matchProducts(category, color);
    renderMatchingProducts(matchingProducts);
    toggleLoading(false); // Hide the loading spinner
  };
});

// Load model and dataset on startup
loadModelAndDataset();
