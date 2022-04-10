from flask import Flask, jsonify, request
from flask_cors import CORS
from summarization import summarize_txt
from suggestion import TextAnalyzer
import sqlalchemy

app = Flask(__name__)
CORS(app)


@app.route('/test', methods=['POST'])
def test():
   return jsonify({"Result": request.json['transcript']})


@app.route('/summarize', methods=['POST'])
def summarize():
   # call the summary function here to get the summary
   txt = request.json['transcript']
   print("orig_text: ", txt)
   t = TextAnalyzer(txt=txt)
   print(str(t))
   summary = t.summarize_txt()  # of type text
   print(summary)
   return jsonify({"Result": summary})


@app.route('/suggest', methods=['POST'])
def suggest():
   # call the summary function here to get the summary
   txt = request.json['transcript']
   print("orig_txt: ", txt)
   t = TextAnalyzer(txt=txt)
   try:
      suggestion = t.run()
   except Exception as e:
      suggestion = "WARNING: you must have more than 10 sentences for us to summarize text"
   suggestion = list(set(suggestion))
   print(suggestion)
   return jsonify({"Result": suggestion})


if __name__ == '__main__':
   app.run(debug=True)
