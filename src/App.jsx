
import { initializeApp } from "firebase/app";
import './App.css';
import Navbar from './component/Nav';
import CustomRoutes from './component/CustomRoutes';
import {  useContext,useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { GlobalContext } from './context/Context';
import Footer from "./pages/Footer";
// import "bootstrap/dist/css/bootstrap.min.css";



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

  

  return (
    <div className="App">
      
      
       
      <Navbar />
      <CustomRoutes/>
      <Footer />
    </div>
  );
}

export default App;
