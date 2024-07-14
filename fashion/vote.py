from flask import Flask, request, jsonify
from collections import Counter
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origin=["http://localhost:5173"])

# Initialize a Counter to keep track of votes
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
    app.run(debug=True)
