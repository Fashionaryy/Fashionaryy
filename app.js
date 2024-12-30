async function setBackend() {
  try {
    await tf.setBackend('wasm'); // WebAssembly backend
    console.log('WASM backend is enabled.');
  } catch (error) {
    console.warn('WASM backend failed. Trying WebGL...');
    try {
      await tf.setBackend('webgl'); // WebGL fallback
      console.log('WebGL backend is enabled.');
    } catch (error) {
      console.warn('WebGL backend failed. Using CPU backend...');
      await tf.setBackend('cpu'); // CPU fallback
      console.log('CPU backend is enabled.');
    }
  }
}

// Model ve dataset yolları
const modelPath = './model_tfjs/model.json'; // TensorFlow.js model dosyası yolu
const datasetPath = './dataset.json'; // Dataset JSON dosyası yolu

let model; // Model yeri
let dataset; // Dataset yeri

// Model ve dataset yükleme
async function loadModelAndDataset() {
  try {
    if (typeof tf === 'undefined') {
      throw new Error('TensorFlow.js library is not loaded correctly');
    }

    console.log('Loading TensorFlow backend...');
    await setBackend(); // Backend ayarını bekle

    console.log('Loading model...');
    model = await tf.loadLayersModel(modelPath);
    console.log('Model loaded successfully!');

    console.log('Loading dataset...');
    const response = await fetch(datasetPath);
    if (!response.ok) throw new Error(`Failed to fetch dataset: ${response.statusText}`);
    dataset = await response.json();
    console.log('Dataset loaded successfully!');
  } catch (error) {
    console.error('Error loading model or dataset:', error);
    alert('Failed to load the AI model or dataset. Please check the console for details.');
  }
}

// Görüntünün dominant rengini bulma
function getItemColor(imageElement) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Optimize edilmiş boyutlandırma
  const scale = 100; // Sabit boyut
  canvas.width = Math.min(imageElement.width, scale);
  canvas.height = Math.min(imageElement.height, scale);

  ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  let r = 0, g = 0, b = 0, count = 0;

  for (let i = 0; i < pixels.length; i += 4) {
    r += pixels[i];
    g += pixels[i + 1];
    b += pixels[i + 2];
    count++;
  }

  return [Math.floor(r / count), Math.floor(g / count), Math.floor(b / count)];
}

// Görüntüyü sınıflandırma
async function classifyImage(imageElement) {
  if (!model) {
    throw new Error('Model is not loaded.');
  }

  const tensor = tf.browser
    .fromPixels(imageElement) // Görüntüyü tensora çevir
    .resizeBilinear([224, 224]) // Girdi boyutunu modele göre ayarla
    .toFloat()
    .div(tf.scalar(255)) // Normalize et
    .expandDims(); // Batch boyutunu ekle

  console.log('Input Tensor:', tensor.shape); // Tensor detaylarını kontrol edin

  const predictions = await model.predict(tensor).array();
  console.log('Predictions:', predictions);

  const categories = dataset.categories || ['coats', 'boots', 'pants', 'skirts', 'sweaters']; // Dataset'teki kategoriler
  const categoryIndex = predictions[0].indexOf(Math.max(...predictions[0])); // En yüksek ihtimalli sınıf
  return categories[categoryIndex]; // Sınıf adını döndür
}

// Eşleşen ürünleri gösterme
function renderMatchingProducts(products) {
  const productList = document.getElementById('productList');
  if (!productList) {
    console.error('Product list element is missing.');
    return;
  }

  productList.innerHTML = ''; // Listeyi temizle

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

// Resim yükleme ve işleme
document.getElementById('classifyButton').addEventListener('click', async () => {
  const imageInput = document.getElementById('imageInput');
  const loadingSpinner = document.getElementById('loadingSpinner');

  if (!imageInput.files[0]) {
    alert('Please upload an image!');
    return;
  }

  loadingSpinner.style.display = 'block'; // Yükleme animasyonunu başlat

  try {
    const imageFile = imageInput.files[0];
    const imageElement = new Image();
    imageElement.src = URL.createObjectURL(imageFile);

    imageElement.onload = async () => {
      try {
        const category = await classifyImage(imageElement);
        const color = getItemColor(imageElement);
        console.log('Category:', category);
        console.log('Color:', color);
        renderMatchingProducts([{ name: 'Sample Product', category, color }]);
      } catch (error) {
        console.error('Error during classification:', error);
        alert('Image classification failed.');
      } finally {
        loadingSpinner.style.display = 'none'; // Yükleme animasyonunu durdur
      }
    };
  } catch (error) {
    console.error('Error processing image:', error);
    alert('An error occurred while processing the image.');
    loadingSpinner.style.display = 'none'; // Yükleme animasyonunu durdur
  }
});
