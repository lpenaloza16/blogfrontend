import React from "react";
function Post(props) {
  const deleteHandler = async () => {
    try {
      const response = await fetch(`http://localhost:10000/post/${props.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        props.onDelete(props.id);
      } else {
        // Handle error case here...
        const data = await response.json();
        throw new Error(data.message || "Failed to delete post.");
      }
    } catch (error) {
      alert(error.message || "Something went wrong!");
    }
  };

  return (
    <li>
      <h2>{props.title}</h2>
      <p>{props.content}</p>
      <button onClick={deleteHandler}>Delete</button>
    </li>
  );
}

function PostList(props) {
  console.log(props.posts);
  return (
    <ul>
      {props.posts.map((post) => (
        <Post
          key={post._id}
          id={post._id}
          title={post.title}
          content={post.content}
          onDelete={props.onDeletePost}
        />
      ))}
    </ul>
  );
}

export default PostList;
