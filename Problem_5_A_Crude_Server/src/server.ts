import express from "express";
import resourceRoutes from "./routes/resourceRoutes";
import { initDb } from "./database";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/resources", resourceRoutes);

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database", err);
  });
