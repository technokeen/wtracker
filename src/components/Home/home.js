import React, {useState, useEffect} from 'react'
import fireDB from '../../Firebase' 
import './home.css'
 
function Home () {
    // State variables 
    const [userList, setUserList]= useState([]);
    const [user, setUser]= useState({
        name:"",
        weight:"",
    })
    const[userId, setUserId]= useState('');
    const[time, setTime]= useState('');
    let name, value; 

  //Function to get and display user input data in the add details form
    const getUserData =(event) =>{
        event.preventDefault();
        name=event.target.name;
        value=event.target.value;
        setUser({...user, [name]:value })
    }
 
    //Function to submit user form details to the Firebase realtime database
    const postData= async() =>{

        const {name,weight} = user;
        const time= new Date().toLocaleTimeString();
        if(name && weight)
        {
         
            const res= await fetch('https://fir-hosting-ninja-d89e8.firebaseio.com/tracker.json',{
                method:"POST",
                headers: {
                    "Content-type":"application/json",
                },
                body: JSON.stringify({
                        name,
                        weight,
                        time
                    })        
            })
    
            if(res){
                setUser({
                        name:"",
                        weight:""
                })
                alert("Data Stored Successfully!!")
            }
        }else{
            alert("Please fill all the details.")
        }
    }

    // Function to update the weight in firebase
    const updateData= () =>{
        //comment
        const {name,weight} = user;
        const time= new Date().toLocaleTimeString();
        const firestore= fireDB.database().ref("/tracker").child(userId);
        
        firestore.update({
            name:name,
            weight: weight,
            time:time
        })
        
        setUser({
            name:"",
            weight:""
         });
         setUserId('')
         
    }
    console.log("")
    // Event handler to update the current firebase data in update form.
    const handleUpdate= (id, data) =>{
      setUser(data);
      setUserId(id);
    }
 
    // function to delete the user's entry details
    const handleDelete=(id)=>{
        const child= fireDB.database().ref("/tracker").child(id);
        child.remove();
    }

    //Function to logout
     const handleLogout =()=>{
        fireDB.auth().signOut().then(()=>{
            alert('User logged out') 
        }).catch(err=>{
            console.log(err.message);
        })
    }
 
    // Function to fetch and track the current firebase data in update form. 
    const getdata= ()=> {
      fireDB.database().ref("tracker").on("value", snapshot =>{
            if(snapshot.val()!= null)
                setUserList({
                    ...snapshot.val()
                })
    })
    
}
    useEffect(()=>{
        getdata();
    },[userId, user])
 
    return (
        <>
           <div className="container">
               <div class="header">
                    <h1 id="title">Weight Tracker DashBoard</h1>
                    <button class="ButtonGroup" id="logout" onClick={handleLogout}>Logout</button>
               </div>
               
               <div className="row">
                    <div className="col">
                        <div className="boxBorder">
                            <h4>Add user's weight</h4>
                            <form method="POST">
                                
                                <label>Name:</label>
                                <div className="InputControls">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter your Full name"
                                        value={user.name}
                                        onChange={getUserData}
                                        required
                                    />
                                </div>

                                <label>Weight (kg):</label>
                                <div className="InputControls" >
                                    <input
                                        type="text"
                                        name="weight"
                                        placeholder="Enter your weight"
                                        value={user.weight}
                                        onChange={getUserData}
                                        required
                                    />
                                </div>

                                {
                                    
                                    userId === ''? 
                                    <button onClick= {postData}  className="ButtonGroup" id="Add" type="Submit" > Add</button>
                                    :
                                    <button onClick= {updateData} className="ButtonGroup" id="Add" type="Submit" > Edit</button>    
                                }
                                
                            </form>
                        </div>
                    </div>

                  
            </div>
            <hr></hr>

            <div className="row" id="TableContent">
                <h2>User Details Table</h2>
                    {userList.length == 0 ? <h1>No Data available</h1> :
                        <table>

                            <thead className="thead-dark">
                                <tr>
                                    <th>Name:</th>
                                    <th>Weight (kg)</th>
                                    <th>Update weight </th>
                                    <th>Delete user</th>
                                    <th>Date:</th>
                                    
                                </tr>
                            </thead>

                            <tbody>

                                {Object.keys(userList).sort((a, b) => a.time > b.time ? 1 : -1).map((id) =>

                                    <tr key={id}>
                                        <td>{userList[id].name}</td>
                                        <td>{userList[id].weight}</td>
                                        <td><button id="UpdateButton" onClick={() => { handleUpdate(id, userList[id]) }}>Update</button></td>
                                        <td><button id="DeleteButton" onClick={() => { handleDelete(id) }}>Delete</button></td>
                                        <td>{userList[id].time}</td>
                                        
                                    </tr>

                                )}

                            </tbody>
                        </table>
                    }
               </div>
           </div>
        </>

    )
}
 
export default Home
