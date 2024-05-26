import logo from './logo.svg';
import './App.css';
import Register from './REGISTRATION/Register';
import Login from './REGISTRATION/Login';
import { Routes,Route, useNavigate} from "react-router-dom"
import { useEffect, useState } from 'react';
import Protected from './REGISTRATION/Protected';
import Header from './Header';
import HomePage from './REGISTRATION/HomePage';
import GetAllUser from './ALLINFO/GetAllUser';
import EditProfile from './EditProfile';
import SinglePage from './SinglePage';
import Footer from './Footer';
import Post from "./REGISTRATION/Post"
import CommentPost from './REGISTRATION/CommentPost';

function App() {
  let [isLoginPage , setIsLoginPage] = useState(false)

  let usernavigator = useNavigate()


  let userLocalstorage = localStorage.getItem("user")


  useEffect(()=>{
    if(userLocalstorage){
      setIsLoginPage(true)
      usernavigator("/home")
    }
  },[])
  return (
    
    <div className="App">

      <Header></Header>
      
      
      <Routes>
        <Route path="/register" element={<Register/>}></Route>
        <Route path='/login' element={<Login setIsLoginPage ={setIsLoginPage}/>}></Route>

        <Route path='/'  element = {<Protected isLoginPage={isLoginPage}></Protected>}>
          <Route path='home' element={<HomePage/>}></Route>
          <Route path='get-user' element={<GetAllUser></GetAllUser>}></Route>
          <Route path='editprofile/:userID' element ={<EditProfile />}></Route>
          <Route path = 'singlepage/:userID' element ={<SinglePage />}></Route>
          <Route path='create/:userID' element={<Post></Post>}></Route>
          <Route path='comment/:userID' element = {<CommentPost></CommentPost>}></Route>





          
        </Route>
      </Routes>

      <Footer></Footer>
      
      
    </div>
    
  );
}

export default App;
