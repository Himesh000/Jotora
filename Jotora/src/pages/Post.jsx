import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    if (!post) return;

    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        if (post.featuredImage) {
          appwriteService.deleteFile(post.featuredImage);
        }
        navigate("/");
      }
    });
  };

  // ✅ Only create imageUrl if post && post.featuredImage exist
  const imageUrl = post?.featuredImage
    ? appwriteService.getFileView(post.featuredImage)
    : null;

  console.log("Image URL:", imageUrl);

  if (!post) {
    return <div className="py-12 text-center text-slate-300">Loading...</div>;
  }

  return (
    <div className="min-h-screen py-12 bg-black text-slate-100">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900/50 backdrop-blur rounded-2xl p-6 shadow-2xl">
            {imageUrl && (
              <div className="w-full mb-6 rounded-lg overflow-hidden">
                <img
                  src={imageUrl}
                  alt={post.title}
                  className="w-full object-cover"
                />
              </div>
            )}

            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl font-semibold">{post.title}</h1>
              {isAuthor && (
                <div className="space-x-3">
                  <Link to={`/edit-post/${post.$id}`}>
                    <Button bgColor="bg-green-500">Edit</Button>
                  </Link>
                  <Button bgColor="bg-red-500" onClick={deletePost}>
                    Delete
                  </Button>
                </div>
              )}
            </div>

            <div className="prose prose-invert max-w-none">
              {parse(post.content)}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
