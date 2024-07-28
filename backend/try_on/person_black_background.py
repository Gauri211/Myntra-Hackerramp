from rembg import remove
from PIL import Image

# Input and output paths
input_path = 'output_with_black_background.png'
output_path = 'abcd.png'

# Open the input image
input_image = Image.open(input_path)

# Remove the background from the input image
foreground_image = remove(input_image)

# Create a black background image with the same size as the foreground
black_background = Image.new("RGBA", foreground_image.size, (0, 0, 0, 255))

# Ensure the foreground image is in RGBA mode
foreground_image = foreground_image.convert("RGBA")

# Composite the images: overlay the foreground on the black background
combined_image = Image.alpha_composite(black_background, foreground_image)

# Save the final image
combined_image.save(output_path)
