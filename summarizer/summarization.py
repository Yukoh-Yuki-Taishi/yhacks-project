import re
from gensim.summarization import summarize
import nltk
nltk.download('punkt')
nltk.download('stopwords')

def summarize_txt(txt, ratio=False, nwords=False):
    xt = re.sub(r'\n|\r', ' ', txt)
    txt = re.sub(r' +', ' ', txt)
    txt = txt.strip()

    if nwords:
        return summarize(txt, word_count=nwords, split=False)
    if not ratio:
        ratio = 0.2
    return summarize(txt, ratio=ratio, split=False)


if __name__ == "__main__":
    with open("input.txt") as f:
        txt = ''.join(f.readlines())
