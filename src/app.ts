import cors from "cors";
import express from "express";
import api from "./api";

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

app.use('/', api);

export default app;
