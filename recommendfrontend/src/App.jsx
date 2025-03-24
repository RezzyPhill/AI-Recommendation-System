import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [category, setCategory] = useState('Book');
  const [genre, setGenre] = useState('');
  const [chapters, setChapters] = useState('');
  const [author, setAuthor] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/recommend', {
        category,
        genre,
        chapters,
        author
      });
      setResult(response.data.recommendation);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Recommendation App</h1>
      <form onSubmit={handleSubmit}>
        <label>Category:</label>
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="Book">Book</option>
          <option value="Movie">Movie</option>
          <option value="Show">Show</option>
        </select>

        <label>Genre:</label>
        <input
          type="text"
          value={genre}
          onChange={e => setGenre(e.target.value)}
        />

        <label>Chapters/Length:</label>
        <input
          type="text"
          value={chapters}
          onChange={e => setChapters(e.target.value)}
        />

        <label>Author:</label>
        <input
          type="text"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />

        <button type="submit">Get Recommendation</button>
      </form>

      {result && <div>Recommendation: {result}</div>}
    </div>
  );
}

export default App;
