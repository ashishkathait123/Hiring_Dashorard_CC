import { connectDB } from "./db/index.js";
import { app } from "./app.js";
import dotenv from "dotenv";

dotenv.config({ path: "./env" });

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server listening on ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

app.on("error", (error) => {
 console.error("Server error:", error);
});
