import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LINK } from "./Link";

function Home(){
  const nav = useNavigate();
  const apikey = localStorage.getItem('apikey');
  const [username,setName] = useState('');
  const [load,setLoad] = useState(true);
  
  const logout = async () =>{
    try{
      const dataa = await axios.post(`${LINK}auth/signout`,{},{ headers: {Authorization : `Bearer ${apikey}`}});
      console.log(dataa);
      localStorage.removeItem('apikey');
      nav('/signin');
    }catch(error){
      console.log(error);
    }
    
  } 


  const getUser = async () => {
    try {
      const user = await axios.get(`${LINK}usersE`,{headers: {Authorization : `Bearer ${apikey}`}});
      const username = user.data.data.username;
      console.log(username);
      setName(username);
      setLoad(false);

    }catch(error){
      console.log(error);
    }
  }



  useEffect(() => {
       if(!apikey) return nav('/signin');
       getUser(); 
  },[]);

    if(load) return <div>Loading....</div>

    return(
        <div>
   
   <nav className="navbar navbar-expand-lg sticky-top bg-primary navbar-dark">
      <div className="container">
        <a className="navbar-brand" href="index.html">Gaming Portal</a>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          
         <li><a href="discover-games.html" className="nav-link px-2 text-white">Discover Games</a></li>
         <li><a href="manage-games.html" className="nav-link px-2 text-white">Manage Games</a></li>
         <li><a href="profile.html" className="nav-link px-2 text-white">User Profile</a></li>
         <li className="nav-item">
           <a className="nav-link active bg-dark" href="#">Welcome, {username}</a>
         </li> 
         <li className="nav-item">
          <button onClick={logout} className="btn bg-white text-primary ms-4">Sign Out</button>
         </li>
       </ul> 
      </div>
    </nav>

    <main>

      <div className="hero py-5 bg-light">
         <div className="container text-center">
          <h1 className="mb-0 mt-0">Dashboard</h1>
         </div>
      </div>

      <div className="list-form py-5">
         <div className="container">
          <h5 className="alert alert-info">
            Welcome, Administrator. Don't forget to sign out when you are finished using this page
          </h5>
         </div>
      </div>
      
    </main>
   

  </div>
    )
}

export default Home;