import React from 'react';

import Feed from './Feed';

const Home = ({ posts }) => {
    return (
        <main className="container body-content">
            <div className='row'>
                <div className='col-md-12'>
                    <div className="panel panel-info">
                    <div className="panel-heading">
							<h4 className='ms-2 p-2'>Blog Posts</h4>
					</div>
                {posts.length ? (
                <Feed posts={posts} />
            ) : (
                <p style={{ marginTop: "2rem" }}>
                    No posts to display.
                </p>
            )}
                    </div>
                </div>

            </div>
            
        </main>
    )
}

export default Home
