import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
    return (
        <li className='p-2 ms-2 me-2'>
            <Link to={`post/${post.id}`}>
                <h4 className='fw-300'>{post.title}<span className="pull-right">{post.datetime}</span></h4>
                <span className='bytext'>By - {post.username}</span>
            </Link>

        </li>
    )
}

export default Post