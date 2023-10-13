import React, { useState } from "react";

const NewPost = (props) => {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  const postHandler = (event) => {
    event.preventDefault();
    props.onAddPost(postTitle, postContent);
    setPostTitle("");
    setPostContent("");
  };

  return (
    <div>
      <h2>Add New Post</h2>
      <form onSubmit={postHandler}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={postTitle}
            onChange={(event) => setPostTitle(event.target.value)}
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            rows="4"
            value={postContent}
            onChange={(event) => setPostContent(event.target.value)}
          />
        </div>
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default NewPost;
