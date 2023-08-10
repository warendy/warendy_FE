import React, { useState, useEffect } from "react";
import axios from "axios";

const PostDetailPage = ({ postId }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      if (postId) {
        try {
          const response = await axios.get(
            `https://warendy.shop/boards/${postId}`
          );
          const postData = response.data;
          setPost(postData);
        } catch (error) {
          console.error("Error fetching post data:", error);
        }
      }
    };

    fetchPostData();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>게시글 상세 페이지</h2>
      <h3>{post.name}</h3>
      <p>{post.contents}</p>
    </div>
  );
};

export default PostDetailPage;
