import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((postsArray) => {
      if (postsArray) {
        setPosts(postsArray);
      }
    });
  }, []);

  return (
    <div className="min-h-screen py-12 bg-black text-slate-100">
      <Container>
        <h2 className="text-3xl font-semibold mb-6">All posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.$id} className="">
              <div className="bg-slate-900/50 backdrop-blur rounded-2xl p-4 shadow-lg h-full">
                <PostCard {...post} />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
