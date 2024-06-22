import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import emptyimage from "../REGISTRATION/emptyimage.jpg"

function HomePage() {

  const [alldata, setalldata] = useState([])




  let token = localStorage.getItem("token")

  console.log("toekn in the homePage", token)
  const getAllUser = async () => {
    try {
      let result = await axios.get("http://localhost:7003/api/v2/get-user", {
        headers: {
          Authorization: token
        }
      })
      console.log(result.data)
      setalldata(result.data.getAlluser
      )

    } catch (error) {
      console.log(error)

    }
  }

  useEffect(() => {
    getAllUser()
  }, [])

  return (
    <div>
      <table className=' table table border'>
        <thead>
          <tr>
            <th>S/N</th>
            <th>FIRST NAME</th>
            <th>LAST NAME</th>
            <th>EMAIL</th>
            <th>AGE</th>
            <th>DATE OG BIRTH</th>
            <th>COUNTRY</th>
            <th>STATE</th>
            <th>IMAGE</th>
          </tr>
        </thead>
        <tbody>
          {
            alldata && alldata.map((val, index) => {
              return <tr>
                <td>{index + 1}</td>
                <td>{val.fname}</td>
                <td>{val.lname}</td>
                <td>{val.email}</td>
                <td>{val.age}</td>
                <td>{val.dob}</td>
                <td>{val.country}</td>
                <td>{val.state}</td>
                <td><img src={val.url ? val.url : emptyimage} width="200px" height="200px" /></td>
              </tr>
            })
          }

        </tbody>

      </table>

    </div>

  )
}

export default HomePage