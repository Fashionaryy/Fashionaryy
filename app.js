// Set TensorFlow.js Backend
async function setBackend() {
  try {
    await tf.setBackend('wasm'); // Set WebAssembly backend
    console.log('WASM backend is enabled.');
  } catch (error) {
    console.warn('WASM backend failed. Trying WebGL...');
    try {
      await tf.setBackend('webgl'); // Fallback to WebGL
      console.log('WebGL backend is enabled.');
    } catch (error) {
      console.warn('WebGL backend failed. Using CPU backend...');
      await tf.setBackend('cpu'); // Fallback to CPU
      console.log('CPU backend is enabled.');
    }
  }
}

// Call setBackend before loading the model
setBackend();

// Paths to model and dataset
const modelPath = './model_tfjs/model.json'; // Path to the TensorFlow.js converted model
const datasetPath = './dataset.json'; // Path to your dataset JSON

let model; // Variable to hold the loaded model
let dataset; // Variable to hold the dataset
let similarityThreshold = 50; // Default similarity threshold for color matching

async function loadModelAndDataset() {
  try {
    // Check if TensorFlow.js is loaded
    if (typeof tf === 'undefined') {
      throw new Error('TensorFlow.js library is not loaded correctly');
    }

    console.log('Loading model...');
    // Load the model (TensorFlow.js format)
    model = await tf.loadLayersModel(modelPath); // Use TensorFlow.js's loadLayersModel for H5 models
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
  canvas.width = imageElement.width;
  canvas.height = imageElement.height;

  // Draw the image on the canvas
  ctx.drawImage(imageElement, 0, 0);

  // Get image data
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
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
  const predictions = await model.predict(tensor); // Get predictions from the model
  const categories = ['coats', 'boots', 'pants', 'skirts', 'sweaters']; // Example categories
  const categoryIndex = predictions.argMax(1).dataSync()[0]; // Get category index
  return categories[categoryIndex];
}

// Render matching products
function renderMatchingProducts(products) {
  const productList = document.getElementById('productList');
  productList.innerHTML = ''; // Clear previous results

  if (products.length === 0) {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'No matching products found.';
    productList.appendChild(errorMessage);
    return;
  }

  products.forEach(product => {
    const li = document.createElement('li');
    li.textContent = `${product.name} - ${product.category} (${product.color.join(', ')})`;
    productList.appendChild(li);
  });
}

// Handle the image upload and process it
document.getElementById('classifyButton').addEventListener('click', async () => {
  const imageInput = document.getElementById('imageInput');
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
    const category = await classifyImage(imageElement);
    const color = getItemColor(imageElement);
    console.log('Category:', category);
    console.log('Color:', color);
    renderMatchingProducts([{ name: 'Sample Product', category, color }]);

    // Hide loading spinner
    loadingSpinner.style.display = 'none';
  };
});

// Load the model and dataset on page load
loadModelAndDataset();
