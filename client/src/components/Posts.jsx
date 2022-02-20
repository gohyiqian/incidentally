import { useEffect, useState, useCallback } from "react";
// import { getData } from "../api/api";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState("");
  const [loading, setLoading] = useState(false);

  //   const getPostsFromAPI = useCallback(async () => {
  //     setLoading(true);
  //     try {
  //       const res = await getData();
  //       console.log(res);
  //       setPosts(res);
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }, []);

  useEffect(() => {
    (async () => {
      const res = await axios.get("/backend");
      const info = res.data;
      setPosts(info.message);
    })();
  }, []);

  return <div>{posts}</div>;
};

export default Posts;
