import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'

function Login({ setIsLoginPage }) {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [error,seterror] = useState("")
    const [emailmsg, setemailmsg] = useState("")


    let allNavigete = useNavigate()

    const loginUser = () => {

        fetch("http://localhost:7003/api/v2/login", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then((res) => {
            return res.json()
        }).then((data) => {
            console.log(data)
            if (data.status) {
                localStorage.setItem("user", data.status)
                setIsLoginPage(true)
                localStorage.setItem("userList" , JSON.stringify(data.user))
                setemailmsg("email dose not match")
                allNavigete("/home")
                return


            }
            if (data.msg === "invalid_password") {
                console.log("inavlid password")
                seterror("invalid password")
                return
            }
            allNavigete("/")
            console.log(data.status)
        })
        console.log(email)
    }





    return (
        <div className='main_div'>

            <h1>LOGIN</h1>

            <div>
                <label>EMAIL ADDRESS:</label>
                <input type='text' onChange={(e) => setemail(e.target.value)} />
            </div>
            <p>{emailmsg}</p>

            <div>
                <label>PASSWORD:</label>
                <input type='text' onChange={(e) => setpassword(e.target.value)} />
            </div>
            <p>{error}</p>


            <button onClick={() => loginUser()}>LOGIN</button>

        </div>
    )
}

export default Login