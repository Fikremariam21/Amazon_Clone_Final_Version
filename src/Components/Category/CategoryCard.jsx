
import React from 'react';
import styles from './Category.module.css'
import { Link } from 'react-router-dom';



const CategoryCard = ({data}) => {
  return (
    <div className={`${styles.category_card} `}> 

      <Link to= {`/category/${data.name}`}>
        <span>
          <h2 className={`${styles.title}`}>{data.title}</h2>
        </span>
        <img src={data.imgLink} alt={data.title}/>
        <p>Shop now</p>
      </Link> 
    </div>
  );
};

export default CategoryCard;