import conf from "../conf/conf.js";
import authService from "./auth.js";
import {
  Client,
  Databases,
  Storage,
  Account,
  ID,
  Query,
  Permission,
  Role,
} from "appwrite";
export class Service {
  client = new Client();
  databases;
  bucket;
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
    this.account = new Account(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, user }) {
    if (!user) {
      console.error("❌ createPost failed: User is missing");
      throw new Error("User ID is required");
    }

    if (!title || !content || !featuredImage) {
      console.error("❌ createPost failed: Missing required fields", {
        title,
        content,
        featuredImage,
      });
      throw new Error("Missing required fields");
    }

    try {
      const response = await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        {
          title,
          slug,
          content,
          featuredImage,
          status,
          user, // ✅ This must exist in Appwrite schema
        }
      );

      console.log("✅ Post created successfully:", response);
      return response;
    } catch (error) {
      console.error("❌ Error creating post:", error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      const response = await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
      console.log("Post updated successfully:", response);
      return response;
    } catch (error) {
      console.error("Error updating post:", error);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      const response = await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      console.log("Post deleted successfully:", response);
      return true;
    } catch (error) {
      console.error("Error deleting post:", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      const response = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      console.log("Post fetched successfully:", response);
      return response;
    } catch (error) {
      console.error("Error fetching post:", error);
      throw error;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
      // ✅ Return the array of documents directly
      return response.documents;
    } catch (error) {
      console.error("Error fetching posts:", error);
      // ✅ Return an empty array on failure to prevent crashes
      return [];
    }
  }

  // file upload service

  async uploadFile(file) {
    try {
      const user = await authService.getCurrentUser();
      const response = await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file,
        [Permission.read(Role.any())]
      );
      console.log("File uploaded successfully:", response);
      return response;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      const response = await this.bucket.deleteFile(
        conf.appwriteBucketId,
        fileId
      );
      console.log("File deleted successfully:", response);
      return true;
    } catch (error) {
      console.error("Error deleting file:", error);
      return false;
    }
  }

  getFileView(fileId) {
    try {
      return this.bucket.getFileView(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.error("Error fetching file view:", error);
      throw error;
    }
  }
}

const service = new Service();

export default service;
export const account = service.account;
