import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return post ? (
    <div className="min-h-screen py-12 bg-black text-slate-100">
      <Container>
        <div className="max-w-3xl mx-auto bg-slate-900/50 backdrop-blur rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold mb-4">Edit post</h2>
          <PostForm post={post} />
        </div>
      </Container>
    </div>
  ) : (
    <div className="py-12 text-center text-slate-300">Loading...</div>
  );
}

export default EditPost;
