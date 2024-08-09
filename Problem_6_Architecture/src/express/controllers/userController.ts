import { UserService } from "express/services/userService";
import { Controller } from "./Controller";
import { authenticateToken, RequestWithUser } from "util/authenticateToken";
import { RequestHandler } from "express";
import { extractAccessToken } from "util/extractTokens";

export class UserController extends Controller {
  constructor(private userService: UserService) {
    super("/");
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router.get("/profile", extractAccessToken, authenticateToken, this.getProfile);
    this.router.get("/task", extractAccessToken, authenticateToken, this.getTask);
    this.router.post("/task", extractAccessToken, authenticateToken, this.getTaskAnswer);
    this.router.get("/top10", this.getTop10);
  };

  private getProfile: RequestHandler = async (req: RequestWithUser, res) => {
    const userId = Number(req.user?.id);
    const result = await this.userService.getProfile(userId);

    return res.status(200).json(result);
  };

  private getTask: RequestHandler = async (req: RequestWithUser, res) => {
    const userId = Number(req.user?.id);
    const task = await this.userService.getTask(userId);

    res.status(200).json(task);
  };

  private getTaskAnswer: RequestHandler = async (req: RequestWithUser, res) => {
    const userId = Number(req.user?.id);
    const userAnswer = Number(req.body.answer);

    const result = await this.userService.checkTaskAnswer(userId, userAnswer);

    if (typeof result === "string") {
      return res.status(200).json({ result });
    } else {
      return res.status(400).json(result);
    }
  };

  private getTop10: RequestHandler = async (req, res) => {
    const result = await this.userService.getTop10();
    res.status(200).json(result);
  };
}
