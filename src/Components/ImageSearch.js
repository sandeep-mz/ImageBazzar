import React, { useState, useEffect } from "react";
import axios from "axios";

const ImageSearch = ({ images, setImages }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [showPagination, setShowPagination] = useState(false); // State to manage pagination visibility

  useEffect(() => {
    // fetchImages(null, "random");
    fetchDefaultImages();
    setShowPagination(false); // Hide pagination initially
  }, []);

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

//this is default image showing in page 
  async function fetchDefaultImages() {
    try {
      const response = await axios.get(
        "https://api.unsplash.com/photos", // Endpoint for default images
        {
          headers: {
            "Accept-Version": "v1",
            Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
          },
          params: {
            per_page: 8, // Adjust the number of default images
          },
        }
      );
      setImages(response.data);
    } catch (error) {
      console.log(error);
    }
  }





  async function fetchImages(e, flag, pageNumber) {
    if (e) {
      e.preventDefault();
    }

    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          headers: {
            "Accept-Version": "v1",
            Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
          },
          params: {
            query: searchTerm,
            per_page: 8,
            page: page,
          },
        }
      );

      if (flag === "submit") {
        setImages(response.data.results);
        setPage(1);
        setShowPagination(true); // Show pagination after search
      } else {
        setImages([...images, ...response.data.results]);
        setPage(pageNumber || page + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleNextClick = () => {
    fetchImages(null, "next");
  };

  const handlePreviousClick = () => {
    if (page > 1) {
      fetchImages(null, "previous", page - 1);
      
    }
  };

  return (
    <div className="search-container">
         
      <form onSubmit={(e) => fetchImages(e, "submit")} className="search-form">
        <input
          type="text"
          placeholder="Enter search..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          className="search-input"
        />
        <button type="submit" className="search-button">
          <i className="fa fa-search"></i> Search
        </button>

        <div className="additional-options">
            <a href="https://unsplash.com/explore">Explore</a>
            <a href="https://unsplash.com/advertise">Advertise</a>
            <a href="https://unsplash.com/login">Login</a>
        </div>
      </form>

      {showPagination && ( // Render pagination when showPagination is true
        <div className="pagination-buttons">
          <button onClick={handlePreviousClick} disabled={page === 1}>
            Previous
          </button>
          <button onClick={handleNextClick}>Next</button>
        </div>
      )}
    </div>
  );
};

export default ImageSearch;
