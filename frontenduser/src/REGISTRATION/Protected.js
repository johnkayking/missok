import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

function Protected({isLoginPage}) {

  let navigate = useNavigate()
  // const myNavigate = useNavigate()

  console.log("protectec route")




  useEffect(()=>{
    if(!isLoginPage){
      navigate("/register")
      // myNavigate("/")

    }
     
  },[])

  console.log(isLoginPage)

  
  return (
    <div>
      {isLoginPage && <Outlet/>}
    </div>
  )
}

export default Protected