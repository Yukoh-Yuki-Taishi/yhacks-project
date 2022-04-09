import spacy
from collections import Counter
from string import punctuation
import pytextrank
from nltk.corpus import wordnet
import nltk
# from monkeylearn import MonkeyLearn
# nltk.download('omw-1.4')


class TextAnalyzer():
    def __init__(self, model="en_core_web_sm", txt=None):
        self.nlp = spacy.load(model)
        if not txt:
            with open("input.txt") as f:
                self.txt = ' '.join(f.readlines())
        else:
            self.txt = txt
        self._pos_tag = ['PROPN', 'ADJ', 'NOUN']

    def get_keywords(self, n):
        result = []
        doc = self.nlp(self.txt.lower())
        for token in doc:
            if(token.text in self.nlp.Defaults.stop_words or token.text in punctuation):
                continue
            if(token.pos_ in self._pos_tag):
                result.append(token)
        result.sort(key=lambda x: x.vector_norm, reverse=True)
        return list(set(result[:n]))

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

    def run(self):
        kw = self.get_keywords(n=10)
        print(kw)
        syn = self.find_synonym_list(kw)
        print(syn)


if __name__ == "__main__":
    t = TextAnalyzer()
    # t.run()
    # print(t._find_synonym("word"))
    print(t.find_synonym_list(["word", "bible"]))
    

