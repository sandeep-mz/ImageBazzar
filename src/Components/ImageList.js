import React from "react";

const ImageList = ({ images }) => {
  return (
    <div className="image-list">
      {images.map((value, index) => (
        <img
          key={index}
          src={value.urls.thumb}
          alt={value.alt_description}
          className="image-item"
        />
      ))}
    </div>
    
  );
};

export default ImageList;
