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

    const canEditDelete = post && (post.username == name);
    console.log(canEditDelete);
    return (
        <main className="PostPage">
            <article className="post">
                {post &&
                    <>
                        <h2>{post.title}</h2>
                        <p className="postDate">Posted by <u>{post.username}</u> at {post.datetime}</p>
                        <p className="postBody">{post.body}</p>

                        {canEditDelete && (
              <>
                <button onClick={() => handleDelete(post.id)}>
                  Delete Post
                </button>
                <button onClick={() => handleEdit(post.id)}>Edit Post</button>
              </>
            )}
                        <button onClick={() => navigate(-1)}>go back</button>

                        
                    </>
                }
                {!post &&
                    <>
                        <h2>Post Not Found</h2>
                        <p>Well, that's disappointing.</p>
                        <p>
                            <Link to='/'>Visit Our Homepage</Link>
                        </p>
                    </>
                }
            </article>
        </main>
    )
}

export default PostPage