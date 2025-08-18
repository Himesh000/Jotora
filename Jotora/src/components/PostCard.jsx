import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-white transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-600/20">
        <div className="w-full justify-center mb-4 h-40">
          {featuredImage ? (
            <img
              src={appwriteService.getFileView(featuredImage)}
              alt={title}
              className="rounded-lg w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-700 rounded-lg"></div>
          )}
        </div>
        <h2 className="text-xl font-bold truncate">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
