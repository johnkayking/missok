import React, { useEffect, useState } from 'react'
import axios from 'axios'

function GetAllUser() {

  const [getAllUser, setgetAllUser] = useState([])

  let token = localStorage.getItem("token")
  const allUser = async () => {
    let result = await axios.get("http://localhost:7003/api/v2/get-user", {
      headers: {
        Authorization: token()
      }
    })

    console.log(result.getUser)
  }

  useEffect(() => {
    allUser()
  })
  return (
    <div>
      <table>
        <thead>
          <th>S/N</th>
          <th>FISRT NAME</th>
          <th>LAST NAME</th>
          <th>EMAIL</th>
          <th>AGE</th>
          <th>DOB</th>
        </thead>
        <tbody>
          {
            getAllUser.map((value, index) => {
              return <tr key={value.id}>
                <td>{index + 1}</td>
                <td>{value.name}</td>
              </tr>
            })
          }

        </tbody>
      </table>


    </div>
  )
}

export default GetAllUser