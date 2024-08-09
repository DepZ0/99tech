import { RequestHandler } from "express";
import { Controller } from "./Controller";
import { AuthService } from "../services/authSystemService";

export class AuthController extends Controller {
  constructor(private authService: AuthService) {
    super("/auth");
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router.post("/sign-up", this.registration);
    this.router.post("/login", this.login);
  };

  private registration: RequestHandler = async (req, res) => {
    const { password, email: email } = req.body;
    const { accessToken, refreshToken } = await this.authService.registration({ email, password });

    res.cookie("refreshToken", refreshToken, { maxAge: 1000 * 60 * 120, httpOnly: true });
    res.cookie("accessToken", accessToken, { maxAge: 1000 * 60 * 120, httpOnly: true });

    return res.status(200).json({ message: "Registration successful" });
  };

  private login: RequestHandler = async (req, res) => {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await this.authService.login({ email, password });

    res.cookie("refreshToken", refreshToken, { maxAge: 1000 * 60 * 120, httpOnly: true });
    res.cookie("accessToken", accessToken, { maxAge: 1000 * 60 * 120, httpOnly: true });

    return res.status(200).json({ message: "Login successful" });
  };
}
