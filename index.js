import express from "express"
import router from "./routes/routes.js";
import badContentError from "./src/Http/Response/bad-content-error.js"

const app = express();

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(function (error, req, res, next) {
  if (error instanceof SyntaxError) {
    badContentError(res)
  } else {
    next();
  }
});

app.listen(3000, () => {
    console.log("Server started !")
})

router(app)