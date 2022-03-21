import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";

import userRoutes from './routes/users.routes';
import authRoutes from './routes/auth.routes';
import { dbConnection } from "./database";

export class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
      users: "/api/users",
      auth: '/api/auth/'
    };

    constructor() {
      this.app = express();
      this.port = process.env.PORT || "8000";
      this.conncectionDB();
      this.middlewares();
      this.routes();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(morgan("dev"));
      }

      async conncectionDB() {
        await dbConnection();
      }

      routes(){
        this.app.use(this.apiPaths.users, userRoutes);
        this.app.use(this.apiPaths.auth, authRoutes);
      }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}