import { useRouter } from "next/router";
import PostDetailPage from "./[postId]";

const PostDetail = () => {
  const router = useRouter();
  const { postId } = router.query;

  return (
    <div className="top">
      <PostDetailPage postId={postId} />
    </div>
  );
};

export default PostDetail;
