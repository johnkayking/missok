import React from 'react'
import axios from 'axios'
import { useState } from 'react'

function CommentPost() {

    const [comment,setcommet] = useState("")
    const [postUser, setpostUser] = useState([])

    const{userID}= JSON.parse(localStorage.getItem("userList"))

    const postcomment = (newuser) =>{
        const postnewcomment ={
            todo : Math.round(),
            task : newuser

        }
        setcommet([...postUser].concat(postnewcomment))
        setpostUser("")
    }



    const formData = new FormData()
    formData.append("userid", userID)
    formData.append("comment", comment)

    const commentUser =async ()=>{
     

        let res = await axios.post(`http://localhost:7003/api/v2/comment-user`,
       formData,
       {
        Headers:{"content-Type" : "multipart/form-data"}
       }
    )
    console.log(res)
    }
  return (
    <div>
        <div>
            <label>comment</label>
            <input type='text' onChange={(e)=>setpostUser(e.target.value)}/>
        </div>

        <button onClick={()=>commentUser(comment)}>comment</button>

        
       
    </div>
  )
}

export default CommentPost