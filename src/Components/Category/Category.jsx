import React from "react";
import { categoryInfos } from "./categoryInfo";
import CategoryCard from "./CategoryCard";
import styles from "./Category.module.css";

const Category = () => {
  return (
    <section className= {`${styles.category_section}  `}>
      <div className={`${styles.category_container} `}>

        {
        categoryInfos.map((infos) => (
          <CategoryCard key={infos.name} data={infos} />
        ))
        }
      </div>
    </section>
  );
};

export default Category; 
