import React from 'react'
import {Carousel} from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {img} from './images/data'
import classes from './ImageCarousel.module.css'

function ImageCarousel() {
  return (
    <div className={classes.carousel_container}>
       <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showIndicators={false}
          showStatus={false}
        >
             {
              img.map((imageLink) => {
                return <img key= {imageLink} src={imageLink} alt='carousel images' className={classes.carousel_image}/>
              })
             }
        </Carousel> 
        <div className={`${classes.hero_img} `}> </div>
    </div> 
  ) 
}
export default ImageCarousel 
