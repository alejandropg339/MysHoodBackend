import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";

import userRoutes from './routes/users.routes';

export class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
      users: "/api/users",
    };

    constructor() {
      this.app = express();
      this.port = process.env.PORT || "8000";
    //   this.dbConncection();
      this.middlewares();
      this.routes();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(morgan("dev"));
      }

      routes(){
        this.app.use(this.apiPaths.users, userRoutes);
      }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}