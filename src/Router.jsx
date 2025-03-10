import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Pages/Landing/Landing';
import Payment from './Pages/Payment/Payment';
import Orders from './Pages/Orders/Orders';
import Cart from './Pages/Cart/Cart';
import ProductDetail from './Pages/ProductDetail/ProductDetail';
import Results from './Pages/Results/Results';
import Auth from './Pages/Auth/Auth';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

const stripePromise = loadStripe('pk_test_51QwkXDAwsVVf7WtstCLULoxsyCWHFPiotYWv4mLAaj4WUHNxJLDVq9mpxJ4Ve3lsygIAliYPSnCDIzHehN0FHVk000c8WRuJxC');
const Routing = () => {
  return (
     <Router> 
      <Routes>
        <Route path='/' element={ <Landing/>}/>
        <Route path='/auth' element={ <Auth/>}/>
        <Route path='/payment' 
        element= {
          <ProtectedRoute msg={"You must login to pay"} redirect={"/payment"}> 
          <Elements stripe={stripePromise}>
             <Payment/>
          </Elements> 
          </ProtectedRoute>
          }/>

        <Route path='/orders' element={
           <ProtectedRoute msg={"You must login to see your orders"} redirect={"/orders"}>
            <Orders/>
           </ProtectedRoute>
          }/>
        <Route path='/cart' element={<Cart/>}/>  
        <Route path='/category/:categoryName' element={<Results/>}/>
        <Route path='/products/:productId' element={<ProductDetail/>}/>
        <Route path='signup' element={<Auth/>}/>  
      </Routes>
     </Router>
  )
}
export default Routing