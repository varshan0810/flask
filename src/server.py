from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
# CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}}) #/* allow request only /api/* other routes are restricted
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}) #/* allow requests all path

mongo_client = MongoClient("mongodb://localhost:27017/")
db = mongo_client["todo"]  
tasks_collection = db["tasks"] 


@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "working"})


@app.route('/submit-form',methods=["POST", "GET"])
def form_submission():
    if request.method == "POST":
        data = request.get_json()
        name = data.get('name')
        dept = data.get('dept')
        comment = data.get('comment')
        print(name, dept, comment)
        tasks_collection.insert_one({'studentName':name,'studentDept':dept,'studentComment':comment})
        return jsonify({"message": "eh epura submit aaittu"}), 200
    return jsonify({"message": "Na ready thaan varavaa...."}), 200


if __name__ == "__main__":
    app.run(debug=True)