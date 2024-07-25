import cors from "cors";
import express, { Express } from "express";
import morgan from "morgan";

export default (app: Express) => {
  app.use(express.static("public"));
  app.use(cors({ credentials: true }));

  app.use(morgan("combined"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
};
