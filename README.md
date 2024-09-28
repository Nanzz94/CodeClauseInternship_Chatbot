This is the beginner level project of codeclause internship.
"**commands to run this repo**"
1. clone this repo
2. cd chatbot-deployment
3. python3 -m venv venv
4. venv/Scripts/activate
5. pip install Flask torch torchvision nltk
6.  python
>>> import nltk
>>> nltk.download('punkt_tab')
7.python train.py
"** This will dump data.pth file. And then run the following command to test it in the console.**"
8. python chat.py
9. pip install -r requirements.txt
10.waitress-serve --port=8000 app:app
"**Then type http://localhost:8000 in your browser to run the flask application**"
