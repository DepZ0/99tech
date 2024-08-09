import { eq } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { users } from "../schema";

export class AuthDataBase {
  constructor(private db: NodePgDatabase) {}

  public async getUserByEmail(email: string) {
    const existingUsers = await this.db.select().from(users).where(eq(users.email, email));
    return existingUsers[0];
  }

  public async createAndGetUser({ name, email, password }: { name: string; email: string; password: string }) {
    const user = await this.db
      .insert(users)
      .values({
        name: name,
        email: email,
        passwordHash: password,
      })
      .returning();

    return user[0];
  }

  public login = async (email: string, password: string) => {
    const user = await this.db.select().from(users).where(eq(users.email, email));

    return user[0];
  };
}
