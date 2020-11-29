import express from "express"
import router from "./routes/routes.js";

const app = express();

router(app)

app.listen(3000, () => {
    console.log("Server started !")
})