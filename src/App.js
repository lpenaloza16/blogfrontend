import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import NewPost from "./components/Posts/NewPost";
import PostList from "./components/Posts/PostList";
import "./App.css";

function App() {
  const [loadedPosts, setLoadedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const response = await fetch("http://localhost:10000/posts");

      const responseData = await response.json();

      setLoadedPosts(responseData.posts);
      setIsLoading(false);
    };

    fetchPosts();
  }, []);

  const addPostHandler = async (postTitle, postContent) => {
    if (!postTitle.trim() || !postContent.trim()) {
      alert("Invalid input, please provide title and content");
      return;
    }
    try {
      const newPost = {
        title: postTitle,
        content: postContent,
      };

      // ...

      let hasError = false;

      const response = await fetch("http://localhost:10000/post", {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        hasError = true;
      }

      const responseData = await response.json();

      if (hasError) {
        throw new Error(responseData.message);
      }

      setLoadedPosts((prevPosts) => {
        return prevPosts.concat(responseData.post);
      });
    } catch (error) {
      alert(error.message || "Something went wrong!");
    }
  };

  const deletePostHandler = (postId) => {
    setLoadedPosts((prevPosts) =>
      prevPosts.filter((post) => post._id !== postId)
    );
  };

  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main className="app-container">
        <aside className="sidebar">
          {/* Perhaps navigation or user info here */}
        </aside>
        <section className="main-content">
          <NewPost onAddPost={addPostHandler} />
          {isLoading && <p className="loader">Loading...</p>}
          {!isLoading && (
            <PostList posts={loadedPosts} onDeletePost={deletePostHandler} />
          )}
        </section>
        <aside className="trending">
          {/* Trending or other secondary content here */}
        </aside>
      </main>
    </React.Fragment>
  );
}

export default App;
