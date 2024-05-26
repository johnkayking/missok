import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function proflle() {
    const [photo, setphoto] = useState("")
    const [fname,setfname] = useState("")
    const [lname,setlname] = useState("")
    const [email,setemail] = useState("")
    const [age,setage] = useState("")
    const [dob,setdob] = useState("")

    let navigate = useNavigate()



    const uploadphoto = async({setIsLoginPage})=>{

        const formData = new FormData()
        formData.append("images", photo)
        formData.append("fname",fname)
        formData.append("lname",lname)
        formData.append("email",email)
        formData.append("age",age)
        formData.append("dob",dob)


       let result = await axios.post("http://localhost:7003/api/v2/uploading" ,
        formData,
        {
          headers : {"content-type" : "multipart/form-data"}
        }
        

        )
        if(data.status){
          setIsLoginPage(true)
          navigate("/get-user")

        }
        navigate("/login")
        console.log(result.data)
       

    }


  return (
    <div>
         {/* <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>IMAGES</th>
              <th>FIRST NAME</th>
              <th>LAST NAME</th>
              <th>EMAIL</th>
              <th>AGE</th>
              <th>DATE OG BIRTH</th>
            </tr>
          </thead>
          <tbody>

          </tbody>

         </table> */}

         <table align='center' border={3} bgcolor='cyan'>
          <tr>
            <td>FIRST NAME</td>
            <td><input type='text' onChange={e => setfname(e.target.value)} /></td>
          </tr>

          <tr>
            <td>LAST NAME</td>
            <td><input type='text' onChange={e => setlname(e.target.value)} /></td>
          </tr>

          <tr>
            <td>EMAIL</td>
            <td><input type='text' onChange={e => setemail(e.target.value)} /></td>
          </tr>

          <tr>
            <td>AGE</td>
            <td><input type='text' onChange={e => setage(e.target.value)} /></td>
          </tr>
         

         <tr>
            <td>DOB</td>
            <td><input type='Date' onChange={e => setfname(e.target.value)} /></td>
          </tr>

          <tr>
            <td>IMAGES</td>
            <td><input type='file' onChange={e => setphoto(e.target.files[0])} /></td>
          </tr>

        {/* <input type='file' onChange={(e)=>setphoto(e.target.files[0])}/> */}
       <tr>
       <button onClick={()=>uploadphoto()}>submit</button>
       </tr>
        

        </table>
    </div>
  )
}

export default proflle
