import React, { useState } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  GithubAuthProvider ,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import { Link } from "react-router-dom" 


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const provider = new GithubAuthProvider();
  const facebookprovider = new FacebookAuthProvider();
  
  
  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log("Google Login Success:", user);
      })
      .catch((error) => {
        console.log("Google Login Error:", error);
        alert(error.message); 
      });
  };

  const handleGithubLogin = () =>{
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    console.log("User",user)
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GithubAuthProvider.credentialFromError(error);
    // ...
    console.log("Error",error)
  });
  }

  const handleFacebookLogin =  () => {
    signInWithPopup(auth, facebookprovider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;

    // IdP data available using getAdditionalUserInfo(result)
    // ...
    console.log("User",user)
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);

    // ...
    console.log("Error",error)
  });}
   

  const loginUser = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Response", user);
      })
      .catch((error) => {
        console.log("Err", error);
        // const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage); 
      });
  };



  const handleForgotPassword = () => {
    const userEmail = prompt("Please enter your email address to reset your password:");
    if (userEmail) {
      sendPasswordResetEmail(auth, userEmail)
        .then(() => {
          alert("Password reset email sent! Please check your inbox.");
        })
        .catch((error) => {
          console.log("Err", error);
          // const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
        });
    }
  };


  // const [rememberMe, setRememberMe] = useState(false);

  // const handleRememberMeChange = () => {
  //   setRememberMe(!rememberMe);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
    
  //   console.log('Remember Me:', rememberMe);
  // };


  const iconStyle = {
    width: '30px',
    cursor: 'pointer',
    margin: '10px',
    transition: 'transform 0.2s ease-in-out',
  };

  const handleMouseOver = (e) => {
    e.currentTarget.style.transform = 'scale(1.1)';
  };

  const handleMouseOut = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
  };


  // styling-----//

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundImage: "url('https://s1.1zoom.me/big0/989/405366-alexfas01.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "#fff",
  };

  const formStyle = {
    width: "90%",
    maxWidth: "400px",
    backgroundColor: "#1a1a1a",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.5)",
    textAlign: "center",
  };

  const logoStyle = {
    width: "300px",
    height: "100px",
    marginBottom: "20px",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#2a2a2a",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#ff4500",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "15px",
  };

  // const socialButtonStyle = {
  //   width: "100%",
  //   padding: "10px",
  //   fontSize: "16px",
  //   fontWeight: "bold",
  //   color: "#fff",
  //   backgroundColor: "#333",
  //   border: "none",
  //   borderRadius: "5px",
  //   cursor: "pointer",
  //   marginTop: "10px",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  // };

  const linkStyle = {
    color: "#bbb",
    textDecoration: "none",
    marginTop: "10px",
    fontSize: "14px",
    display: "block",
    cursor: "pointer",
    marginLeft:"220px",
  };


 
  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={loginUser}>

        <img
          src="https://profile.callofduty.com/resources/cod/images/bo6/bo6-logo.svg"
          alt="Call of Duty Logo"
          style={logoStyle}
        />
        <h2 style={{ marginBottom: "10px" }}>Login to your Activision Account</h2>

        <label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
            style={inputStyle}
          />
        </label>

        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            style={inputStyle}
          />
        </label>


        <p
          style={linkStyle}
          onClick={handleForgotPassword}
          onMouseOver={(e) => (e.currentTarget.style.color = "#fff")}
          onMouseOut={(e) => (e.currentTarget.style.color = "#bbb")}
          
        >
          Forgot password?
        </p>


        {/* <label>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
          Remember Me
        </label> */}


        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#ff6a3d")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#ff4500")}
        >
          Login
        </button>
        {/* <ToastContainer /> */}
        
        <div className='flex items-center justify-center mt-5 text-white-500'>
        <p style={{ margin: "15px 0", color: "#bbb" }}>Or</p>
        </div>


       

        {/* <div className="flex items-center justify-center mt-5 text-white-500">
        <div className="border-[1px] w-[200px] border-white-300 mr-1" />
        OR
        <div className="border-[1px] w-[200px] border-white-300 ml-1"></div>
      </div> */}
        {/* <button
          type="button"
          style={socialButtonStyle}
          onClick={handleGoogleLogin}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#555")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#333")}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
            alt="Google Logo"
            style={{ width: "20px", marginRight: "10px" }}
          />
          
        </button>
        <button
          type="button"
          style={socialButtonStyle}
          onClick={handleGithubLogin}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#555")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#333")}
        >
          <img
            src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_640.png"
            alt="GitHub Logo"
            style={{ width: "20px", marginRight: "10px" }}
          />
          
        </button> */}

        <div>
        <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
        alt="Google Logo"
        style={iconStyle}
        onClick={handleGoogleLogin}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />
      <img
        src="https://cdn-icons-png.flaticon.com/128/5968/5968896.png"
        alt="GitHub Logo"
        style={iconStyle}
        onClick={handleGithubLogin}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />
      
      <img
        src="https://cdn-icons-png.freepik.com/256/5968/5968764.png?ga=GA1.1.501575832.1738792884&semt=ais_hybrid"
        alt="Facebook Logo"
        style={iconStyle}
        onClick={handleFacebookLogin}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />
       {/* <img 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCwB6WHUfAkz72VnAyoDo5dU29LMfXK3VeKQ&s"
        alt="Phonenumber Logo"
        style={iconStyle}
        // onClick={handleFacebookLogin}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      /> */}
      </div>


      <div style={{color: '#9ca3af', marginTop: '0.6rem', marginBottom: '0.2rem', }}>
        New to Call of Duty?{" "}
       <Link to={"/signup"}>
        <span
        style={{
            color: '#ffffff',
            textDecoration: 'underline', 
            transition: 'color 0.3s ease', 
        }}
          onMouseOver={(e) => (e.currentTarget.style.color = '#d1d5db')} 
          onMouseOut={(e) => (e.currentTarget.style.color = '#ffffff')} 
        >
          Signup
        </span>
        </Link>
      </div>
      
      </form>
    </div>
  );
};

export default Login;





