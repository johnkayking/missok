import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import "./Edituser.css"
import emptyimg from "./REGISTRATION/emptyimage.jpg"

function EditProfile() {
    let [fname, setfname] = useState("")
    let [lname, setlname] = useState("")
    let [email, setemail] = useState("")
    let [state, setstate] = useState("")
    let [address ,setaddress] = useState("")
    let [country, setcountry] = useState("")
    let [dob, setdob] = useState("")
    let [age, setage] = useState("")
    let [photo, setphoto] = useState("")
    let [getsingleuser, setgetsingleuser] = ([])

    const { userID } = useParams()
    console.log(userID)

    const getsinglepage = async () => {
        try {

            let result = await axios.get(`http://localhost:7003/api/v2/get-single-user/${userID}`)
            console.log("the data is not coming",result.data.data.getSpecificUser)
            if (result.data.data.getSpecificUser) {
                setfname(result.data.data.getSpecificUser.fname)
                setlname(result.data.data.getSpecificUser.lname)
                setemail(result.data.data.getSpecificUser.email)
                setstate(result.data.data.getSpecificUser.state)
                setcountry(result.data.data.getSpecificUser.country)
                setage(result.data.data.getSpecificUser.age)
                setdob(result.data.data.getSpecificUser.dob)
                setaddress(result.data.data.getSpecificUser.address)
            
            }
            setgetsingleuser(result.data.data.getSpecificUser)


        } catch (error) {
            console.log(error, "there is an error in your code")

        }

    }


    useEffect(() => {
        getsinglepage()
    }, [])


    const editUserInfo = async (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append("fname", fname)
        formData.append("lname", lname)
        formData.append("email", email)
        formData.append("state", state)
        formData.append("country", country)
        formData.append("age", age)
        formData.append("dob", dob)
        formData.append("photo", photo)
        console.log(formData.get("fname"), formData.get("lname"))

        console.log(formData.get("photo"))

        for (const i of formData) {
            console.log(i[0], i[1])
        }
        try {
            let response = await axios.patch(`http://localhost:7003/api/v2/update/${userID}`,
                formData,
                {
                    headers: { "content-type": "multipart/form-data" }
                },

            )
            console.log(response.data)


        } catch (error) {
            console.log("this is a big error in my code", error.response)

        }



    }


    console.log(fname,lname,email,state,country,age,dob)
    console.log(photo)

    return (
        <div>
            <form>
                <div>
                    <label>FIRST fname :</label>
                    <input type='text' value={fname} onChange={(e) => setfname(e.target.value)} />
                </div>

                <div>
                    <label>LAST fname :</label>
                    <input type='text' value={lname} onChange={(e) => setlname(e.target.value)} />
                </div>

                <div>
                    <label>EMAIL :</label>
                    <input type='text' value={email} disabled />
                </div>

                <div>
                    <label>STATE :</label>
                    <input type='text' value={state} onChange={(e) => setstate(e.target.value)} />
                </div>

                <div>
                    <label>COUNTRY :</label>
                    <input type='text' value={country} onChange={(e) => setcountry(e.target.value)} />
                </div>

                <div>
                    <label>ADDRESS :</label>
                    <input type='text' value={address} onChange={(e) => setaddress(e.target.value)} />
                </div>


                <div>
                    <label>DATE OF BIRTH :</label>
                    <input type='date' value={dob} onChange={(e) => setdob(e.target.value)} />
                </div>

                <div>
                    <label>AGE :</label>
                    <input type='text' value={age} onChange={(e) => setage(e.target.value)} />
                </div>

                <div>
                    <label>IMAGES :</label>
                    <input type='file' onChange={(e) => setphoto(e.target.files[0])} />
                </div>

                <button onClick={(e) => editUserInfo(e)}>Submit</button>

            </form>

           
                <table>

                <tr>
                        <td>IMAGES:</td>
                        <td><img src={photo?photo :emptyimg} width="50px" height="50px" /></td>
                    </tr>

                    <tr>
                        <td>FIRST NAME:</td>
                        <td>{fname}</td>
                    </tr>

                    <tr>
                        <td>LAST NAME:</td>
                        <td>{lname}</td>
                    </tr>

                    <tr>
                        <td>EMAIL:</td>
                        <td>{email}</td>
                    </tr>

                    <tr>
                        <td>ADDRESS:</td>
                        <td>{address}</td>
                    </tr>

                    <tr>
                        <td>STATE:</td>
                        <td>{state}</td>
                    </tr>

                    <tr>
                        <td>COUNTRY:</td>
                        <td>{country}</td>
                    </tr>

                    <tr>
                        <td>AGE:</td>
                        <td>{age}</td>
                    </tr>

                    <tr>
                        <td>DATE OF BIRTH:</td>
                        <td>{dob}</td>
                    </tr>
                </table>
        </div>
    )
}

export default EditProfile