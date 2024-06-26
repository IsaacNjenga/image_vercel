import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState();
  const [images, setImages] = useState([]);

  axios.defaults.withCredentials = true
  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post(`https://image-vercel-alpha.vercel.app/upload`, formData)
      .then((res) => {
        console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`https://image-vercel-alpha.vercel.app/getImage`)
      .then((res) => setImages(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="App">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      <br />
      <hr />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {images.map((image) => (
            <tr key={image._id}>
              <td>{image._id}</td>
              <td>
                <img
                  src={`https://image-vercel-alpha.vercel.app/Images/${image.image}`}
                  style={{
                    width: "500px",
                    height: "330px",
                    marginBottom: "20px",
                    objectFit: "contain",
                  }}
                  alt="img_here"
                />
              </td>
              <td>{image.image}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
