import Layout from "../../components/Layout";
import Review from "../../components/pages/Review";

const ReviewPage = () => {
  return (
    <>
      <Layout>
        <h3 className="title">내가 쓴 리뷰</h3>
        <Review />
      </Layout>
    </>
  );
};

export default ReviewPage;
