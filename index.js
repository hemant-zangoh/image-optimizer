const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

const initialQuality = 80
const maxSizeKB = 200

/**
 * Optimizes and compresses an image while balancing quality and size.
 * @param {string} inputPath - Path to the input image.
 * @param {string} outputPath - Path where the optimized image should be saved.
 * @param {number} maxSizeKB - Maximum allowed image size in KB.
 * @param {number} width - Width to resize the image to.
 * @param {number} height - Height to resize the image to.
 * @param {string} imageId - Unique image identifier (used for file naming or logging).
 * @param {number} quality - Initial image quality (default: initialQuality).
 * @returns {Promise<void>}
 */

async function optimizeImage(
    inputPath,
    outputPath,
    maxSizeKB,
    width,
    height,
  ) {
    const tempOutputPath = path.join(
      path.dirname(outputPath),
      `temp-${width}x${height}.webp`,
    )
  
    try {
      await sharp(inputPath)
        .resize(width, height)
        .webp({ quality: initialQuality })
        .toFile(tempOutputPath)
  
      const { size } = await fs.stat(tempOutputPath)
      const fileSizeInKB = size / 1024
  
      if (fileSizeInKB > maxSizeKB) {
        await fs.unlink(tempOutputPath)
        return optimizeImage(
          inputPath,
          outputPath,
          maxSizeKB,
          Math.round(width * 0.9),
          Math.round(height * 0.9),
        )
      } else {
        await fs.rename(tempOutputPath, outputPath)
      }
    } catch (error) {
      console.error('Error optimizing the image:', error)
      throw error
    }
  }

module.exports = optimizeImage;
