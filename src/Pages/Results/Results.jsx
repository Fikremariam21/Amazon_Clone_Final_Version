import React, { useEffect, useState } from 'react'
import styles from './Results.module.css'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Components/API/EndPoints'
import ProductCard from '../../Components/Products/ProductCard'
import Loader from '../../Components/Loader/Loader'

const Results = () => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const {categoryName} = useParams()
   
    useEffect(() => {
        setIsLoading(true)
        axios.get(`${productUrl}/products/category/${categoryName}`)
        .then((res) => {
            setResults(res.data)
            setIsLoading(false)
            console.log(res)
        }).catch((err) => {
            console.log(err)
            setIsLoading(false)
        })
    }, [])

  return (
    <LayOut> 
        {
            isLoading?(<Loader/>) :(
                <div>
        <h1 style={{padding: "30px"}}> Results</h1>
        <p style={{padding: "30px"}}> Category/{categoryName}</p>
        <hr/>
        <div className={styles.products_container}>
            {results?.map((product) =>(
                <ProductCard key={product.id}
                product={product}
                renderDesc={false}
                renderAdd={true}
                />
            ))}

        </div>
    </div>
            )
        }

    </LayOut>
  )
}

export default Results