import Link from "next/link";

const dummyPosts = [
  { id: 1, title: "게시글 1", location: "강남구" },
  { id: 2, title: "게시글 2", location: "동작구" },
  { id: 3, title: "게시글 3", location: "서초구" },
];

export default function Posts() {
  return (
    <div className="top">
      <h1>블로그 게시글</h1>
      <ul>
        {dummyPosts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
