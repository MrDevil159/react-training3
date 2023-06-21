import React from 'react';
import Post from './Post';

const Feed = ({ posts }) => {
    return (
        <>
        <div className="panel-body">
                            <div className="single category">
                            <ul className="list-unstyled">

            {posts.map(post => (
                <Post key={post.id} post={post} />
            ))}
            </ul>
                </div>					
        </div>
        </>
    )
}

export default Feed