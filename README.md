# Simple Blog with CRUD Features

This is a simple blog application with basic CRUD (Create, Read, Update, Delete) operations, implemented using Node.js and MongoDB. The application also includes user authentication and token-based security for login and registration.

## Features

- User authentication using tokens for login and registration
- Create, Read, Update, and Delete blog posts
- Continuous updates while learning new concepts

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT)

## Installation

1. Clone the repository:

```shell
git clone <repository_url>
```

2. Navigate to the project directory:

```shell
cd simple-blog
```

3. Install the dependencies:

```shell
npm install
```

4. Set up the environment variables:

- Create a `.env` file in the root of the project.
- Add the following variables to the `.env` file:

  ```
  PORT=3000
  MONGODB_URI=<your_mongodb_uri>
  SECRET_KEY=<your_secret_key>
  ```

  Replace `<your_mongodb_uri>` with the connection string for your MongoDB database, and `<your_secret_key>` with a secret key used for JWT token generation.

5. Start the application:

```shell
npm start
```

The application will start running on `http://localhost:3000`.

## API Endpoints

The following API endpoints are available:

- **POST /api/auth/register** - Register a new user
- **POST /api/auth/login** - Login and generate a token
- **GET /api/posts** - Retrieve all blog posts
- **GET /api/posts/:id** - Retrieve a specific blog post
- **POST /api/posts** - Create a new blog post
- **PUT /api/posts/:id** - Update an existing blog post
- **DELETE /api/posts/:id** - Delete a blog post

## Future Updates

This simple blog application will be continuously updated to incorporate new features and concepts as part of the learning process. The updates may include:

- Improved user interface
- Commenting system
- Categories or tags for blog posts
- Search functionality
- Pagination for blog posts

## Contributing

Contributions to the project are welcome. If you have any ideas, suggestions, please open an issue or submit a pull request.
Note that I started learning React at 18/06/2023 and is still under the process while building this simple Blog


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
