// import React from 'react'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { BrowserRouter} from 'react-router-dom';
// import Landing from './Pages/Landing/Landing';
// import Payment from './Pages/Payment/Payment';
// import Orders from './Pages/Orders/Orders';
// import Cart from './Pages/Cart/Cart';
// import ProductDetail from './Pages/ProductDetail/ProductDetail';
// import Results from './Pages/Results/Results';
// import Auth from './Pages/Auth/Auth';
// import {Elements} from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';
// import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

// const stripePromise = loadStripe('pk_test_51QwkXDAwsVVf7WtstCLULoxsyCWHFPiotYWv4mLAaj4WUHNxJLDVq9mpxJ4Ve3lsygIAliYPSnCDIzHehN0FHVk000c8WRuJxC');
// const Routing = () => {
//   return (
//      <BrowserRouter basename="/Amazon_Clone_Final_Version/"> 
//       <Routes>
//         <Route path='/' element={ <Landing/>}/>
//         <Route path='/auth' element={ <Auth/>}/>
//         <Route path='/payment' 
//         element= {
//           <ProtectedRoute msg={"You must login to pay"} redirect={"/payment"}> 
//           <Elements stripe={stripePromise}>
//              <Payment/>
//           </Elements> 
//           </ProtectedRoute>
//           }/>

//         <Route path='/orders' element={
//            <ProtectedRoute msg={"You must login to see your orders"} redirect={"/orders"}>
//             <Orders/>
//            </ProtectedRoute>
//           }/>
//         <Route path='/cart' element={<Cart/>}/>  
//         <Route path='/category/:categoryName' element={<Results/>}/>
//         <Route path='/products/:productId' element={<ProductDetail/>}/>
//         <Route path='signup' element={<Auth/>}/>  
//       </Routes>
//      </BrowserRouter>
//   )
// }
// export default Routing



import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

const stripePromise = loadStripe('pk_test_51QwkXDAwsVVf7WtstCLULoxsyCWHFPiotYWv4mLAaj4WUHNxJLDVq9mpxJ4Ve3lsygIAliYPSnCDIzHehN0FHVk000c8WRuJxC');

// Lazy load your page components
const Landing = lazy(() => import('./Pages/Landing/Landing'));
const Payment = lazy(() => import('./Pages/Payment/Payment'));
const Orders = lazy(() => import('./Pages/Orders/Orders'));
const Cart = lazy(() => import('./Pages/Cart/Cart'));
const ProductDetail = lazy(() => import('./Pages/ProductDetail/ProductDetail'));
const Results = lazy(() => import('./Pages/Results/Results'));
const Auth = lazy(() => import('./Pages/Auth/Auth'));

const Routing = () => {
  return (
    <Router basename="/Amazon_Clone_Final_Version/">
      <Suspense fallback={<div>Loading...</div>}> {/* Display a loading indicator */}
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/auth' element={<Auth />} />
          <Route
            path='/payment'
            element={
              <ProtectedRoute msg={"You must login to pay"} redirect={"/payment"}>
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              </ProtectedRoute>
            }
          />
          <Route
            path='/orders'
            element={
              <ProtectedRoute msg={"You must login to see your orders"} redirect={"/orders"}>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route path='/cart' element={<Cart />} />
          <Route path='/category/:categoryName' element={<Results />} />
          <Route path='/products/:productId' element={<ProductDetail />} />
          <Route path='signup' element={<Auth />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default Routing;