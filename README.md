# Myntra Hackerramp <img src="https://github.com/user-attachments/assets/3602ef68-4de8-46dd-b8b1-0c23ed087d6e" alt="Myntra_logo" width="50" height="50">

## 3D Virtual Try On
### Overview
Experience a 3D virtual try-on, viewing yourself in various apparel for a realistic fashion preview.
### Models Used
- DRM Model (Dense Regression Model): Ensures clothing items fit well on the target body through detailed alignment and warping.

- MTM Model (Multi-pose Transfer Model): Handles different poses of the human model to ensure correct clothing fit regardless of pose.

- TFM Model (Texture Fusion Model): Integrates texture details to make the final image look realistic by seamlessly combining clothing and the human model.

- Vgg19 Model: A deep convolutional neural network with 19 layers (16 convolutional layers and 3 fully connected layers). Used for feature extraction to ensure generated images are visually similar to the original, improving realism and training stability.

## Color Analysis
### Overview
Get your skin tone analyzed to discover the most flattering clothing colors, providing you with personalized fashion advice.
### Models Used
-	MTCNN: For face detection and keypoint detection.
-	Dlib: For face and facial landmark detection.
-	OpenCV: For various image processing tasks.
-	Google's Gemini Generative Model: For generating textual content and recommendations.

## Trend Centric Recommendation
### Overview
An interactive voting system where users can influence and select their favorite fashion trends, subsequently making them the latest trends based on community votes. The app dynamically updates recommended fashion items based on these chosen trends.
### Technologies Used
-	Flask: Manages HTTP requests and responses, providing a robust web framework.
-	Pandas: Facilitates data manipulation tasks, ensuring efficient handling of datasets.
-	TensorFlow/Keras: Implements deep learning functionalities with the ResNet50 model for image feature extraction.

## Live Demo
https://github.com/user-attachments/assets/29deaae8-b4ee-4a88-9dbc-23429b967ab1