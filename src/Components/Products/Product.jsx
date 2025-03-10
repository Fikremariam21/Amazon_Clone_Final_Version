import React, {useState, useEffect} from 'react'
import axios from 'axios';
import ProductCard from './ProductCard';
import styles from './product.module.css'
import Loader from '../Loader/Loader';
import {API_ENDPOINT} from '../../Config/config'

function Product() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
     useEffect(() => {
      setIsLoading(true)
      
        axios.get (API_ENDPOINT)
       .then((res) => {
        setIsLoading(false)
        setProducts(res.data)
        isLoading
       
       }).catch((err) => {
        console.log(err)
        setIsLoading(false)
        
       })
     },[]);
    
  return (
    <div className={styles.main_container}>
    {
      isLoading?(<Loader/>) : (
        <section className= {`${styles.product_container}`}> 
        {
            products.map((singleProduct) => (
                <ProductCard 
                product= {singleProduct} key= {singleProduct.id} renderAdd={true} 
                />
            ))
        }
    </section>)
    }
    </div>
    
  )
}

export default Product
