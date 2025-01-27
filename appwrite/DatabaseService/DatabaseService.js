import { Client, Databases, ID, Query } from "appwrite";
import { conf } from "./../../src/conf/conf";

class DatabaseService {
  client = new Client();
  database;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl);
    this.client.setProject(conf.appwriteProjectId);
    this.database = new Databases(this.client);
  }

  //addMessage

  async addMessage({ userId, message, timestamp, name }) {
    try {
      const new_message = await this.database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        {
          name,
          message,
          timestamp,
          userId,
        }
      );
      return new_message;
    } catch (error) {
      console.log(`Appwrite :: DatabaseService :: addMessage :: ${error}`);
      throw error;
    }
  }

  //getMessages

  async getAllMessages() {
    try {
      const allMessages = await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [Query.limit(5000)]
      );
      return allMessages;
    } catch (error) {
      console.log(`Appwrite :: DatabaseService :: getAllMessages :: ${error}`);
      throw error;
    }
  }
}

const databaseService = new DatabaseService();

export { databaseService };
