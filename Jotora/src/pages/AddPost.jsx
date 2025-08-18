import React from "react";
import { Container, PostForm } from "../components";

function AddPost() {
  return (
    <div className="min-h-screen py-12 bg-black text-slate-100">
      <Container>
        <div className="max-w-3xl mx-auto bg-slate-900/50 backdrop-blur rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold mb-4">Create a new post</h2>
          <PostForm />
        </div>
      </Container>
    </div>
  );
}

export default AddPost;
