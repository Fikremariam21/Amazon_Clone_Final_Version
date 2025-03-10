import React, { useContext } from 'react'
import { Rating } from '@mui/material'
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat'
import styles from './product.module.css'
import { Link } from 'react-router-dom'
import { DataContext } from '../DataProvider/DataProvider'
import {Type} from '../../Utility/action.type'


function ProductCard({product, flex, renderDesc, renderAdd}) {
    
    const {image, title, id, rating, price, description}= product;

    // Access global state and dispatch function

    const [state, dispatch]= useContext(DataContext)
    console.log(state)

    // Local state for managing the rating
//   const [userRating, setUserRating] = useState(rating?.rate || 0);

    const addToCart =()=>{
        dispatch({
            type:Type.ADD_TO_BASKET,
            item:{
                image, title, id, rating, price, description
            }
        })
    }
  return (
     
    <div  className= {`${styles.card_container} ${flex? styles.product_flexed : ""}`}> 
        <Link to= {`/products/${id}`} className={styles.image_link}> 
            <img src={image} alt="" /> 
        </Link>
        <div className= {styles.description }>
            <h3> {title}</h3> 

            {renderDesc && <div style={{ maxWidth: "750px"}}> {description}</div>}
            <div className= {`${styles.rating}  `}> 
            
                {/* Rating */}
                <Rating value={rating?.rate || 0} precision={0.1}/>
                {/* Count*/}
                <small className=' ' > {rating?.count} </small>
            </div>
            <div className=' ' >
                {/* prices */}
                <CurrencyFormat amount={price}/> 
            </div>
            {
            renderAdd && <button className= {`${styles.button}`} onClick={addToCart}> add to cart </button> 
            }
        </div>
    </div>
  )
}
export default ProductCard