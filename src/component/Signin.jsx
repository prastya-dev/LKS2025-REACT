import { React, useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function SignIn(){

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [eerror, SetError] = useState('');
    const nav = useNavigate();



    const signin = async (e) => {
      e.preventDefault();
      try{
         const data = await axios.post('http://localhost:8000/api/v1/auth/signin',{
            username : email,
            password : pass
         });
         console.log(data.data);
         localStorage.removeItem('apikey');
         localStorage.setItem('apikey', data.data);
         nav('/')
    }catch(error){
      // SetError(error.response);
      console.log(error.response.data.message);
      SetError(error.response.data.message);
    }
    }
    

return(<main>
    <section className="login">
       <div className="container">
          <div className="row justify-content-center">
             <div className="col-lg-5 col-md-6">
                <h1 className="text-center mb-4">Gaming Portal</h1>
                <div className="card card-default">
                   <div className="card-body">
                      <h3 className="mb-3">Sign In</h3>
                      
                      <form > 
                         
                         <div className="form-group my-3">
                            <label for="username" className="mb-1 text-muted">Username</label>
                            <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            class="form-control" 
                            autofocus />
                         </div> 

                        
                         <div className="form-group my-3">
                            <label for="password" className="mb-1 text-muted">Password</label>
                            <input 
                            type="password"
                            id="password"
                            name="password" 
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            className="form-control" />
                         </div>
                         
                         <div className="mt-4 row">
                            <div className="col">
                               <button type="" onClick={signin} className="btn btn-primary w-100">Sign In</button>
                            </div>
                            <div className="col">
                               <a href="/signup" className="btn btn-danger w-100">Sign up</a>
                            </div>
                            <p style={{color : 'red', fontStyle : 'italic',marginTop: '1rem'}}>{eerror}</p>
                         </div>
                      </form>

                   </div>
                </div> 
             </div>
          </div>
       </div>
    </section>
 </main>
 );
}

export default SignIn;