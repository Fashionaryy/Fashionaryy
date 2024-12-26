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

// Get dominant color
function getDominantColor(imageElement) {
  const colorThief = new ColorThief();
  const dominantColor = colorThief.getColor(imageElement); // Returns [R, G, B]
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

// Render matching products with links to their files
function renderMatchingProducts(products) {
  const productList = document.getElementById('productList');
  productList.innerHTML = ''; // Clear previous results

  products.forEach(product => {
    const li = document.createElement('li');

    // Add product name and color
    li.textContent = `${product.name} (${product.color.join(', ')})`;

    // Add link to product file if available
    if (product.file) {
      const link = document.createElement('a');
      link.href = `matched_items/${product.file}`;
      link.textContent = ' [View Item]';
      link.target = '_blank'; // Open in new tab
      li.appendChild(link);
    }

    productList.appendChild(li);
  });
}

// Main function to handle image upload and processing
document.getElementById('classifyButton').addEventListener('click', async () => {
  const imageInput = document.getElementById('imageInput');
  if (!imageInput.files[0]) {
    alert('Please upload an image!');
    return;
  }

  const imageFile = imageInput.files[0];
  const imageElement = document.createElement('img');
  imageElement.src = URL.createObjectURL(imageFile);
  imageElement.onload = async () => {
    const category = await classifyImage(imageElement);
    const color = getDominantColor(imageElement);
    const matchingProducts = matchProducts(category, color);
    renderMatchingProducts(matchingProducts);
  };
});

// Load model and dataset on startup
loadModelAndDataset();
