import React, { useState } from 'react'
import "./register.css"
import {Link, useNavigate} from "react-router-dom"

function Register({isLoginPage}) {
    const [fname ,setFname] = useState("")
    const [lname ,setLname] = useState("")
    const [email,setemail] = useState("")
    const [password,setpassword] = useState("")
    const [Cpassword,setCpassword] = useState("")
    const [dob,setdate]= useState("")
    const [next,setnext] = useState(true)

    let navigate = useNavigate()
    let mynavigator = useNavigate()
    

    

    const registerUser = ()=>{
        if(password === Cpassword){
            fetch("http://localhost:7003/api/v2/register",{
            method: "POST",
            headers : {"content-Type" : "application/json"},
            body:JSON.stringify({
                fname: fname,
                lname :  lname,
                email:email,
                password :password,
                dob:dob
            })
        }).then((res)=>{
            return res.json()
        }).then((data)=>{
            console.log(data)
            if(data.status){
               isLoginPage && isLoginPage(false) 
                navigate("/register")

            }
            // mynavigator("/login")
        })
        }else{
            window.alert("password did not match")
        }
      
    }
  return (
    <div className='main_div'> 

    <h1>REGISTRATION FROM</h1>
        <div className='text_field'> 
            <label>FIRST NAME:</label>
            <input type='text' onChange={(e)=>setFname(e.target.value)}/>
        </div>

        <div className='text_field'>
        <label  >LAST NAME:</label>
            <input type='text' onChange={(e)=>setLname(e.target.value)}/>

        </div>


        <div className='text_field'>
        <label>EMAIL ADDRESS:</label>
            <input className='email' type='text'  onChange={(e)=>setemail(e.target.value)}/>
        </div>


        <div className='text_field'>
        <label>PASSWORD:</label>
            <input type='password'  onChange={(e)=>setpassword(e.target.value)}/>
        </div>

        <div className='text_field'>
        <label>CPASSWORD:</label>
            <input type='password'  onChange={(e)=>setCpassword((e).target.value)}/>
        </div>

        <div className='text_field'>
        <label>DATE OF BIRTH:</label>
            <input className='date' type='date'  onChange={(e)=>setdate((e).target.value)}/>
        </div>

      
        

        


       <button onClick={()=>registerUser()}>REGISTER</button>
       <Link to ="/login"><button>LOGIN</button></Link>

    </div>
  )
}

export default Register
