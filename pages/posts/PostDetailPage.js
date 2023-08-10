import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userTokenState } from "@/recoil/atoms";

const PostDetailPage = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [userToken, setUserToken] = useRecoilState(userTokenState);
  useEffect(() => {
    const fetchPostData = async () => {
      if (postId) {
        try {
          console.log(postId);
          const response = await axios.get(
            `https://warendy.shop/boards/${postId}/detail`,
            {
              headers: {
                Authorization: `${userToken}`,
              },
            }
          );
          const postData = response.data;
          setPost(postData);
        } catch (error) {
          console.error("Error fetching post data:", error);
        }
      }
    };

    fetchPostData();
  }, [postId, userToken]);

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
