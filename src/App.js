// import Layout from './Layout';
// import Home from './Components/Home';
// import NewPost from './Components/NewPost';
// import PostPage from './Components/PostPage';
// import About from './Components/About';
// import Missing from './Components/Missing';
// import { Route, Routes, useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { format } from 'date-fns';

// function App() {
//   const [posts, setPosts] = useState([
//     {
//       id: 1,
//       title: "My First Post",
//       datetime: "July 01, 2021 11:17:36 AM",
//       body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
//     },
//     {
//       id: 2,
//       title: "My 2nd Post",
//       datetime: "July 01, 2021 11:17:36 AM",
//       body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
//     },
//     {
//       id: 3,
//       title: "My 3rd Post",
//       datetime: "July 01, 2021 11:17:36 AM",
//       body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
//     },
//     {
//       id: 4,
//       title: "My Fourth Post",
//       datetime: "July 01, 2021 11:17:36 AM",
//       body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
//     }
//   ])
//   const [search, setSearch] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [postTitle, setPostTitle] = useState('');
//   const [postBody, setPostBody] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const filteredResults = posts.filter((post) =>
//       ((post.body).toLowerCase()).includes(search.toLowerCase())
//       || ((post.title).toLowerCase()).includes(search.toLowerCase()));

//     setSearchResults(filteredResults.reverse());
//   }, [posts, search])

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
//     const datetime = format(new Date(), 'MMMM dd, yyyy pp');
//     const newPost = { id, title: postTitle, datetime, body: postBody };
//     const allPosts = [...posts, newPost];
//     setPosts(allPosts);
//     setPostTitle('');
//     setPostBody('');
//     navigate('/');
//   }

//   const handleDelete = (id) => {
//     const postsList = posts.filter(post => post.id !== id);
//     setPosts(postsList);
//     navigate('/');
//   }

//   return (
//     <Routes>
//       <Route path="/" element={<Layout
//         search={search}
//         setSearch={setSearch}
//       />}>
//         <Route index element={<Home posts={searchResults} />} />
//         <Route path="post">
//           <Route index element={<NewPost
//             handleSubmit={handleSubmit}
//             postTitle={postTitle}
//             setPostTitle={setPostTitle}
//             postBody={postBody}
//             setPostBody={setPostBody}
//           />} />
//           <Route path=":id" element={<PostPage
//             posts={posts}
//             handleDelete={handleDelete}
//           />} />
//         </Route>
//         <Route path="about" element={<About />} />
//         <Route path="*" element={<Missing />} />
//       </Route>
//     </Routes>
//   );
// }

// export default App;




import Layout from './Layout';
import Home from './Components/Home';
import NewPost from './Components/NewPost';
import PostPage from './Components/PostPage';
import About from './Components/About';
import Missing from './Components/Missing';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editingPost, setEditingPost] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (editingPost) {
      try {
        await axios.put(`http://localhost:5000/api/posts/${editingPost.id}`, {
          title: postTitle,
          body: postBody
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
      const newPost = { id, title: postTitle, datetime, body: postBody };
      
      try {
        await axios.post('http://localhost:5000/api/posts', newPost);
        setPosts([...posts, newPost]);
        setPostTitle('');
        setPostBody('');
        navigate('/');
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  const handleEdit = (id) => {
    const postToEdit = posts.find((post) => post.id === id);
    setEditingPost(postToEdit);
    console.log(editingPost);
    setPostTitle(postToEdit.title);
    setPostBody(postToEdit.body);
    console.log(editingPost);
    navigate(`/post`);
  };
  

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
  //   const datetime = format(new Date(), 'MMMM dd, yyyy pp');
  //   const newPost = { id:id , title: postTitle, datetime, body: postBody };
    
  //   try {
  //     await axios.post('http://localhost:5000/api/postnew', newPost);
  //     setPosts([...posts, newPost]);
  //     setPostTitle('');
  //     setPostBody('');
  //     navigate('/');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      const postsList = posts.filter((post) => post.id !== id);
      setPosts(postsList);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<Layout search={search} setSearch={setSearch} />}
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
              />
            }
          />
          <Route
            path=":id"
            element={<PostPage posts={posts} handleDelete={handleDelete} handleEdit={handleEdit} />}
          />
        </Route>
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
