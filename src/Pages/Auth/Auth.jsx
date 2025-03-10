import React, { useState, useEffect, useContext} from "react";
import { Link, useNavigate, useLocation} from "react-router-dom";
import styles from "./Auth.module.css";
import {auth} from "../../Utility/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import {DataContext} from '../../Components/DataProvider/DataProvider.jsx';
import {ClipLoader} from "react-spinners"

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false, 
    signUp: false, 
  })
  const[{user},  dispatch] = useContext(DataContext);

// Initialize the navigation

  const navigate = useNavigate() // initializing navigate function
  const navStateData = useLocation() 
  console.log(user)

  const authHandler = async(e) =>{
    setLoading({...loading, signIn: true})
    e.preventDefault();
    console.log(e.target.name)
    if(e.target.name === "Signin"){
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential)
        dispatch({
          type: 'SET_USER',
          user: userCredential.user, // accessing the user data from userCredential object
        }); 
        setLoading({...loading, signIn: false})
        navigate(navStateData?.state?.redirect ||"/")   
      })
      .catch((err) => {
        setError(err.message);
        setLoading({...loading, signIn: false})
      });

    } else{
      setLoading({...loading, signUp: true})
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setError(err.message);
        dispatch({
          type: Type.SET_USER,
          user: userCredential.user, 
        });
        setLoading({...loading, signUp: false})
        navigate(navStateData?.state?.redirect ||"/") 
      })
      .catch((err) => {
        setError(err.message);
        setLoading({...loading, signUp: false})
      });
  } 
  }
  return (
    <section className={styles.login}>
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" 
          alt="Amazon Logo" 
          className={styles.logo}
        />
      </Link>
      <div className={styles.login_container}>
        <h1> Sign in</h1>
        {
        navStateData?.state?.msg &&(
            <small
              style={{
                padding: "5px",
                textAlign: "center",
                color: "red",
                fontWeight: "bold",
              }}
              >
              {navStateData.state.msg}
            </small>
          )
        }

        <form action="">
          <div> 
          <label htmlFor="email"> Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" required />
          </div>

          <div> 
          <label htmlFor="password"> Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" required />

          </div>
          <button type="submit" name="Signin" onClick={authHandler} className={styles.btn_signIn}> 
            { loading.signIn? (<ClipLoader  color="#007185" size={20}/>
            ):(
            "Sign In"
            )}
            
          </button>
        </form>
        {/* Agreement */}
        <p className={styles.terms_links}> 
        By continuing, you agree to Amazon's Fake
           <a href="#" style={{ textDecoration: 'underline' , color: '#007185'}}>  Conditions of Use </a>
           and <a href="#" style={{ textDecoration: 'underline', color: '#007185'}}> Privacy Notice</a>
        </p>
        <a> 
        <p className={styles.help}> Need help?</p>
        </a>
        <hr className={styles.help_hr}/> 
        <p className={styles.buying_for_work}> Buying for Work?
          <br/>
          <a> Shop on Amazon Business</a>

        </p>

      </div>

      {/* Create account btn */}
      <div className={styles.newToAmazon_container}> 
        <span className={styles.newToAmazon}> New to Amazon? </span>
      </div>
      <button type="submit" name="SignUp" onClick={authHandler} className={styles.btn_createAccount}> 
        
      { loading.signUp? (<ClipLoader color="#007185" size={20} />
            ):(
            " Create your Amazon Account"
            )}
      </button>
      {
        error && <small style={{paddingTop: "7px", color: "red"}}> {error} </small>
      }

      <hr className={styles.create_account_hr}/>

      <div className={styles.footer_links_container}>
        <div> <a> condition of Use</a></div>
        <div> <a> Privacy Notice</a></div>
        <div> <a> Help</a></div>
      </div>
      <p className={styles.copy_right}>&copy; 1996-2025, Amazon.com, Inc. or its affiliates</p>
     
    </section>
    
  );
}

export default Auth;
