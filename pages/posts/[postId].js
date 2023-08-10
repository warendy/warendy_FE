import { useRouter } from "next/router";
import PostDetailPage from "./PostDetailPage";

const PostDetail = () => {
  const router = useRouter();
  const { postId } = router.query;

  return <PostDetailPage postId={postId} />;
};

export default PostDetail;
