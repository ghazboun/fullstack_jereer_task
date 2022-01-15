import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post';
import { useSelector } from 'react-redux';

const Feed = () => {
  //Get Logged in user
  const user = useSelector((state) => state.auth.user);
  //Track Changes to rerender component to show new post
  const [change, SetChange] = useState(false);
  //Array of posts
  const [posts, setPosts] = useState([]);
  //New post to be published
  const [newPost, setNewPost] = useState('');

  //Post component for maping into cards
  function createPost(posts) {
    return (
      <Post
        key={posts._id}
        id={posts._id}
        username={posts.username}
        user={posts.user}
        date={posts.date.toString().substr(0, 10)}
        text={posts.text}
      />
    );
  }

  //Fethcing posts from DB
  const fetchData = async () => {
    await axios
      .get('/api/posts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Submitting new post
  const onSubmit = (e) => {
    e.preventDefault();
    const NewPost = {
      username: user.username,
      text: newPost,
    };

    axios.post('api/posts', NewPost).then((res) => SetChange(!change));

    setNewPost('');
  };

  //Rerendering each time a new post has been published
  useEffect(() => {
    fetchData();
  }, [change]);

  return user ? (
    <div className="container">
      <form className="form inline" onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          placeholder={`Would you like to share your thoughts ${user.username}?`}
          name="username"
          required
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <input type="submit" className="btn btn-primary" value="Post" />
      </form>
      <div className="">{posts.map(createPost)}</div>
    </div>
  ) : (
    <h1>Failed to load</h1>
  );
};

export default Feed;
