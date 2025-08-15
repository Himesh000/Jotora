import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const response = await this.account.create(ID.unique(), email, password, name);

      if (response) {
        console.log("Account created successfully:", response);
        return this.login({ email, password });
      } else {
        console.log("Account creation failed.");
        return response;
      }
    } catch (error) {
      console.error("Error creating account:", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const response = await this.account.createEmailPasswordSession(
        email,
        password
      );
      if (response) {
        console.log("Login successful:", response);
        return response;
      } else {
        console.log("Login failed.");
        return response;
      }
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();
      console.log("Current user:", user);
      return user;
    } catch (error) {
      console.error("Error fetching current user:", error);
      throw error;
    }
    return null;
  }

  async logout() {
    try {
      const response = await this.account.deleteSessions();
      console.log("Logout successful:", response);
      return response;
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
