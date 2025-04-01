import React, { useState } from 'react';
import './App.css';

function App() {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    // Combine existing files with newly selected files
    setFiles((prevFiles) => [...prevFiles, ...event.target.files]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files[]', files[i]);
    }

    try {
      const response = await fetch('https://workout-transcription-app.onrender.com/', {
        method: 'POST',
        body: formData,
      });

      console.log("Response:", response); // Add this line

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'workout.xlsx');
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        console.error('Error uploading files');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div className="app">
      <h1 className="title">Workout Transcription App</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" multiple onChange={handleFileChange} />
        <button type="submit" className="upload-btn">Upload</button>
      </form>

      {/* Display selected file names */}
      {files.length > 0 && (
        <div className="file-list">
          <h2>Selected Files</h2>
          <ul>
            {Array.from(files).map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
