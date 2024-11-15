# PicShrinks

PicShrinks is a simple and efficient image optimization library using the `sharp` package. It helps you compress and resize images, ensuring the file size is reduced while maintaining a high level of visual quality.

## Features

- Resizes images to specified dimensions (width and height).
- Converts images to WebP format with adjustable quality.
- Compresses images to ensure that the file size is under a specified limit (in KB).
- Recursively resizes and compresses the image until the file size is within the desired threshold.

## Installation

To install `picshrinks`, run the following command:

```bash
npm install picshrinks
```

# Usage

## Example

Here's how you can use the picshrinks library to optimize an image:

```
const optimizeImage = require('picshrinks'); // Assuming you installed 'picshrinks'

const inputPath = './input-image.jpg';  // Path to the input image
const outputPath = './output-image.webp'; // Path where the optimized image will be saved
const maxSizeKB = 200;  // Maximum allowed image size in KB
const width = 800;  // Target width
const height = 600; // Target height

optimizeImage(inputPath, outputPath, maxSizeKB, width, height)
  .then(() => {
    console.log('Image optimized successfully!');
  })
  .catch((error) => {
    console.error('Error optimizing image:', error);
  });
```

## Parameters
- inputPath (string): The path to the input image.
- outputPath (string): The path where the optimized image will be saved.
- maxSizeKB (number): The maximum file size (in KB) that the output image should have.
- width (number): The target width to resize the image.
- height (number): The target height to resize the image.

## How It Works
- Resize & Convert: The image is resized to the specified width and height, then converted to the WebP format with an initial compression quality of 80.
- File Size Check: After compression, the function checks if the image’s size exceeds the specified maxSizeKB. If it does, the function reduces the dimensions of the image by 10% and tries again.
- Save Image: Once the image meets the file size requirement, it is saved to the provided output path.
