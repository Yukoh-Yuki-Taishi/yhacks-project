from flask import Flask, jsonify, request
from flask_cors import CORS
from summarization import summarize_txt
# from suggestion import 


app = Flask(__name__)
CORS(app)
 
@app.route('/test', methods =['POST'])
def test():
   return jsonify({"Result": request.json['transcript']})
 
@app.route('/summarize', methods =['POST'])
def summarize():
# call the summary function here to get the summary
   txt = "yo"
   summary = summarize(txt) # of type text
   return jsonify({"Result": request.json['transcript']})
 

if __name__ == '__main__':
    app.run(debug = True)