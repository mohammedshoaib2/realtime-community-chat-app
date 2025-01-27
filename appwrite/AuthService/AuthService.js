import { Client, Account, ID } from "appwrite";
import { conf } from "../../src/conf/conf";
import { use } from "react";

class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl);
    this.client.setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  //Signup

  async createUser({ name, email, password }) {
    try {
      await this.account.create(ID.unique(), email, password, name);
      return await this.login({ email, password });
    } catch (error) {
      console.log(`Appwrite :: AuthService :: createUser :: ${error}`);
      throw error;
    }
  }

  //login

  async login({ email, password }) {
    try {
      await this.account.createEmailPasswordSession(email, password);
      return await this.getCurrentUser();
    } catch (error) {
      console.log(`Appwrite :: AuthService :: login :: ${error}`);
      throw error;
    }
  }

  //logout

  async logout() {
    try {
      await this.account.deleteSessions();
      return true;
    } catch (error) {
      console.log(`Appwrite :: AuthService :: logout :: ${error}`);
      throw error;
    }
  }

  //getUser

  async getCurrentUser() {
    try {
      const user = await this.account.get();
      return user;
    } catch (error) {
      console.log(`Appwrite :: AuthService :: getCurrentUser :: ${error}`);
      throw error;
    }
  }
}

const authService = new AuthService();
export { authService };
