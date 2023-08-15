import { rest } from "msw";

const seoulOptions = ["강남구", "동작구", "서초구", "관악구", "강북구"];
const gyeonggiOptions = ["용인시", "수원시", "성남시", "안양시", "고양시"];

const dummyPosts = [
  { id: 1, title: "게시글 1", location: "강남구" },
  { id: 2, title: "게시글 2", location: "동작구" },
  { id: 3, title: "게시글 3", location: "서초구" },
];

export const handlers = [
  rest.get("/api/posts", (req, res, ctx) => {
    const location = req.url.searchParams.get("location");
    const searchInput = req.url.searchParams.get("searchInput");

    let filteredPosts = [];
    if (location === "서울") {
      filteredPosts = dummyPosts.filter((post) =>
        seoulOptions.includes(post.location)
      );
    } else if (location === "경기") {
      filteredPosts = dummyPosts.filter((post) =>
        gyeonggiOptions.includes(post.location)
      );
    } else {
      filteredPosts = dummyPosts;
    }

    if (searchInput) {
      filteredPosts = filteredPosts.filter((post) =>
        post.title.includes(searchInput)
      );
    }

    return res(ctx.status(200), ctx.json(filteredPosts));
  }),
];
