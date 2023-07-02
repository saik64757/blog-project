import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { config } from "../App";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [updateBlogs, setupdateBlogs] = useState(false);
  //get blogs
  const getAllBlogs = async () => {
    try {
      setisLoading(false);
      const data = await axios.get(`${config.endpoint}/posts`);
      if (data?.data?.posts) {
        setBlogs(data?.data?.posts);
      }
      setisLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, [updateBlogs]);
  // console.log(blogs);
  return (
    <>
      <Stack
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {isLoading ? (
          blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              id={blog?._id}
              isUser={localStorage.getItem("UserID") === blog?.user?._id}
              title={blog?.title}
              description={blog?.description}
              username={blog?.user?.username}
              time={blog?.createdAt}
              upVote={blog?.votes?.upVotes}
              downVote={blog?.votes?.downVotes}
              setupdateBlogs={setupdateBlogs}
              comments={blog?.comments}
            />
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Stack>
    </>
  );
};

export default Blogs;
