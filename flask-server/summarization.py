import re
from gensim.summarization import summarize
import nltk
#nltk.download('punkt')
#nltk.download('stopwords')

def summarize_txt(txt, ratio=False, nwords=False):
    txt = re.sub(r'\n|\r', '. ', txt)
    txt = re.sub(r' +', ' ', txt)
    txt = txt.strip()

    if nwords:
        return summarize(txt, word_count=nwords, split=False)
    if not ratio:
        ratio = 0.2
    return summarize(txt, ratio=ratio, split=False)
