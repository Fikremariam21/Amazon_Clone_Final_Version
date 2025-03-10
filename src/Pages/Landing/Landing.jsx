import React from "react";
import ImageCarousel from "../../Components/Carousel/ImageCarousel";
import Category from "../../Components/Category/Category";
import Product from "../../Components/Products/Product";
import LayOut from "../../Components/LayOut/LayOut";


const Landing = () => {
  return (
     <LayOut> 
      <ImageCarousel/>
      <Category/>
      <Product/>
      </LayOut> 
  );
};

export default Landing; 
