import React from "react";
import Gallery from "./ImageGallery";
import images from "./GalleryData";

function App() {
  return (
    <Gallery images={images}/>
  );
}

export default App;
