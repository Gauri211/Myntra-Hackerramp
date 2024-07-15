import cv2
import dlib
import numpy as np
from mtcnn.mtcnn import MTCNN
import google.generativeai as genai
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import stone
app = Flask(__name__)
CORS(app, origins=["http://localhost:8000"])

# Initialize MTCNN detector
detector = MTCNN()

def face_detection(gray_img):
    detector = dlib.get_frontal_face_detector()
    faces = detector(gray_img)
    return faces

def landmark_detection(faces, gray_img):
    landmark_detector = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")
    face_points = []
    for face in faces:
        landmarks = landmark_detector(gray_img, face)
        for n in range(68):
            x = landmarks.part(n).x
            y = landmarks.part(n).y
            face_points.append([x, y])
    return np.array(face_points)

def filter_img(img, points, scale=5, masked=False, cropped=True):
    if masked:
        mask = np.zeros_like(img)
        mask = cv2.fillPoly(mask, [points], (255, 255, 255))
        img = cv2.bitwise_and(img, mask)
    if cropped:
        bounding_box = cv2.boundingRect(points)
        x, y, w, h = bounding_box
        cropped_part = img[y:y + h, x:x + w]
        cropped_part = cv2.resize(cropped_part, (0, 0), None, scale, scale)
        return cropped_part
    else:
        return mask

def average_color(img, points):
    mask = np.zeros_like(img)
    cv2.fillPoly(mask, [points], (1, 1, 1))
    masked_img = img * mask
    mean_color = cv2.mean(masked_img, mask[:, :, 0])[:3]
    return mean_color

# Eye color detection helper functions
class_name = ("Blue", "Blue Gray", "Brown", "Brown Gray", "Brown Black", "Green", "Green Gray", "Other")
EyeColor = {
    class_name[0]: ((166, 21, 50), (240, 100, 85)),
    class_name[1]: ((166, 2, 25), (300, 20, 75)),
    class_name[2]: ((2, 20, 20), (40, 100, 60)),
    class_name[3]: ((20, 3, 30), (65, 60, 60)),
    class_name[4]: ((0, 10, 5), (40, 40, 25)),
    class_name[5]: ((60, 21, 50), (165, 100, 85)),
    class_name[6]: ((60, 2, 25), (165, 20, 65))
}

def check_color(hsv, color):
    return (color[0][0] <= hsv[0] <= color[1][0]) and (color[0][1] <= hsv[1] <= color[1][1]) and (color[0][2] <= hsv[2] <= color[1][2])

def find_class(hsv):
    for i in range(len(class_name) - 1):
        if check_color(hsv, EyeColor[class_name[i]]):
            return i
    return 7

def eye_color(image):
    imgRGB = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    imgHSV = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    h, w = image.shape[0:2]
    imgMask = np.zeros((h, w, 1), np.uint8)
    
    result = detector.detect_faces(imgRGB)  # Use RGB image for detection
    if not result:
        print('Warning: Cannot detect any face in the input image!')
        return

    left_eye = result[0]['keypoints']['left_eye']
    right_eye = result[0]['keypoints']['right_eye']

    # Adjust the eye radius calculation
    eye_distance = np.linalg.norm(np.array(left_eye) - np.array(right_eye))
    eye_radius = int(eye_distance / 5)  # Adjusted for better coverage

    cv2.circle(imgMask, left_eye, eye_radius, (255, 255, 255), -1)
    cv2.circle(imgMask, right_eye, eye_radius, (255, 255, 255), -1)

    eye_class = np.zeros(len(class_name), np.float32)
    eye_pixels = []

    for y in range(h):
        for x in range(w):
            if imgMask[y, x] != 0:
                eye_class[find_class(imgHSV[y, x])] += 1
                eye_pixels.append(image[y, x])

    if eye_pixels:
        mean_color = np.mean(eye_pixels, axis=0).astype(int)
        eye_color_hex = '#{:02x}{:02x}{:02x}'.format(mean_color[2], mean_color[1], mean_color[0])
        print("Eye Color (Hex):", eye_color_hex)
        return eye_color_hex

