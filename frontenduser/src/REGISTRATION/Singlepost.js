import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'


function Singlepost() {

    let [singlepage ,setsinglepage] = useState([])

    console.log(singlepage)

   

    let {userID} = useParams()
    console.log(userID)

    const singlepageUser = async() =>{
        let result = await axios.get(`http://localhost:7003/api/v2/single-post/${userID}`)
        console.log(result.postuser)
        setsinglepage(result.data.postuser)
          
    }

    useEffect(()=>{
        singlepageUser()
    })
  return (
    <div>Singlepost</div>
  )
}

export default Singlepost