import React from "react";

const ImageMultiUpload = (props) => {
  const {
    name,
    className = "",
    progress = 0,
    image = "",
    handleDeleteImage = () => {},
    handleChange = () => {},
    handleUpload = () => {},
    urls = [],
    ...rest
  } = props;
  return (
    <div>
      <br />
      <br />
      <input type="file" multiple onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      <br />

      {urls.length > 0 &&
        urls.map((url, i) => (
          <div key={i}>
            <a href={url} target="_blank">
              {url}
            </a>
          </div>
        ))}
      <br />
      {urls.length > 0 &&
        urls.map((url, i) => (
          <img
            key={i}
            style={{ width: "500px" }}
            src={url || "http://via.placeholder.com/300"}
            alt="firebase-image"
          />
        ))}
    </div>
  );
};

export default ImageMultiUpload;
