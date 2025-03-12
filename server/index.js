import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import sequelize from "./db.js";
import errorHandler from "./middleware/errorHandlingMiddleware.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", router);
app.use(errorHandler);

const start = async () => {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(process.env.PORT, () => {
        console.log(`Server started on port ${process.env.PORT}`);
    });
}

start();