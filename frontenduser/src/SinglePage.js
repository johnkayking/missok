import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./singlepage.css";
import likelogo from "./REGISTRATION/like-logo.jpg";
import commentlogo from "./REGISTRATION/comment-logo.jpg";

function SinglePage() {
  const [singlePage, setSinglePage] = useState([]);
  const [like, setLike] = useState({ upvote: 0 });
  const [postuser, setPostuser] = useState("");
  const [comments, setComments] = useState({});
  const [isLoginPage, setIsLoginPage] = useState(true);
  const { userID } = useParams();

  const handleComment = (postID, value) => {
    setComments((prevComments) => ({
      ...prevComments,
      [postID]: value
    }));
  };

  const commentPost = async (postID) => {
    const commentData = {
      userID: userID,
      postID: postID,
      comment: comments[postID]
    };

    try {
      const res = await axios.put(`http://localhost:7003/api/v2/comment-user/${userID}`, commentData);
      console.log(res.data);

      setComments((prevComments) => ({
        ...prevComments,
        [postID]: ''
      }));
    } catch (error) {
      console.log({ error: "this is an error" });
    }
  };


  console.log("commnet ", comments)

  const fetchSinglePageUser = async () => {
    try {
      const response = await axios.get(`http://localhost:7003/api/v2/all-post-user/${userID}`);
      console.log(response.data);
      setSinglePage(response.data.postuser);
    } catch (error) {
      console.error('Error fetching single page data:', error);
    }
  };

  useEffect(() => {
    fetchSinglePageUser();
  }, [userID]);

  return (
    <div className="container">
      {singlePage.map((post) => (
        <div className="post" key={post._id}>
          <img className="post-image" src={post.url} alt="Post" />
          <div className="post-details">
            <h2 className="post-caption">{post.caption}</h2>
            <img src={commentlogo} width="70px" height="50px" alt="Comment Logo" />


            {post.comment.map(c => {
              return <div>
                <p>{c.userId}</p>
                <p>{c.commentData}</p>
              </div>
            })}


            {isLoginPage && (
              <>
                <input
                  type='text'
                  value={comments[post._id] || ''}
                  onChange={(e) => handleComment(post._id, e.target.value)}
                />


                <button onClick={() => { commentPost(post._id) }}>Submit</button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SinglePage;
