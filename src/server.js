import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import habitRoutes from "./routes/habitRoutes.js";
import moodRoutes from "./routes/moodRoutes.js";
import journalRoutes from "./routes/journalRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());

const swaggerDocument = YAML.load("./docs/openapi.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/auth", authRoutes);

app.use("/api/habits", habitRoutes);

app.use("/api/moods", moodRoutes);

app.use("/api/journals", journalRoutes);

app.get("/", (req, res) => {
  res.send("MindBloom API is running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});