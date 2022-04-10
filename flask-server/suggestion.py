import warnings
import os
from gensim.summarization import keywords
from gensim.models import KeyedVectors
import spacy
import yake
from collections import Counter
from string import punctuation
import pytextrank
from nltk.corpus import wordnet
from punctuator import Punctuator
import nltk
import re
from gensim.summarization import summarize
nltk.download("wordnet")
nltk.download('punkt')
nltk.download('stopwords')

os.environ["SPACY_WARNING_IGNORE"] = "W008"
warnings.filterwarnings("ignore", message=r"\[W008\]", category=UserWarning)
nltk.download('omw-1.4')


class TextAnalyzer():
    def __init__(self, model="en_core_web_lg", txt=None, level=1):
        self.nlp = spacy.load(model)
        if not txt:
            try:
                with open("input.txt") as f:
                    txt = ' '.join(f.readlines())
            except Exception as e:
                print("You must provide text or the input.txt file")
                exit()
        self.txt = self.add_punctuation(txt)
        self._pos_tag = ['PROPN', 'ADJ', 'NOUN']
        self.orig_doc = self.nlp(self.txt)
        self.language = "en"
        if level == 1:
            self.thresh = 0.1
        if level == 2:
            self.thresh = 0.01
        else:
            self.thresh = 0.005

    def __str__(self):
        return self.txt

    def add_punctuation(self, txt):
        p = Punctuator('models/Demo-Europarl-EN.pcl')
        return p.punctuate(txt)

    def get_keywords_spacy(self, n):
        result = []

        doc = self.nlp(self.txt.lower())
        for token in doc:
            if(token.text in self.nlp.Defaults.stop_words or token.text in punctuation):
                continue
            if(token.pos_ in self._pos_tag):
                result.append(token)
        result.sort(key=lambda x: x.vector_norm, reverse=True)
        return list(set([w.text for w in result[:n]]))

    def get_keywords_yake(self, n, max_ngram=3):
        result = []

        kw_extractor = yake.KeywordExtractor(
            lan=self.language, n=max_ngram, dedupLim=0.9, top=n, features=None)
        return kw_extractor.extract_keywords(self.txt)

    def get_keywords_gensim(self):
        return keywords(self.txt)

    def get_connected_keywords(self, n=10):
        self.nlp.add_pipe("textrank")
        doc = self.nlp(self.txt)
        return list(set([t.text.lower() for t in doc._.phrases[:n+1]]))

    def _find_synonym(self, phrase):
        synonyms = []
        for syn in wordnet.synsets(phrase):
            for l in syn.lemmas():
                synonyms.append(l.name())
        return list(set([syn.lower() for syn in synonyms]))

    def find_synonym_list(self, phrases):
        synonyms = []
        for w in phrases:
            res = self._find_synonym(w)
            synonyms.extend(res)
        return synonyms

    def get_similarity(self, orig, phrases, nwords=None):
        phrase_similarity = []

        for phrase in phrases:
            doc2 = self.nlp(phrase)
            p = self.orig_doc.similarity(doc2)

            if p > self.thresh:
                phrase_similarity.append([phrase, p])

        phrase_similarity.sort(key=lambda x: x[1], reverse=True)

        if nwords and nwords < len(phrase_similarity):
            phrase_similarity = phrase_similarity[:nwords]
        return phrase_similarity

    def summarize_txt(self, ratio=False, nwords=False):
        txt = re.sub(r'\n|\r', '. ', self.txt)
        txt = re.sub(r' +', ' ', txt)
        txt = txt.strip()

        if nwords:
            return summarize(txt, word_count=nwords, split=False)
        if not ratio:
            ratio = 0.2
        return summarize(txt, ratio=ratio, split=False)

    def run(self):
        kw = self.get_keywords_yake(n=10)
        kw2 = self.get_keywords_gensim().split('\n')
        kw3 = self.get_keywords_spacy(n=10)
        l = [w[0] for w in kw]
        l.extend(kw2)
        syn = self.find_synonym_list(l)
        output = self.get_similarity(kw, syn)
        return [w[0] for w in output]


if __name__ == "__main__":
    txt = """
    your only chance of survival if you are sincerely smitten lies in hiding this fact from the woman you love of feigning a casual detachment under all circumstances what sadness there is in this simple observation what an accusation against man however it had never occurred to me to contest this law nor to imagine disobeying it love makes you weak and the weaker of the two is oppressed tortured and finally killed by the other who in his or her turn oppresses tortures and kills without having evil intentions without even getting pleasure from it with complete indifference that’s what men normally call love christ he thinks by my age I ought to know You don’t get on by being original you don’t get on by being bright You don’t get on by being strong You get on by being a subtle crook somehow he thinks that’s what Norris is and he feels an irrational dislike taking root and he tries to dismiss it because he prefers his dislikes rational but after all these circumstances are extreme the cardinal in the mud the humiliating tussle to get him back in the saddle the talking talking on the barge and worse the talking talking on his knees as if Wolsey’s unravelling in a great unweaving of scarlet thread that might lead you back into a scarlet labyrinth with a dying monster at its heart
    """

    t = TextAnalyzer(txt=txt)
    print(str(t))
    output = t.summarize_txt()
    print(output)
