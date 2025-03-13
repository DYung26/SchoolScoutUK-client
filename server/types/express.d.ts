import * as express from "express";

interface RequestUserData {
  userId: string;
  username: string;
  isAdmin: boolean;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: RequestUserData,
  }
}

