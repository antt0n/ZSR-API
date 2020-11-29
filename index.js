import express from "express"
import router from "./routes/routes.js";

const app = express();

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.listen(3000, () => {
    console.log("Server started !")
})

router(app)