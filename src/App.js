import React from 'react'
import Home from './components/Home/home.js'
import Login from './components/Login/login.js'
import {useAuthState} from 'react-firebase-hooks/auth';
import fireDB from './Firebase'

function App() {
  const [user]= useAuthState(fireDB.auth());
  return (
    <>
        {
        user ? <Home/>:<Login/>
        }
    </>
   
  );
}

export default App;
