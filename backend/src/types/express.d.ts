import * as express from "express";
declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        email: string;
      };
      room?: {
        hostId: string;
        userId: string;
        role: "host" | "guest";
      };
    }
  }
}