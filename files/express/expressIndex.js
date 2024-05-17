import express from "express";
import userRouter from "./src/user/user.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
