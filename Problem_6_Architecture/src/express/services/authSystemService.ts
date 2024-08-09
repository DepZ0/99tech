import { AuthDataBase } from "../../database/authSystemDb";
import { BadRequestError } from "../../util/customErrors";
import { generateTokens } from "../../util/jwtTokens";
import { userRegistrationSchema } from "../../util/zodSchemas";
import bcrypt from "bcryptjs";

export class AuthService {
  constructor(private authDb: AuthDataBase) {}

  public async registration(body: { email: string; password: string }) {
    const { email, password } = userRegistrationSchema.parse(body);
    const isExist = await this.authDb.getUserByEmail(email);
    if (isExist) throw new BadRequestError(`User with email ${email} already exists`);

    const name = email.split("@")[0];
    const hashedPassword = bcrypt.hashSync(password, 5);
    const insertedUser = await this.authDb.createAndGetUser({
      email,
      name,
      password: hashedPassword,
    });

    const tokens = generateTokens(insertedUser.id);

    return tokens;
  }

  public async login(body: { email: string; password: string }) {
    const { email, password } = userRegistrationSchema.parse(body);
    const user = await this.authDb.login(email, password);

    const isExist = await this.authDb.getUserByEmail(email);
    if (!isExist) throw new BadRequestError(`User with email'${email}' not found`);

    const passwordIsValid = bcrypt.compareSync(password, user.passwordHash);
    if (!passwordIsValid) throw new BadRequestError("Incorrect password");

    const tokens = generateTokens(user.id);
    return tokens;
  }
}

export type NewUser = {
  googleId: string;
  name: string;
  email: string;
  passwordHash: string;
  stripeCustomerId: string;
};
