import { UserRepository } from "../repositories/user.repository.js";
import DatabaseConnection, { QueryInterface } from "@src/database/connection.js";

export class ReadManyUserService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(query: any, doc: any) {
    let filter;

    if (query.filter) {
      filter = query.filter;
    }

    if (query.search) {
      filter = query.search;
    }

    const iQuery: QueryInterface = {
      fields: "",
      filter: filter,
      page: query.page,
      pageSize: query.pageSize,
      sort: "",
    };
    const userRepository = new UserRepository(this.db);
    const user = await userRepository.readMany(iQuery, doc);
    return {
      user,
    };
  }
}
