import {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import {LINK} from "./Link";
function Discover(){

    const nav = useNavigate();
    const apikey = localStorage.getItem('apikey');
    const [auth,setAuth] = useState();
    const [name,setName] = useState('');
    const [gamee,setGame] = useState({});
    const [gameC,setGameC] = useState([]);
    const [sortBy, setSort] = useState('');
    const [sortDir, setDir] = useState('asc');
    const [totalPage, setTotalPage] = useState([]); 
    const [page, setPage] = useState(1);

      const logout = async () =>{
        try{
          const dataa = await axios.post(`${LINK}auth/signout`,{},{headers: {Authorization : `Bearer ${apikey}`}});
          console.log(dataa);
          localStorage.removeItem('apikey');
          nav('/signin');
        }catch(error){
        
          console.log(error);
        }
        
      }


      const login = async (e)=>{
  
        try{
            const data = await axios.get(`${LINK}usersE`,{headers: {Authorization : `Bearer ${apikey}`}});
            console.log(data.data.role);
            if(data.data.role === "admin"){
              nav('/admins');
            }
            
        }catch(error){
            console.log(error);
        }
      }

      const getUser = async (page,size, dirr = sortDir) => {
        try {
          const user = await axios.get(`${LINK}usersE`,{headers: {Authorization : `Bearer ${apikey}`}});
          const game = await axios.get(`${LINK}games?page=${page}&size=${size}&sortDir=${dirr}`,{headers: {Authorization : `Bearer ${apikey}`}});
          const username = user.data.data.username;
          const pages = Math.ceil(game.data.totalElement / size);
          setTotalPage(Array.from({length : pages}, (_,i) => i + 1)); 
          setName(username);
          setGame(game.data);
          setGameC(game.data.content);
          setAuth(true);
    
        }catch(error){
          console.log(error);
        }
      }





      const sort = (sort) =>{
        setSort(sort);
       
      }
      const dir = (dir) => {
        setDir(dir);
      }
      const pagee = (pages) => {setPage(pages)}








      useEffect(() => {
        if(!apikey) return nav('/signin');
       
        login();
        getUser();
      },[]);

      useEffect(() => {
        console.log(gamee);
        console.log("Page berubah ke:", page);
        setAuth(false);
        getUser(page,4,sortDir);
      },[sortDir,page]);










      if(!auth) return <div>Wait...</div>;
    return(
        <div>
        <nav className="navbar navbar-expand-lg sticky-top bg-primary navbar-dark">
           <div className="container">
             <a className="navbar-brand" href="index.html">Gaming Portal</a>
             <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
               
              <li><a href="discover-games.html" className="nav-link px-2 text-white">Discover Games</a></li>
              <li><a href="manage-games.html" className="nav-link px-2 text-white">Manage Games</a></li>
              <li><a href="/profile" className="nav-link px-2 text-white">User Profile</a></li>
              <li className="nav-item">
                <a className="nav-link active bg-dark" href="#">Welcome, {name}</a>
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
               <h1>Discover Games</h1>
              </div>
           </div>
     
           <div className="list-form py-5">
             <div className="container">
               <div className="row">
                 <div className="col">
                   <h2 className="mb-3">{gamee.totalElement} Game Avaliable</h2>
                 </div>
     
                 <div className="col-lg-8" style={{ textAlign: 'right' }}>
                   <div className="mb-3">
                     <div className="btn-group" role="group">
                       <button type="button" className="btn btn-secondary">Popularity</button>
                       <button type="button" className="btn btn-outline-primary">Recently Updated</button>
                       <button type="button" className="btn btn-outline-primary">Alphabetically</button>
                     </div>
                     
                     <div className="btn-group" role="group">
                       <button type="button"
                        className={`btn ${sortDir === 'asc' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick = {() => {dir('asc')}}
                        >ASC</button>
                       <button type="button"
                       className={`btn ${sortDir === 'desc' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick = {() => {dir('desc')}}>DESC</button>
                     </div>
                  </div>
                 </div>
               </div>
                
     
                <div className="row">
                    {gameC.map((n) => (

                   
                 <div className="col-md-6">
                   <a href={`/detail/${n.slug}`} className="card card-default mb-3">
                     <div className="card-body">
                       <div className="row">
                         <div className="col-4">
                           <img src="/img/thumbnail.png" alt={`Demo Game ${n.title} logo`} style={{ width: '100%' }}/>
                         </div>
                         <div className="col">
                           <h5 className="mb-1">{n.title} <small className="text-muted">By {n.created_by}</small></h5>
                           <div>{n.description}</div>
                           <hr className="mt-1 mb-1"/>
                           <div className="text-muted">#scores submitted : {n.TotalScore}</div>
                         </div>
                       </div>
                     </div>
                   </a>
                 </div>
                     ))}
                     <div className="d-flex justify-content-center mt-5 gap-2">
                     {totalPage.map((en) => (
                     <button 
                     onClick = {() => pagee(en)}
                     className={`btn border px-3 border-3 py-1 ${en == page ? 'btn-primary' : 'btn-secondary'}`}
                     
                     >{en}</button>
                    )) }
                    </div>
                </div>
     
             </div>
          </div>
           
         </main>
        
       </div>
    );
  
}


export default Discover;