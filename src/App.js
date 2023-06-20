import Layout from './Layout';
import Home from './Components/Home';
import NewPost from './Components/NewPost';
import PostPage from './Components/PostPage';
import About from './Components/About';
import Missing from './Components/Missing';
import Login from './Components/Login';
import { Route, Routes, useNavigate  } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import Register from './Components/Register';

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editingPost, setEditingPost] = useState(null);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let token={};

  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/posts`);
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  
  const handleEdit = (id) => {
    const postToEdit = posts.find((post) => post.id === id);
    setEditingPost(postToEdit);
    console.log(editingPost);
    setPostTitle(postToEdit.title);
    setPostBody(postToEdit.body);
    console.log(editingPost);
    navigate(`/post`);
  };
  


  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_URL}/api/posts/${id}`);
      const postsList = posts.filter((post) => post.id !== id);
      setPosts(postsList);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const VerifyTokenUser = () => {
    token = JSON.parse(localStorage.getItem('token'));
    console.log("Validating ID with Username");
    const valID = token._id;
    const username = token.username;
    const verifyToken = async () => {
      try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/api/verify-token`, { _id: valID, username: username });
      console.log(response.data);
      
      } catch (error) {
        console.error(error);
        setIsLoggedIn(false);
        setError('Modification in Key Detected!');
        navigate('/');
      }
    }
    verifyToken();
  };


 
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token && token._id && token.username) {

      setIsLoggedIn(true);
      VerifyTokenUser();
    }
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (editingPost) {
      try {
        await axios.put(`${process.env.REACT_APP_URL}/api/posts/${editingPost.id}`, {
          title: postTitle,
          body: postBody,
        });
        
        const updatedPosts = posts.map((post) => {
          if (post.id === editingPost.id) {
            return {
              ...post,
              title: postTitle,
              body: postBody
            };
          }
          return post;
        });
        
        setPosts(updatedPosts);
        setEditingPost(null);
        setPostTitle('');
        setPostBody('');
        navigate('/');
      } catch (error) {
        console.error(error);
      }
    } else {
      const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
      const datetime = format(new Date(), 'MMMM dd, yyyy pp');
      const newPost = { id, title: postTitle, datetime, body: postBody, username: token.username };
      
      try {
        await axios.post(`${process.env.REACT_APP_URL}/api/posts`, newPost);
        setPosts([...posts, newPost]);
        setPostTitle('');
        setPostBody('');
        navigate('/');
      } catch (error) {
        console.error(error);
      }
    }
  };
  

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route index path="*" element={<Login setIsLoggedIn={setIsLoggedIn} error={error} setError={setError}/>} />
        <Route path="/register" element={<Register />} error={error} setError={setError} />
      </Routes>
    );
  }

  return (
    <Routes>
    
      <Route
        path="*"
        element={<Layout search={search} setSearch={setSearch} navigate={navigate} setIsLoggedIn={setIsLoggedIn} setError={setError} />}
      >
        <Route index element={<Home posts={searchResults} />} />
        <Route path="post">
          <Route
            index
            element={
              <NewPost
                handleSubmit={handleSubmit}
                postTitle={postTitle}
                setPostTitle={setPostTitle}
                postBody={postBody}
                setPostBody={setPostBody}
                editingPost={editingPost}
                VerifyTokenUser={VerifyTokenUser}
                token={token}
              />
            }
          />
          <Route
            path=":id"
            element={<PostPage posts={posts} handleDelete={handleDelete} handleEdit={handleEdit} VerifyTokenUser={VerifyTokenUser}/>}
          />
        </Route>
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
