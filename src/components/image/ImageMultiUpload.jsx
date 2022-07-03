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
    <label
      className={`cursor-pointer flex items-center justify-center border border-dashed w-full min-h-[200px] rounded-lg ${className} relative overflow-hidden group`}
    >
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
    </label>
  );
};

export default ImageMultiUpload;
