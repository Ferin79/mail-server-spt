import { handleErrors } from "./middlewares/handleErrors";
import { RequestLogger } from "./middlewares/RequestLogger";
import * as dotenv from "dotenv";
import express from "express";
import { createConnection } from "typeorm";
import compression from "compression";
import cors from "cors";
import router from "./routes";
import { pagination } from "typeorm-pagination";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.urlencoded({ extended: true, limit: "25mb" }));
app.use(express.json({ limit: "25mb" }));
app.use(cors());
app.use(compression());
app.use(RequestLogger);
app.use(pagination);
app.use(router);
app.use(handleErrors);

createConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server 🚀 Started On Port ${PORT}`);
  });
});
