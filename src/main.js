import express from "express";
import cors from "cors";
import { db, bootstrapDB } from "./DB/connections.js";
import { globalErrorHandling } from "./middleware/error.middleware.js";
import { productsModule, salesModule, suppliersModule, usersModule } from "./modules/index.js";
const app = express();
const port = 3000;

bootstrapDB(app, port);

app.use(cors(), express.json());

app.use("/suppliers", suppliersModule)
app.use("/products", productsModule)
app.use("/sales", salesModule)
app.use("/users", usersModule)

app.use('{/*dummy}', (req, res) => res.status(404).send({ message: "Invalid app router" }))

app.use(globalErrorHandling)