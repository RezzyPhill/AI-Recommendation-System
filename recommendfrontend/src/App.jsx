import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    category: "Book",
    genre: "",
    chapters: "",
    author: "",
  });

  // Stores the output from the backend
  const [result, setResult] = useState("");

  // Update form fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit the form via Axios to your Express endpoint
  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("Loading…");

    try {
      const { data } = await axios.post("http://localhost:3001/recommend", form);
      setResult(data.recommendation);
    } catch (err) {
      console.error(err);
      setResult("Something went wrong. Check the server console.");
    }
  };

  return (
    <div className="card">
      <h1 className="title">AI Recommendation</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Category
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="Book">Book</option>
            <option value="Movie">Movie</option>
            <option value="Show">Show</option>
          </select>
        </label>

        <label>
          Genre
          <input
            name="genre"
            value={form.genre}
            onChange={handleChange}
            placeholder="e.g. Horror"
            required
          />
        </label>

        <label>
          Chapters / Length
          <input
            name="chapters"
            value={form.chapters}
            onChange={handleChange}
            placeholder="e.g. 25"
          />
        </label>

        <label>
          Author (if Book)
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder='e.g. "Stephen King" or "no"'
          />
        </label>

        <button type="submit">Get Recommendation</button>
      </form>

      {result && <pre className="output">{result}</pre>}
    </div>
  );
}

export default App;
