
import {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import {LINK} from "./Link";

function Profile(){
  const nav = useNavigate();
  const apikey = localStorage.getItem('apikey');
  const [user,setuser] = useState({});
  const [load,setLoad] = useState(true);

  useEffect(() => {
    if(!apikey) return nav('/signin');
  },[]);
  const detail = async() =>{
    try{
      const data = await axios.get(`${LINK}usersE`,{ headers: {Authorization :`Bearer ${apikey}`}});
      setuser(data.data.data);
      setLoad(false);
    }catch(error){
      console.log(error);
    }
  }
    useEffect(()=> {
      console.log(user);
    },[user])
    useEffect(()=> {
        
        detail();
    },[])

    if(load) return <div className="tes">Wait....</div>


    return (
    <main>
      <div className="hero py-5 bg-light">
         <div className="container text-center"> 
            <h2 className="mb-1">
              {user.username}
            </h2> 
            <h5 className="mt-2">Last Login 2024-04-09 22:45:41</h5>
         </div>
      </div>

      <div className="py-5">
         <div className="container"> 

            <div className="row justify-content-center ">
               <div className="col-lg-5 col-md-6"> 
                        
              <h5>Highscores per user</h5>
              <div className="card-body">
                <ol>
                  <li><a href="detail-users.html">Demo user 1 (3004)</a></li>
                  <li><a href="detail-users.html">Demo user 2 (2000)</a></li>
                  <li><a href="detail-users.html">Demo user 3 (1044)</a></li>
                  <li><a href="detail-users.html">Demo user 4 (1005)</a></li>
                </ol>
              </div>
              <h5>Authored users</h5>
              <a href="detail-users.html" className="card card-default mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-4">
                      <img src="img/thumbnail.png" alt="Demo user 1 Logo" style={{width: '100%'}} />
                    </div>
                    <div className="col">
                      <h5 className="mb-1">Demo user 1 <small className="text-muted">By Dev1</small></h5>
                      <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, numquam repellendus perspiciatis cupiditate veritatis porro quod eveniet animi perferendis molestias debitis temporibus, asperiores iusto.</div>
                      <hr className="mt-1 mb-1"/>
                      <div className="text-muted">#scores submitted : 203</div>
                    </div>
                  </div>
                </div>
              </a>
              <a href="detail-users.html" className="card card-default mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-4">
                      <img src="img/thumbnail.png" alt="Demo user 1 Logo" style={{width: '100%'}}/>
                    </div>
                    <div className="col">
                      <h5 className="mb-1">Demo user 1 <small className="text-muted">By Dev1</small></h5>
                      <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, numquam repellendus perspiciatis cupiditate veritatis porro quod eveniet animi perferendis molestias debitis temporibus, asperiores iusto.</div>
                      <hr className="mt-1 mb-1"/>
                      <div className="text-muted">#scores submitted : 203</div>
                    </div>
                  </div>
                </div>
              </a>

                
                <a href="../" className="btn btn-danger w-100">Back</a>

               </div>
             </div>  
            
         </div>
      </div>
    </main>
    )
}

export default Profile;