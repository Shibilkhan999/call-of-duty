
import { initializeApp } from "firebase/app";
import './App.css';
import Navbar from './component/Nav';
import CustomRoutes from './component/CustomRoutes';
import {  useContext,useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { GlobalContext } from './context/Context';
import Footer from "./pages/Footer";
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';


function App() {

  let {state , dispatch} = useContext(GlobalContext);
  console.log(state)


  const firebaseConfig = {
    apiKey: "AIzaSyApFXuKI4h_WVqy0rXEPNHzDUpfxlPBDoI",
    authDomain: "callofduty-9.firebaseapp.com",
    projectId: "callofduty-9",
    storageBucket: "callofduty-9.firebasestorage.app",
    messagingSenderId: "1090059856790",
    appId: "1:1090059856790:web:33161f145f1f9816408bb7"
  };
  const app = initializeApp(firebaseConfig);
  // const db = getFirestore(app);  


  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user",user);
        dispatch({type:"USER_LOGIN", payload:user})
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
      } else {
        dispatch({type:"USER_LOGOUT",})
        console.log("User is Not found");
        
        // User is signed out
        // ...
      }
    });
  }, [])

  // const logoutUser = () => {
  //   signOut(auth).then(() => {
  //     // Sign-out successful.
  //     console.log("Sign-out successful")
  //   }).catch((error) => {
  //     // An error happened.
  //     console.log("An error happened",error)
  //   });
  // }

  return (
    <div className="App">
      {/* {state?.isLogin == true ?
         <button 
         onClick={logoutUser} 
         style={{
          backgroundColor: '#ff4500',
          color: '#fff',
          padding: '12px 25px',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          //  backgroundColor: '#333', 
          //  color: '#fff', 
          //  padding: '10px 20px', 
          //  border: 'none', 
          //  borderRadius: '5px', 
          //  cursor: 'pointer',
          //  fontSize: '16px',
          
         }}
         onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e04e00')}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ff4500')}
       >
         Logout
       </button>
      
       
          : */}
      <Navbar />
      <CustomRoutes/>
      <Footer />
    </div>
  );
}

export default App;
