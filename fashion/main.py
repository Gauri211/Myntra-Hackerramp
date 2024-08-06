from flask import Flask, request, jsonify
from PIL import Image
import numpy as np
import pickle
import tensorflow as tf
from tensorflow.keras.preprocessing import image
from tensorflow.keras.layers import GlobalMaxPooling2D
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
from sklearn.neighbors import NearestNeighbors
from numpy.linalg import norm
import os
import re
import pandas as pd
from flask_cors import CORS
import requests
import time
from collections import Counter

app = Flask(__name__)
CORS(app, origin=["http://localhost:5173"])

# Load the precomputed embeddings and filenames
feature_list = np.array(pickle.load(open('embeddings.pkl', 'rb')))
filenames = pickle.load(open('filenames.pkl', 'rb'))

# Load the ResNet50 model
model = ResNet50(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
model.trainable = False

model = tf.keras.Sequential([
    model,
    GlobalMaxPooling2D()
])

image_df = pd.read_csv("images.csv", sep=',')
image_dict = dict(zip(image_df['filename'], image_df['link']))
df = pd.read_csv('styles.csv', sep=',')

def feature_extraction(img_path, model):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    expanded_img_array = np.expand_dims(img_array, axis=0)
    preprocessed_img = preprocess_input(expanded_img_array)
    result = model.predict(preprocessed_img).flatten()
    normalized_result = result / norm(result)

    return normalized_result

def recommend(features, feature_list):
    neighbors = NearestNeighbors(n_neighbors=6, algorithm='brute', metric='euclidean')
    neighbors.fit(feature_list)

    distances, indices = neighbors.kneighbors([features])

    return indices

def recommend_fashion(file):
    if file.filename == '':
        return jsonify({"error": "No file selected for uploading"}), 400

    if file:
        file_path = os.path.join('uploads', file.filename)
        file.save(file_path)

        # Extract features
        features = feature_extraction(file_path, model)
        
        # Get recommendations
        indices = recommend(features, feature_list)
        
        # Prepare the response
        recommended_files = [filenames[idx] for idx in indices[0][1:]]  # Skip the first as it is the input image itself
        rf = [f"/images/{filename}" for filename in recommended_files] 
        recommended_urls = [re.search(r'[^\\/]+$', filename).group() for filename in rf] # Adjust the path accordingly
        
        return recommended_urls

@app.route('/recommend', methods=['POST'])
def final_output():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']
    recommended_filenames = recommend_fashion(file)
    
    # Get the links for the recommended filenames
    recommended_links = [image_dict[filename] for filename in recommended_filenames if filename in image_dict]

    return jsonify({"recommended_images": recommended_links})
    

@app.route('/colorrec', methods=['POST'])
def colorAnalysis():
    # Make a request to the external API
    response = requests.post('https://localhost:5000/analyze', files=request.files)  # Replace with your actual URL
    
    time.sleep(5)
    print(response)
    if response.status_code != 200:
        return jsonify({"error": "Failed to retrieve color data"}), 500
    
    # Extract the recc_list from the JSON response
    color_data = response.json()  # Adjust based on the response structure
    recc_list = color_data.get("Recc List", [])  # Adjust based on the actual JSON structure

    # Clean the recc_list by removing the leading dash and space
    cleaned_recc_list = [color.strip("- ").strip() for color in recc_list]
    print(cleaned_recc_list)
    # Filter styles based on the cleaned_recc_list
    women_df = df[(df['gender'] == 'Women') & (df['masterCategory']=='Apparel') & (df['masterCategory'] == 'Accessories') & (df['baseColour'].isin(cleaned_recc_list))]
    print(women_df)
    num_random_ids = 5  # Adjust this number as needed
    random_ids = women_df['id'].sample(n=num_random_ids).tolist()

    # Add .jpg to each selected ID
    random_ids_with_extension = [f"{str(id)}.jpg" for id in random_ids]

    # Map the modified IDs to the filename column in the images dataset
    mapped_images = image_df[image_df['filename'].isin(random_ids_with_extension)]

    links = mapped_images['link'].tolist()

    # Prepare the final response
    color_data["Recc List"] = cleaned_recc_list
    color_data["Links"] = links

    return jsonify(color_data) # Return as JSON response

votes = Counter({'A': 0, 'B': 0, 'C': 0})

@app.route('/vote', methods=['POST'])
def vote():
    data = request.json
    option = data.get('option')
    if option not in votes:
        return jsonify({"error": "Invalid option"}), 400
    
    votes[option] += 1
    return jsonify({"message": "Vote counted"}), 200

@app.route('/counts', methods=['GET'])
def get_counts():
    return jsonify(votes)

if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    app.run(host='0.0.0.0', port=5001, debug=True)
