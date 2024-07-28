import numpy as np
from matplotlib.image import imread, imsave
from scipy import ndimage
import matplotlib.pyplot as plt
import os

# Path to the original image
image_path = 'ZX121DA0E-Q11@6=person_whole_front.png'

# Read the image and bring it as an array
original_image = imread(image_path)

# Convert to grayscale if the image is in color
if original_image.ndim == 3:
    grayscale_image = np.dot(original_image[...,:3], [0.2989, 0.5870, 0.1140])
else:
    grayscale_image = original_image

# Apply the Sobel filter in the x and y directions
dx = ndimage.sobel(grayscale_image, axis=0)
dy = ndimage.sobel(grayscale_image, axis=1)
sobel_filtered_image = np.hypot(dx, dy)  # (dx^2 + dy^2)^0.5
sobel_filtered_image = sobel_filtered_image / np.max(sobel_filtered_image)  # normalization step

# Save the sobel filtered image to the same directory
output_path = os.path.join(os.path.dirname(image_path), 'sobel_filtered_image.PNG')
imsave(output_path, sobel_filtered_image, cmap='gray')