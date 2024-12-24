// Load the TensorFlow.js model
async function loadModel() {
    try {
        const model = await tf.loadGraphModel('model/model.json'); // Adjust the path if necessary
        console.log('Model loaded successfully!');
        return model;
    } catch (error) {
        console.error('Error loading the model:', error);
    }
}

// Preprocess the image to fit the model input
function preprocessImage(image) {
    return tf.browser.fromPixels(image)               // Convert image to a tensor
        .resizeNearestNeighbor([224, 224])            // Resize to 224x224 (ResNet50 input size)
        .toFloat()                                    // Convert to float
        .div(tf.scalar(255.0))                        // Normalize pixel values to [0, 1]
        .expandDims();                                // Add batch dimension
}

// Make predictions and display the result
async function predictAndDisplay(imageElement) {
    const model = await loadModel();
    if (!model) return; // Exit if model loading fails

    const tensor = preprocessImage(imageElement);     // Preprocess the input image
    const predictions = await model.predict(tensor).data(); // Run inference
    tensor.dispose(); // Clean up tensors to free memory

    // Class names corresponding to the model outputs
    const classNames = ['Dresses', 'Shirts', 'Pants']; 
    const predictedClassIndex = predictions.indexOf(Math.max(...predictions));
    const predictedClass = classNames[predictedClassIndex];

    // Display the prediction
    document.getElementById('result').innerText = `Prediction: ${predictedClass}`;
    console.log('Predictions:', predictions);
    console.log('Predicted Class:', predictedClass);
}

// Handle file upload and display the prediction
document.getElementById('upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) {
        document.getElementById('result').innerText = 'Please upload an image.';
        return;
    }

    const imageElement = document.createElement('img'); // Create an image element
    imageElement.src = URL.createObjectURL(file);
    imageElement.onload = () => {
        predictAndDisplay(imageElement); // Call prediction function
    };

    // Clean up after image preview
    imageElement.onerror = () => {
        document.getElementById('result').innerText = 'Failed to load the image.';
    };
});
