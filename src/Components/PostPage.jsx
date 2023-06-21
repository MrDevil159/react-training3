import React, { useEffect, useState } from 'react';

import { useParams, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const PostPage = ({ posts, handleDelete, handleEdit, VerifyTokenUser }) => {
    const navigate = useNavigate();

    const { id } = useParams();
    VerifyTokenUser();
    const post = posts.find(post => (post.id).toString() === id);
    const [name, setName] = useState("");
    useEffect(() => {
      const token = JSON.parse(localStorage.getItem('token'));
      if (token && token._id && token.username) {
        const username = token.username;
        setName(username);
      }
    }, []);

    const canEditDelete = post && (post.username === name);
    console.log(canEditDelete);
    return (

<div className="container">
  <div className="row">
<div className="col-md-12">
  <div className="panel panel-info">

{ post ? (
<div className="panel-body">
      <div className="single category">
    <h1>{post.title}</h1>
    <span className="bytext">{post.datetime}</span>
    <hr />
    <p dangerouslySetInnerHTML={{ __html: post.body.replace(/\n/g, '<br>') }}></p>
    <div>
<span className="bytext">By - {post.username}</span>
<div className="pull-right">
{canEditDelete && (
  <>
  <button className="btn btn-primary btn-sm" onClick={() => handleEdit(post.id)}>Edit</button>
   <button className="ms-1 btn btn-danger btn-sm" onClick={() => handleDelete(post.id)}>Delete</button> 
   </>
)}
<button className="ms-1 btn btn-secondary btn-sm" onClick={() => navigate(-1)}>Go Back</button></div>         
     </div>
    </div>
    </div>
) : (

  <div className="panel panel-info">
    <div className="panel-body">
      <div className="single category">
        <h1 className='display-1'>Post Not Found</h1>
        <p>Well, that's disappointing.</p>
        <p>
          <Link to="/">Visit Our Homepage</Link>
        </p>
      </div>
    </div>
  </div>
)}


<hr/> 
    </div>
    </div>
</div>
</div>
    )
}

export default PostPage
