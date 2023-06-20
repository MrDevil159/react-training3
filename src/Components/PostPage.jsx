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

<div class="container">
  <div className="row">
<div class="col-md-12">
  <div className="panel panel-info">

{ post ? (
<div className="panel-body">
      <div className="single category">
    <h1>{post.title}</h1>
    <hr />
    <p dangerouslySetInnerHTML={{ __html: post.body.replace(/\n/g, '<br>') }}></p>
    <div>
<span class="bytext">Posted {post.datetime}</span><br/>
<span class="bytext">By - {post.username}</span>

<div class="pull-right">
{canEditDelete && (
  <>
  <button class="btn btn-primary" onClick={() => handleEdit(post.id)}>Edit</button>
   <button class="ms-1 btn btn-danger" onClick={() => handleDelete(post.id)}>Delete</button> 
   </>
)}
<button class="ms-1 btn btn-secondary" onClick={() => navigate(-1)}>Go Back</button></div>         
     </div>
    <hr/> 
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



    </div>
    </div>
</div>
</div>
    )
}

export default PostPage