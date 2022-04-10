from flask import Flask, jsonify, request
from flask_cors import CORS
from summarization import summarize_txt
from suggestion import TextAnalyzer


app = Flask(__name__)
CORS(app)
 
@app.route('/test', methods =['POST'])
def test():
   return jsonify({"Result": request.json['transcript']})
 
@app.route('/summarize', methods =['POST'])
def summarize():
# call the summary function here to get the summary
   #txt = request.json['transcript']
   txt = """
   This is sentence 1. 
   This is sentence 2. 
   This is sentence 3. 
   This is sentence 4. 
   This is sentence 5. 
   This is sentence 6. 
   This is sentence 7. 
   This is sentence 8. 
   This is sentence 9. 
   This is sentence 10. 
   This is sentence 11. 
   This is sentence 12. 
   """
   summary = summarize_txt(txt) # of type text
   #summary = "aaaa hahaha"
   return jsonify({"Result": summary})

@app.route('/suggest', methods =['POST'])
def suggest():
# call the summary function here to get the summary
   #txt = request.json['transcript']
   txt = """
    Your only chance of survival, if you are sincerely smitten, lies in hiding this fact from the woman you love, of feigning a casual detachment under all circumstances. What sadness there is in this simple observation! What an accusation against man! However, it had never occurred to me to contest this law, nor to imagine disobeying it: love makes you weak, and the weaker of the two is oppressed, tortured and finally killed by the other, who in his or her turn oppresses, tortures and kills without having evil intentions, without even getting pleasure from it, with complete indifference; that’s what men, normally, call love.
    Christ, he thinks, by my age I ought to know. You don’t get on by being original. You don’t get on by being bright. You don’t get on by being strong. You get on by being a subtle crook; somehow he thinks that’s what Norris is, and he feels an irrational dislike taking root, and he tries to dismiss it, because he prefers his dislikes rational, but after all, these circumstances are extreme, the cardinal in the mud, the humiliating tussle to get him back in the saddle, the talking, talking on the barge, and worse, the talking, talking on his knees, as if Wolsey’s unravelling, in a great unweaving of scarlet thread that might lead you back into a scarlet labyrinth, with a dying monster at its heart.
    """
   t = TextAnalyzer(txt=txt)
   try:
      suggestion = t.run()
   except Exception as e:
      suggestion = ""
   #summary = "aaaa hahaha"
   return jsonify({"Result": suggestion})

if __name__ == '__main__':
   app.run(debug = True)