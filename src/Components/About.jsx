import React from 'react';

const About = () => {
    return (
        <div className='container'>
            <div className="row">


            <div class="col-md-12">
                <div class="panel panel-info">
                    <div class="panel-heading">
                        <h4 class="ms-2 p-2">
                            About Simple Blog
                            </h4>
                            </div>
                            <div class="panel-body">
                                <div class="single category">
                                    <pre className='formatted-text'>
                                The MERN (MongoDB, Express, React, Node.js) stack is a powerful combination for developing full-stack web applications. This blog application built with MERN incorporates login and register functionality along with CRUD (Create, Read, Update, Delete) operations.
                                Users can register an account and securely log in to the application. The authentication process ensures that only authorized users can access the protected routes. Once logged in, users can create new blog posts, read existing posts, update their own posts, and delete posts if necessary.
                                The application leverages MongoDB as the database to store blog post data, Express as the backend framework for handling server-side logic and API routes, React as the frontend library for building a dynamic and interactive user interface, and Node.js as the runtime environment for running JavaScript on the server.
                                With the implemented CRUD functionalities, users can easily manage their blog posts, including creating new content, viewing posts in a user-friendly format, editing existing posts to keep them up to date, and removing posts when they are no longer relevant.
                                This MERN-based blog application offers a seamless and efficient way for users to share their thoughts, ideas, and experiences through blog posts while ensuring a secure and intuitive user experience.
                </pre>
                </div>
                </div>
                </div>
                </div>

           
        </div>
        </div>
    )
}

export default About
