async function setBackend() {

try {

await tf.setBackend('wasm'); 

console.log('WASM backend is enabled.');

} catch (error) {

console.warn('WASM backend failed. Trying WebGL...');

try {

await tf.setBackend('webgl'); 

console.log('WebGL backend is enabled.');

} catch (error) {

console.warn('WebGL backend failed. Using CPU backend...');

await tf.setBackend('cpu'); 

console.log('CPU backend is enabled.');

}

}

}



const modelPath = './model_tfjs/model.json'; 

const datasetPath = './dataset.json'; 

let model; 

let dataset; 



async function loadModelAndDataset() {

try {

if (typeof tf === 'undefined') {

throw new Error('TensorFlow.js library is not loaded correctly');

}

console.log('Loading TensorFlow backend...');

await setBackend(); 

console.log('Loading model...');

model = await tf.loadLayersModel(modelPath);

console.log('Model loaded successfully!');

console.log('Loading dataset...');

const response = await fetch(datasetPath);

if (!response.ok) throw new Error(Failed to fetch dataset: ${response.statusText});

dataset = await response.json();

console.log('Dataset loaded successfully!');

} catch (error) {

console.error('Error loading model or dataset:', error);

alert('Failed to load the AI model or dataset. Please check the console for details.');

}

}



function getItemColor(imageElement) {

const canvas = document.createElement('canvas');

const ctx = canvas.getContext('2d');



const scale = 100; 

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

/

async function classifyImage(imageElement) {

if (!model) {

throw new Error('Model is not loaded.');



}
        
        const predictions = await model.predict(input).data();
      console.log("Tahminler:",predictions)
       
        const predictedClass = predictions.indexOf(Math.max(...predictions));
        console.log("Tahmin Edilen Sınıf:", predictedClass);
        return predictedClass; 
    } catch (error) {
        console.error("Görüntü sınıflandırma hatası:", error);
        return null; 
    }
}


async function processImage(imageElement) {
    await loadModelAndDataset(); 
    if(model){
    const dominantColor = getItemColor(imageElement);
    console.log("Baskın Renk:", dominantColor);

    const predictedClass = await classifyImage(imageElement);
    if (predictedClass !== null) {
        console.log("Sınıflandırma Başarılı!");
    } else {
        console.log("Sınıflandırma Başarısız!");
    }
}
}

window.addEventListener('load', (event) => {
    loadModelAndDataset();
});

  const tensor = tf.browser
    .fromPixels(imageElement) 
    .resizeBilinear([224, 224]) 
    .toFloat()
    .div(tf.scalar(255)) 
    .expandDims(); 

  console.log('Input Tensor:', tensor.shape); 
  const predictions = await model.predict(tensor).array();
  console.log('Predictions:', predictions);

  const categories = dataset.categories || ['coats', 'boots', 'pants', 'skirts', 'sweaters']; 
  const categoryIndex = predictions[0].indexOf(Math.max(...predictions[0])); lli sınıf
  return categories[categoryIndex]; 
}


function renderMatchingProducts(products) {
  const productList = document.getElementById('productList');
  if (!productList) {
    console.error('Product list element is missing.');
    return;
  }

  productList.innerHTML = ''; 

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

  loadingSpinner.style.display = 'block'; 

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
        loadingSpinner.style.display = 'none'; 
      }
    };
  } catch (error) {
    console.error('Error processing image:', error);
    alert('An error occurred while processing the image.');
    loadingSpinner.style.display = 'none'; 
  }
});