@app.route('/analyze', methods=['POST'])
def analyze():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        file_path = os.path.join(os.getcwd(), file.filename)
        file.save(file_path)

        # Load and prepare the image
        img = cv2.imread(file_path)
        img = cv2.resize(img, (500, 500))
        img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)  # Grayscale for face detection

        # Face detection and landmark detection
        faces = face_detection(img_gray)
        face_landmarks = landmark_detection(faces, img_gray)

        # Lip color detection
        img_lips = filter_img(img, face_landmarks[49:61], 3, masked=True, cropped=False)
        lip_color = average_color(img, face_landmarks[49:61])
        lip_color_rgb = (lip_color[2], lip_color[1], lip_color[0])
        lip_color_hex = '#{:02x}{:02x}{:02x}'.format(int(lip_color_rgb[0]), int(lip_color_rgb[1]), int(lip_color_rgb[2]))

        print("Lip Color (Hex):", lip_color_hex)
        result = stone.process(file_path, image_type="color", return_report_image=True)

        # Extract skin tone
        if 'faces' in result and len(result['faces']) > 0:
            skin_color_hex = result['faces'][0]['skin_tone']  # Adjust based on actual structure
        else:
            print("Warning: No faces detected or skin tone information is not available.")
            skin_color_hex = None

        print("Skin Tone:", skin_color_hex)

        # Eye color detection
        eye_color_hex = eye_color(img)

        # Set up the Google Gemini API
        genai.configure(api_key='GEMINI_API_KEY')  # Replace with your actual API key
        model = genai.GenerativeModel('gemini-pro')

        # Prepare the dynamic prompt
        prompt = (
            f"The Korean color analysis system is commonly referred to as the 'Korean Personal Color Analysis' or simply 'Personal Color Analysis' in Korea. "
            f"My current hex codes are: Lip Color: {lip_color_hex}, Skin Color: {skin_color_hex}, Eye Color: {eye_color_hex}. Hair color hex is #241c11.  "
            f"Identify the season I belong to and accordingly give me colors that are best suited for me. The response should be in the form "
            f"1. Season identified (only one) -[Autumn or Spring or Winter or Summer]"
            f"2. Colors that would be best suited for me (give me hex codes only and there should be only six colors). Don't give anything else. Only two points."
        )

        # Generate the response
        response = model.generate_content(prompt)
        response_text = response.text

        print(response_text)

        season = ""
        hex_colors = []

        # Split the response into lines
        lines = response_text.split('\n')
        for line in lines:
            if line.startswith("1."):
                # Extract season
                season = line.split("1. ")[1].strip()
            elif line.startswith("2."):
                # Extract colors
                hex_colors = line.split("2. ")[1].strip().split(', ')

        # Generate recommendations for similar colors
        prompt_recommendation = (
            f"Given the following hex colors: {', '.join(hex_colors)}, "
            "please provide the names of any similar colors from this dataset: "
            "['Navy Blue', 'Blue', 'Silver', 'Black', 'Grey', 'Green', 'Purple', 'White', "
            "'Beige', 'Brown', 'Bronze', 'Teal', 'Copper', 'Pink', 'Off White', 'Maroon', "
            "'Red', 'Khaki', 'Orange', 'Coffee Brown', 'Yellow', 'Charcoal', 'Gold', 'Steel', "
            "'Tan', 'Multi', 'Magenta', 'Lavender', 'Sea Green', 'Cream', 'Peach', 'Olive', "
            "'Skin', 'Burgundy', 'Grey Melange', 'Rust', 'Rose', 'Lime Green', 'Mauve', "
            "'Turquoise Blue', 'Metallic', 'Mustard', 'Taupe', 'Nude', 'Mushroom Brown', "
            "'Fluorescent Green'] and return only the names of 5 matching colors."
        )
        response_recommendation = model.generate_content(prompt_recommendation)
        recc_list = response_recommendation.text.strip().split('\n')

        print(response_recommendation.text)

        result = {
            "Season": season,
            "Hex Colors": hex_colors,
            "Recc List": recc_list
        }

        return jsonify(result)

if __name__ == '__main__':
    app.run(port=8000,debug=True)
