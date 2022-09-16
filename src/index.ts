import cors from "cors";
import express from "express";
import "express-async-errors";
import router from "./routes/routesIndex";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorHandler);
export default app;
