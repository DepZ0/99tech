import { desc, eq } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { users, UsersSelect } from "schema";

export class UserDataBase {
  constructor(private db: NodePgDatabase) {}

  public async getUserByEmail(email: string) {
    const existingUsers = await this.db.select().from(users).where(eq(users.email, email));
    return existingUsers[0];
  }

  public async getUserById(userId: number): Promise<UsersSelect> {
    const existingUsers = await this.db.select().from(users).where(eq(users.id, userId));
    return existingUsers[0];
  }

  public async getProfileByEmail(userId: number) {
    const findProfile = await this.db.select().from(users).where(eq(users.id, userId));

    const profile = {
      name: findProfile[0].name,
      email: findProfile[0].email,
      score: findProfile[0].score,
      topPosition: null as number | null,
      createdAt: findProfile[0].createdAt,
      updatedAt: findProfile[0].updatedAt,
    };

    const topUsers = await this.getAllTopUsers();

    // Find top position
    const position = topUsers.findIndex((user) => user.name === profile.name && user.score === profile.score);

    // If user have top Set user's top position, if user out top (something wrong) Set null
    profile.topPosition = position !== -1 ? position + 1 : null;

    return profile;
  }

  public async addScoreForUser(userId: number) {
    const actualScore = (await this.getUserById(userId)).score;
    const updatedScore = actualScore + 10;
    const addScore = await this.db.update(users).set({ score: updatedScore }).where(eq(users.id, userId));
  }

  public async minusScoreForUser(userId: number) {
    const actualScore = (await this.getUserById(userId)).score;
    const updatedScore = actualScore - 5;
    const minusScore = await this.db.update(users).set({ score: updatedScore }).where(eq(users.id, userId));
  }

  public async getTop10() {
    const getTopUsers = await this.db
      .select({
        name: users.name,
        score: users.score,
      })
      .from(users)
      .orderBy(desc(users.score))
      .limit(10);

    return getTopUsers;
  }

  public async getAllTopUsers() {
    const getTopUsers = await this.db
      .select({
        name: users.name,
        score: users.score,
      })
      .from(users)
      .orderBy(desc(users.score));
    return getTopUsers;
  }
}
