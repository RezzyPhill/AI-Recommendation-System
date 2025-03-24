import pandas as pd
import os
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB

os.makedirs('model', exist_ok=True)

movies = pd.read_csv('movies!.csv')
print(movies.columns)
#movies = movies[['Series_Title', 'Genre', 'Released_Year', 'Runtime', 'Director', 'Star1', 'Star2', 'Star3', 'Star4']].dropna()

vectorizer = TfidfVectorizer(stop_words='english')
X = vectorizer.fit_transform(movies['Overview'])
y = movies['Genre']

model = MultinomialNB
model.fit(X, y)

joblib.dump(model, 'model/movie_model.pkl')
joblib.dump(model, 'model/vectorizer.pkl')

print("Model & vectorizer trained and saved!")