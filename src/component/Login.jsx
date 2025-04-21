import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {LINK} from "./Link";

function Login(){
     const nav = useNavigate();
      const apikey = localStorage.getItem('apikey');
      const login = async (e)=>{
        try{
            const data = await axios.get(`${LINK}usersE`,{headers: {Authorization : `Bearer ${apikey}`}});
            console.log(data.data.role);
            if(data.data.role === "admin"){
                nav('admins');
            }
        }catch(error){
            console.log(error);
        }
      }
         useEffect(() => {
            login();
            console.log(apikey)
           if(!apikey){
          return nav('/signin');
        }
      },[]);

}
export default Login;