import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, GoogleAuthProvider,GithubAuthProvider,signInWithPopup,FacebookAuthProvider} from "firebase/auth";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

const Signup = () => {

  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const facebookprovider = new FacebookAuthProvider();


  const signUpUser = (e) => {
      e.preventDefault();
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("userCredential", userCredential);
        updateProfile(auth.currentUser, {
          displayName: userName, photoURL: "https://www.callofduty.com/content/dam/atvi/callofduty/sso/cod/cod-logo-hitmarker.png"
        }).then(() => {

          sendEmailVerification(auth.currentUser)
          .then(() => {
          // Email verification sent!
          console.log("Email verification sent!")
          // ...
          })
          .catch(() => {
            console.log("verification not sent")
            
          })

          console.log("profile update" )
          // Profile updated!
          // ...
        }).catch((error) => {
          console.log("update profile",error)
          // An error occurred
          // ...
        });
        console.log("Res",user)
      })
      .catch((error) => {
        console.log("error", error);
      });
  };


// icons----
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
  
    const handleGithubLogin = () => {
      signInWithPopup(auth, githubProvider)
        .then((result) => {
          const credential = GithubAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          console.log("GitHub Login Success", user);
        })
        .catch((error) => {

          const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GithubAuthProvider.credentialFromError(error);

          console.log("GitHub Login Error:", error);
          
        });
    };


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


// icons---styling---//

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

  const linkStyle = {
    color: "#bbb",
    textDecoration: "none",
    marginTop: "10px",
    fontSize: "14px",
    display: "block",
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={signUpUser}>
        <img
          src="https://profile.callofduty.com/resources/cod/images/bo6/bo6-logo.svg"
          alt="Call of Duty Logo"
          style={logoStyle}
        />
        <h2 style={{ marginBottom: "10px" }}>SIGN IN TO YOUR <br />ACTIVISION ACCOUNT</h2>

        <label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your username"
            required
            style={inputStyle}
          />
        </label>

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
        
        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#ff6a3d")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#ff4500")}
        >
          SIGN UP
        </button>
        <ToastContainer/>
        <a
          href="#"
          style={linkStyle}
          onMouseOver={(e) => (e.currentTarget.style.color = "#fff")}
          onMouseOut={(e) => (e.currentTarget.style.color = "#bbb")}
        >
          Need Help?
        </a>
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
      </div>


      <div style={{color: '#9ca3af', marginTop: '0.6rem', marginBottom: '0.2rem', }}>
        Already have an account{" "}
      <Link to={"/login"}>
        <span
          style={{
            color: '#ffffff',
            textDecoration: 'underline', 
            transition: 'color 0.3s ease', 
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = '#d1d5db')} 
          onMouseOut={(e) => (e.currentTarget.style.color = '#ffffff')} > 
          Login
        </span>
      </Link>
      </div>
      </form>

      
    </div>
  );
};

export default Signup;