import React from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'
import { FaUser, FaEdit, FaSign, FaNewspaper } from "react-icons/fa"
import emptyimage from "./REGISTRATION/emptyimage.jpg"

function Header() {
  const localStorageList = JSON.parse(localStorage.getItem("userList"))
  console.log(localStorageList)

  const signOut = () => {
    localStorage.clear()
    window.location.reload()
    console.log(localStorageList)


  }
  return (
    <div>
      <div className='head-container'><h4>HEADER</h4></div>
      <div className='link-container'>

        <h1>NEW APP<FaNewspaper color='white'></FaNewspaper></h1>

        <div className='icon-container'>

          {

            localStorageList && (
              <>
                <Link to={localStorageList !== null && `/singlepage/${localStorageList._id}`}><FaEdit color='white'></FaEdit></Link>

              </>
            )}

          {
            localStorageList &&
            (
              <>
                <Link to={localStorageList !== null && `/editprofile/${localStorageList._id}`}><FaSign color='white'></FaSign></Link>
              </>

            )
          }

          {
            localStorageList &&
            (
              <>
                <Link to={localStorageList !== null && `/create/${localStorageList._id}`}><FaSign color='white'></FaSign></Link>
              </>

            )
          }




          {
            localStorageList && (
              <>
                <Link className='link'><img src={emptyimage} width="30px" height="30px"></img>{localStorageList !== null && localStorageList.fname}<br></br> {localStorageList !== null && localStorageList.lname}</Link>


                <button onClick={() => signOut()}>signOut</button>
              </>
            )}






        </div>

      </div>

    </div>


  )
}

export default Header











// # this is good