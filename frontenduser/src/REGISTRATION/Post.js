import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './Post.css'; // Import your CSS file for styling
import likeimage from '../REGISTRATION/like.png';
import { useParams } from 'react-router-dom';

function Post() {
  let [comment, setcomment] = useState('');
  let [like, setlike] = useState(0);
  let [image, setimage] = useState('');
  let [caption, setcaption] = useState('');
  let [usercom, setusercom] = useState([]);
  // let [postID,setpostID] = useState
  const {userID} = useParams()
  console.log(userID)


// useEffect(()=>{
//   const loadlike = async()=>{
//     const res = await axios.put(`http://localhost:7003/api/v2/create-post/${userID}`)
//   }
//  loadlike()
// },[])






  const formhandler = (e) => {
    e.preventDefault()
  }

  const commentuser = (todo) => {
    const newcoment = {
      todo: Math.round(),
      task: todo,
    };

    setusercom([...usercom].concat(newcoment));
    setcomment("")
  };

  

  const likecount = () => {
    setlike(like + 1);
  };

  let formData = new FormData();
  formData.append("userid", userID)
  // formData.append("postID" , postID)
  // formData.append('comment', comment);
  // formData.append('like', like);
  formData.append('caption', caption);
  formData.append('image', image);

  console.log(formData.get("image"))
  console.log(formData.get(userID))



  const createpost = async () => {

    try {
      let respond = await axios.post(
        "http://localhost:7003/api/v2/create-post",
        formData,
        {
          header: { 'content-type': 'multipart/form-data' },
        }
      );


      console.log(respond.data);
     


    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="post-container">
      <form onSubmit={formhandler}>
        <h1>This is my post</h1>

        <label>CAPTION</label>
        <input type="text" onChange={(e) => setcaption(e.target.value)} />

      

        <div>

         

          <input type="file" onChange={(e) => setimage(e.target.files[0])} />
        </div>

        <button onClick={() => createpost()}>submit</button>
      </form>


      {/* <table>
        <thead>
          <th>CAPTION</th>
          <th>COMMENT</th>
          <th>LIKE</th>
          <th>IMAGE</th>
        </thead>
        <tbody>
          <tr>
            <td>{singlepage.caption}</td>
            <td>{singlepage.comment}</td>
            <td>{singlepage.like}</td>
          </tr>
        </tbody>
      </table> */}
    </div>
  );
}

export default Post;