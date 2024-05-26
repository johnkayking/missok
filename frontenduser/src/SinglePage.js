import React, { useEffect, useState } from 'react';
import { useParams,Link, Await } from 'react-router-dom';
import axios from 'axios';
import "./singlepage.css"
import likelogo from "./REGISTRATION/like-logo.jpg"
import commentlogo from "./REGISTRATION/comment-logo.jpg"

function SinglePage() {
    const [singlePage, setSinglePage] = useState([]);
    let [like, setlike] = useState({upvote:0});
    const [postuser, setpostuser] = useState("")
    let [comment ,setcomment] = useState([])
    let [isLoginPage , setIsLoginPage] = useState(true)
    const { userID } = useParams();
    

   const handlecomment =(postID, value) =>{
   

    setcomment((prevcomments)=>({
      comment,
      [postID]:value
    }))
   }
   

    const commentPost =async (postID)=>{
       comment ={
        userID : userID,
        postID :postID,
        comment : comment

      }

      try {
        const res = await axios.put(`http://localhost:7003/api/v2/comment-user/${userID}`, comment)
      console.log(res.data)
     
      setcomment((prevComments) => ({
        ...prevComments,
        [postID]: ''
    }));
      } catch (error) {
        console.log({error:"this is an error"})
        
      }
    }

  

    

    const fetchSinglePageUser = async () => {
        try {
            const response = await axios.get(`http://localhost:7003/api/v2/all-post-user/${userID}`);
            console.log(response.data) 
            setSinglePage(response.data.postuser);
        } catch (error) {
            console.error('Error fetching single page data:', error);
        }
    };

    useEffect(() => {
        fetchSinglePageUser();
    }, []);

    return (
        <div className="container">
          { 
            singlePage.map((post, index)=>{
              return  <div className="post">
              <img className="post-image" src={post.url} alt="Post" />
              <div className="post-details">

                  <h2 className="post-caption">{post.caption}</h2>
                  <img src={commentlogo} width="70px" height="50px"/> 
                  {
                    isLoginPage ?(
                    <>
                    <input type='text' onChange={(e)=>handlecomment(post._id ,e.target.value)}/>
                    <button onClick={()=>{commentPost(post._id)}}>submit</button>
                    </>)
                     : null
                   
                  }
                  
              </div>
          </div>
            })
          }
           
        </div>
    );

  }

    export default SinglePage





    // useEffect(()=>{
    //   const loadlike = async()=>{
    //      const response = await axios.put(`http://localhost:7003/api/v2/create-post/${localStorageList}`)
    //   }
    //  loadlike()

    // },[])




    {/* <Link to={localStorageList != null && `/comment/${localStorageList._id}`}><p className="post-comment">{post.comment}<img src={commentlogo} width="60px" height="40px"alt="Like Logo" /></p></Link>
                  <p className="post-like">{like.upvote} <img src={likelogo} width="60px" height="40px" alt="Like Logo" /></p> */}



       // const newcomment ={
    //   todo :Math.random(),
    //   task : postID
    // }

    // setcomment([...postuser].concat(newcomment))
    // setpostuser("")