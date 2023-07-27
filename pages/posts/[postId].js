import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../posts/postld.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// 가상의 묵시적 게시글 데이터
const dummyPosts = [
  { id: 1, title: "게시글 1", content: "이것은 게시글 1의 내용입니다." },
  { id: 2, title: "게시글 2", content: "이것은 게시글 2의 내용입니다." },
  { id: 3, title: "게시글 3", content: "이것은 게시글 3의 내용입니다." },
  // ... 추가 게시글 데이터
];
const locationOptions = ["강남구", "동작구", "서초구", "관악구", "강북구"];

export default function PostDetail() {
  const router = useRouter();
  const { postId } = router.query;
  const [post, setPost] = useState(null);

  useEffect(() => {
    // postId를 사용하여 해당 게시글 데이터를 가져오는 로직
    const selectedPost = dummyPosts.find(
      (post) => post.id === parseInt(postId)
    );
    setPost(selectedPost);
  }, [postId]);

  const handleDateChange = (date) => {
    // TODO: Handle the selected date
    console.log("Selected date:", date);
  };

  // 게시글 데이터가 로딩 중일 때
  if (!post) {
    return <div>Loading...</div>;
  }

  // 게시글 데이터가 있을 때
  return (
    <div>
      <h2 className="top">동행 게시글</h2>
      <div className="inner">
        <div className={styles.titleWrap}>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </div>
        <div className={styles.listWrap}>
          <label>지역</label>
          <select>
            {locationOptions.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>

          <label>제목</label>
          <input type="text" placeholder="제목을 입력하세요" />

          <br />

          <label>시간</label>
          <select>
            <option value="am">AM</option>
            <option value="pm">PM</option>
          </select>
          <input type="text" placeholder="시간을 입력하세요" />

          <br />

          <label>날짜</label>
          <DatePicker selected={new Date()} onChange={handleDateChange} />

          <br />

          <label>인원</label>
          <input type="number" placeholder="인원수를 입력하세요" />
        </div>
      </div>
    </div>
  );
}
