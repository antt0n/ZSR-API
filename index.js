import express from "express"
import router from "./routes/routes.js";
import badContentError from "./src/Http/Response/bad-content-error.js"
import storageInit from "./storage/storage-init.js"
import { dataSender } from "./src/Service/Device/Communication/data-sender.js"
import path from "path"
global.__dirname = path.resolve();

const app = express();

storageInit()

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

if (dataSender) {
  router(app)
} else {
  app.all('*', (req, res) => {
    res.status(500).send({ error: "device error" });
  })
}
