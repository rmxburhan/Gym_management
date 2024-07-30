import cors from "cors";
import express, { Express } from "express";
import morgan from "morgan";
import path from "path";

export default (app: Express) => {
  app.use(express.static("public"));
  app.use(cors({ credentials: true }));
  app.use(express.static(path.join(process.cwd(), "/public")));

  app.use(morgan("combined"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
};
