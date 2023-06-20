import React from 'react';
import Post from './Post';

const Feed = ({ posts }) => {
    return (
        <>
        <div class="panel-body">
                            <div class="single category">
                            <ul class="list-unstyled">

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