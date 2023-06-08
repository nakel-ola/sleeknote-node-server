import cors from "cors";
import express from "express";
import path from "path";
import api from "./api";

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(cors());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", {
    baseUrl: "https://sleeknote-node-server.vercel.app/api/",
    routes: [
      {
        name: "Register",
        target: "content-register",
        method: "POST",
        url: "https://sleeknote-node-server.vercel.app/api/auth/register",
        label: "Use this endpoint to register",
        description: "To register you need to make a POST call to the following url:",
        query: [
          {
            field: "Name",
            type: "String",
            description: "(Required) Value must not be less then 5",
          },
          {
            field: "Email",
            type: "String",
            description: "(Required) Value must be a valid email address",
          },
          {
            field: "Password",
            type: "String",
            description: "(Required) Value must not be less then 8",
          },
        ],
        response: `
Result example:
  {
    access_token : "json web token string ....."
  }
        `,
        request: `
await fetch("https://sleeknote-node-server.vercel.app/api/auth/register", {
  method: "POST",
  body: JSON.stringify({
    name: "user name",
    email: "unique email",
    password: "user password",
  })
})
        `
      },
      {
        name: "Login",
        target: "content-login",
        method: "POST",
        url: "https://sleeknote-node-server.vercel.app/api/auth/login",
        label: "Use this endpoint to login",
        description: "To login you need to make a POST call to the following url:",
        query: [
          {
            field: "Name",
            type: "String",
            description: "(Required) Value must not be less then 5",
          },
          {
            field: "Email",
            type: "String",
            description: "(Required) Value must be a valid email address",
          },
          {
            field: "Password",
            type: "String",
            description: "(Required) Value must not be less then 8",
          },
        ],
        response: `
Result example:
  {
    access_token : "json web token string ....."
  }
        `,
        request: `
await fetch("https://sleeknote-node-server.vercel.app/api/auth/login", {
  method: "POST",
  body: JSON.stringify({
    email: "unique email",
    password: "user password",
  })
})
        `
      },
    ],
  });
});

app.use("/api", api);

export default app;
