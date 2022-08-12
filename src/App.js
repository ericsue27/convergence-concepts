import "./App.css";
import { motion } from "framer-motion";
// import images from "./images";
import { useRef, useState, useEffect } from "react";

function App() {
  // const [width, setWidth] = useState(0);
  const carousel = useRef();

  const [photos, setPhotos] = useState([]);

  const maxPhotos = 5000;

  useEffect(() => {
    getData();
  }, []);

  // Dedicated function to fetch photo from given API
  // Error handling to be added (for now console log)
  const getData = async () => {
    await fetch("http://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())
      .then((data) => setPhotos(data))
      .catch((error) => console.log(error));
  };

  // Reorders image display order recursively
  const reorder_recursive = (curr) => {
    if (curr === maxPhotos) {
      return;
    }

    let rand_num = Math.floor(Math.random() * (maxPhotos - 1) + (curr + 1));
    console.log(rand_num);

    var first_div = document.getElementById(curr);
    var second_div = document.getElementById(rand_num);

    var parent = first_div.parentNode;
    var test = document.getElementById(rand_num + 1);

    if (curr === 1 && rand_num === 2) {
      parent.insertBefore(second_div, first_div);
    } else {
      parent.insertBefore(second_div, first_div);
      parent.insertBefore(first_div, test);
    }

    reorder_recursive(curr + 1);
  };

  // Section sets up html page with scrolling and reorder_recursive button
  return (
    <div className="App">
      <motion.div
        ref={carousel}
        className="carousel"
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0 }}
          className="inner-carousel"
        >
          {photos.map((photo) => {
            return (
              <motion.div className="item" key={photo} id={photo.id}>
                <div className="container">
                  <img src={photo.url} alt="" />
                  <h5>{photo.title}</h5>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        <button
          className="reset_container"
          onClick={() => reorder_recursive(1)}
        >
          Reorder
        </button>
      </motion.div>
    </div>
  );
}

export default App;
