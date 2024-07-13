import os
import pandas as pd
from flask import Flask, request, jsonify

app = Flask(__name__)

# Load the styles.csv and images.csv files
styles_df = pd.read_csv('styles.csv', sep=',')
images_df = pd.read_csv('images.csv', sep=',')

@app.route('/recommend', methods=['POST'])
def recommend_clothes():
    data = request.get_json()
    print(data)
    if 'season' not in data:
        return jsonify({"error": "Season not provided"}), 400
    
    season = data['season']
    gender = data['gender']
    subCategory = data['subcategory']
    print(season)
    # Filter the DataFrame based on the season
    filtered_df = styles_df[(styles_df['season'] == season) & (styles_df['gender'] == gender) & (styles_df['subCategory'] == subCategory) & (styles_df['usage'] == 'Casual')]
    if filtered_df.empty:
        return jsonify({"error": "No clothes found for the provided season"}), 404

    # Recommend top 5 clothes (or fewer if less than 5 available)
    recommended_df = filtered_df.head(5)
    # Prepare the response
    recommended_images = []
    for index, row in recommended_df.iterrows():
        image_id = row['id']
        print(image_id)
        image_url = images_df.loc[images_df['filename'] == f'{image_id}.jpg', 'link'].values[0]
        print(image_url)
        recommended_images.append(image_url)
    # print(recommended_images)
    return jsonify({"recommended_images": recommended_images})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
