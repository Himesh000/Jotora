import conf from "../conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      const response = await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectiontId,
        slug,
        {
          title,
          slug,
          content,
          featuredImage,
          status,
          userId,
        }
      );
      console.log("Post created successfully:", response);
      return response;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      const response = await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectiontId,
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
        conf.appwriteCollectiontId,
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
        conf.appwriteCollectiontId,
        slug
      );
      console.log("Post fetched successfully:", response);
      return response;
    } catch (error) {
      console.error("Error fetching post:", error);
      throw error;
    }
  }

  async getPosts({ queries = [Query.equal("status", "active")] }) {
    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectiontId,
        queries
      );
      console.log("Posts fetched successfully:", response);
      return response.documents;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  }

  // file upload service

  async uploadFile(file) {
    try {
      const response = await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
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

  async getFilePreview(fileId) {
    try {
      const response = await this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId
      );
      console.log("File preview fetched successfully:", response);
      return response;
    } catch (error) {
      console.error("Error fetching file preview:", error);
      throw error;
    }
  }
}

const service = new Service();

export default service;
