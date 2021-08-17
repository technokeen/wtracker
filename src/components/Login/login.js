import React from 'react'
import fireDB from '../../Firebase'
import {Button} from 'react-bootstrap'
import './login.css'

function Login () {

    //Function to handle login to Firebase anonymously
    const handleLogin= async(e) =>{
        e.preventDefault();

        fireDB.auth().signInAnonymously()
        .then(()=>{
            alert('You are logged in')
        })
        .catch(err =>{
           console.log(err.message)  
        })

    }

    return (
      
            <div className="LoginPage">

                <div className="Header">

                    <h1>Weight Tracker</h1>
                    
                </div>
                
                <div className="FormBox">
                    <h3>User can login anonymously into the firebase to update the 
                        weight tracker details.</h3>

                    <button type="Submit" onClick={handleLogin}>LOGIN</button>

                </div>
                
            </div>
        
    )
}

export default Login