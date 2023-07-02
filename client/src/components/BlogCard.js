import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import CommentIcon from "@mui/icons-material/Comment";
import { Box, IconButton } from "@mui/material";
import axios from "axios";
import { config } from "../App";
import Comment from "./Comment";

export default function BlogCard({
  title,
  description,
  username,
  time,
  id,
  isUser,
  upVote,
  downVote,
  setupdateBlogs,
  comments,
}) {
  const token = localStorage.getItem("token");
  const UserID = localStorage.getItem("UserID");

  const [Upvotes, setUpvotes] = useState(upVote);
  const [Downvotes, setDownvotes] = useState(downVote);
  const [showCommnets, setshowCommnets] = useState(false);

  const configtoken = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleDelete = async () => {
    try {
      const data = await axios.delete(
        `${config.endpoint}/posts/${id}`,
        configtoken
      );
      if (data?.data?.message === "Post deleted") {
        setupdateBlogs((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function updatevotecount(vote, id) {
    try {
      let response = await axios.patch(
        `${config.endpoint}/posts/votes/${id}`,
        {
          vote: vote,
          change: "increase",
        },
        configtoken
      );
      if (vote === "upVote") {
        setUpvotes(response?.data?.post?.votes?.upVotes);
      } else if (vote === "downVote") {
        setDownvotes(response?.data?.post?.votes?.downVotes);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card
      sx={{
        width: "50%",
        margin: "auto",
        mt: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover:": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username}
          </Avatar>
        }
        // title={username}
        // subheader={time}
      />
      <CardContent>
        <Typography variant="h5" color="text.secondary">
          Title : {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description : {description}
        </Typography>
      </CardContent>
      <div>
        {isUser && (
          <Box
            display={"flex"}
            sx={{
              justifyContent: "end",
            }}
          >
            <IconButton onClick={handleDelete}>
              <DeleteIcon color="error" />
            </IconButton>
          </Box>
        )}
        {UserID && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div>
              <IconButton onClick={(e) => updatevotecount("upVote", id)}>
                <ThumbUpIcon color="grey" />
                {Upvotes}
              </IconButton>
              <IconButton onClick={(e) => updatevotecount("downVote", id)}>
                <ThumbDownAltIcon color="grey" />
                {Downvotes}
              </IconButton>
            </div>
            <IconButton
              onClick={() => {
                setshowCommnets((prevVal) => !prevVal);
              }}
            >
              <CommentIcon color="grey" />
            </IconButton>
          </Box>
        )}
      </div>
      {token && <Comment blogid={id} />}

      {showCommnets && (
        <Box>
          {comments &&
            comments.map((comment, idx) => (
              <Box
                sx={{
                  background: "	#e3f2fd",
                  padding: 0.8,
                  borderRadius: 2,
                  margin: 1,
                }}
                key={idx}
              >
                <Typography variant="body2" color={"blue"}>
                  Comment by: {comment?.user?.username}
                </Typography>
                <Typography variant="body2">{comment?.content}</Typography>
              </Box>
            ))}
          {comments.length === 0 && <Box>No Comments Yet</Box>}
        </Box>
      )}
    </Card>
  );
}
