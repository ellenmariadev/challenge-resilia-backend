import express from "express";
// import cors from "cors";
import routes from "./routes.js";

const app = express();
app.use(routes);
app.listen(5000, () => console.log("Server Up"));
