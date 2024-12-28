// Paths to model and dataset
const modelPath = './model_quantized.tflite'; // Path to your TFLite model
const datasetPath = './dataset.json'; // Path to your dataset JSON

let model; // Variable to hold the loaded model
let dataset; // Variable to hold the dataset
let similarityThreshold = 50; // Default similarity threshold for color matching

// Load the TFLite model and dataset
async function loadModelAndDataset() {
  try {
    console.log('Loading model...');
    const tflite = await tflite.loadTFLiteModel(modelPath); // Load TFLite model
    model = tflite;
    console.log('Model loaded successfully!');

    console.log('Loading dataset...');
    const response = await fetch(datasetPath); // Load dataset JSON
    dataset = await response.json();
    console.log('Dataset loaded successfully!');
  } catch (error) {
    console.error('Error loading model or dataset:', error);
    alert('Failed to load the AI model or dataset. Please check the console for details.');
  }
}

// Get dominant color of the image (using canvas)
function getItemColor(imageElement) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Resize canvas to match image dimensions
  const width = imageElement.width;
  const height = imageElement.height;
  canvas.width = width;
  canvas.height = height;

  // Draw the image on the canvas
  ctx.drawImage(imageElement, 0, 0, width, height);

  // Get image data
  const imageData = ctx.getImageData(0, 0, width, height);
  const pixels = imageData.data;

  let r = 0, g = 0, b = 0, count = 0;

  // Calculate average RGB values
  for (let i = 0; i < pixels.length; i += 4) {
    r += pixels[i];     // Red
    g += pixels[i + 1]; // Green
    b += pixels[i + 2]; // Blue
    count++;
  }

  return [Math.floor(r / count), Math.floor(g / count), Math.floor(b / count)];
}

// Classify the image using the AI model
async function classifyImage(imageElement) {
  const tensor = tf.browser
    .fromPixels(imageElement)
    .resizeNearestNeighbor([224, 224]) // Resize image for the model
    .toFloat()
    .expandDims();
  const predictions = model.predict(tensor); // Get predictions from the model
  const categories = ['coats', 'boots', 'pants', 'skirts', 'sweaters']; // Example categories
  const categoryIndex = predictions.argMax(1).dataSync()[0]; // Get category index
  return categories[categoryIndex];
}

// Match products based on category and color
function matchProducts(category, color) {
  // Filter products in the same category and similar color
  let matchingProducts = dataset.filter(product => {
    return (
      product.category === category &&
      isColorSimilar(product.color, color)
    );
  });

  // If no matches found, return all items in the same category
  if (matchingProducts.length === 0) {
    console.log('No exact color match found. Returning items from the same category.');
    matchingProducts = dataset.filter(product => product.category === category);
  }

  return matchingProducts;
}

// Check if colors are similar
function isColorSimilar(color1, color2) {
  const distance = Math.sqrt(
    Math.pow(color1[0] - color2[0], 2) +
    Math.pow(color1[1] - color2[1], 2) +
    Math.pow(color1[2] - color2[2], 2)
  );
  return distance < similarityThreshold; // Adjust threshold as needed
}

// Render matching products
function renderMatchingProducts(products) {
  const productList = document.getElementById('productList');
  productList.innerHTML = ''; // Clear previous results

  if (products.length === 0) {
    // Show error if no matches
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'No matching products found. Please try a different image.';
    productList.appendChild(errorMessage);
    return;
  }

  // Render each product
  products.forEach(product => {
    const li = document.createElement('li');
    li.style.display = 'flex';
    li.style.alignItems = 'center';
    li.style.marginBottom = '10px';

    // Add product image
    if (product.file) {
      const img = document.createElement('img');
      img.src = `./matched_items/${product.file}`;
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
}

// Handle the image upload and process it
document.getElementById('classifyButton').addEventListener('click', async () => {
  const imageInput = document.getElementById('imageInput');
  const imageCanvas = document.getElementById('imageCanvas');
  const ctx = imageCanvas.getContext('2d');
  const loadingSpinner = document.getElementById('loadingSpinner');

  if (!imageInput.files[0]) {
    alert('Please upload an image!');
    return;
  }

  // Show loading spinner
  loadingSpinner.style.display = 'block';

  const imageFile = imageInput.files[0];
  const imageElement = new Image();
  imageElement.src = URL.createObjectURL(imageFile);
  imageElement.onload = async () => {
    // Draw image on canvas
    imageCanvas.width = imageElement.width;
    imageCanvas.height = imageElement.height;
    ctx.drawImage(imageElement, 0, 0);

    // Classify image and find matches
    const category = await classifyImage(imageElement);
    const color = getItemColor(imageElement);
    const matchingProducts = matchProducts(category, color);
    renderMatchingProducts(matchingProducts);

    // Hide loading spinner
    loadingSpinner.style.display = 'none';
  };
});

// Load the model and dataset on page load
loadModelAndDataset();
