import express from "express";
import cors from "cors";
// import router from "./routes/index.js";
import sequelize from"./db.js";
// import errorHandler from "./middleware/authMiddleware.js"
import * as models from "./models/models.js";

const app = express();


app.use(express.json());
app.use(cors());
// app.use("/api", router);
// app.use(errorHandler);

const start = async () => {
    await sequelize.authenticate();
    await sequelize.sync({force: true});
    app.listen(process.env.PORT, () => {
        console.log(`Server started on port ${process.env.PORT}`);
    });
}

start();

app.post('/favorites', async (req, res) => {
    const {userId, propertyId} = req.body;

    try {
        const favorite = await models.Favorite.create({user_id: userId, property_id: propertyId});
        res.status(200).json(favorite);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})