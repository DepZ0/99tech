import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { App } from "./app";
import "dotenv/config";
import { RefreshTokenService } from "./express/services/refreshTokenService";
import { RefreshTokenController } from "./express/controllers/refreshTokenController";
import { AuthDataBase } from "./database/authSystemDb";
import { AuthService } from "./express/services/authSystemService";
import { AuthController } from "./express/controllers/authController";
import { UserDataBase } from "database/userDb";
import { UserService } from "express/services/userService";
import { UserController } from "express/controllers/userController";

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool, { logger: false });

  await migrate(db, { migrationsFolder: "drizzle" });

  const authDb = new AuthDataBase(db);
  const authService = new AuthService(authDb);
  const authController = new AuthController(authService);

  const userDb = new UserDataBase(db);
  const userService = new UserService(userDb);
  const userController = new UserController(userService);

  const refreshTokenService = new RefreshTokenService(userDb);
  const refreshTokenController = new RefreshTokenController(refreshTokenService);

  const app = new App(3000, [authController, userController, refreshTokenController]);
  app.start();
}

main();
