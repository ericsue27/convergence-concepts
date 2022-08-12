import React from "react";
import { motion } from "framer-motion";

const Photo = ({ id, title, url, photo }) => {
  return (
    <motion.div className="item" key={photo}>
      <div className="container">
        <img src={url}></img>
        <h5>{title}</h5>
      </div>
    </motion.div>
  );
};

export default Photo;
