import { UserDataBase } from "database/userDb";

export class UserService {
  constructor(private userDb: UserDataBase) {}

  private currentTasks: Map<number, number> = new Map();

  public async getProfile(userId: number) {
    try {
      return await this.userDb.getProfileByEmail(userId);
    } catch (error) {
      return error;
    }
  }

  public async getTask(userId: number) {
    const getRandomInt = (max: number) => {
      return Math.floor(Math.random() * max);
    };

    const num1 = getRandomInt(100);
    const num2 = getRandomInt(100);
    const task = `${num1} + ${num2} = ?`;

    const result = num1 + num2;

    this.currentTasks.set(userId, result);

    return { task };
  }

  public async checkTaskAnswer(userId: number, userAnswer: number) {
    const correctAnswer = this.currentTasks.get(userId);

    if (correctAnswer === undefined) {
      return { error: "Task not found or expired." };
    }

    this.currentTasks.delete(userId);

    if (correctAnswer === userAnswer) {
      await this.userDb.addScoreForUser(userId);
      return "Correct! Take your 10 points! =)";
    } else {
      await this.userDb.minusScoreForUser(userId);
      return `Incorrect! The correct answer was ${correctAnswer}. You lost 5 points =(`;
    }
  }

  public async getTop10() {
    const result = await this.userDb.getTop10();
    return result;
  }
}
