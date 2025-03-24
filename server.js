const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');

const app = express();
app.use(cors());
app.use(express.json()); // to parse JSON body data if needed

app.post('/recommend', (req, res) => {
  // Extract user inputs from the request body
  const { category, genre, chapters, author } = req.body;
  
  // Example: spawn the Python process
  // arguments: ai.py <category> <genre> <length> <author> ...
  const pythonProcess = spawn('python', [
    'ai.py',
    category,     // e.g. "Movie" or "Book" 
    genre,        // e.g. "Horror"
    chapters,     // number or string
    author        // e.g. "Stephen King" or "no"
  ]);

  let outputData = '';

  pythonProcess.stdout.on('data', (data) => {
    outputData += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(data.toString());
  });

  pythonProcess.on('close', (code) => {
    // 'outputData' now contains whatever your Python script printed
    return res.json({ recommendation: outputData });
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
