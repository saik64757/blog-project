import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { config } from "../App";

const Comment = ({ blogid }) => {
  const [Inputs, setvalue] = useState({ content: "", postId: blogid });
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setvalue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const configtoken = {
    headers: { Authorization: `Bearer ${token}` },
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const comment = await axios.post(
        `${config.endpoint}/comments`,
        Inputs,
        configtoken
      );
      console.log(comment);
      if (comment?.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        placeholder="comment"
        value={Inputs.content}
        name="content"
        margin="normal"
        type={"comment"}
        fullWidth
        onChange={handleChange}
      />
      <Button
        type="submit"
        sx={{ borderRadius: 3, marginTop: 1 }}
        variant="contained"
        color="primary"
      >
        Submit
      </Button>
    </form>
  );
};

export default Comment;
