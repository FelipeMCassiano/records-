import express, { Express } from "express";
import { db } from "./database/db";
import { usersTable } from "./database/schema";
import exercisesRouter from "./exercises/routes";

const app: Express = express();
app.use(express.json());

app.use("/exercises", exercisesRouter);
app.post("/users", async (req, res) => {
    await db.insert(usersTable).values({
        email: "felipe2@gmail.com",
        password: "12345",
    });
    const users = await db.select().from(usersTable);
    res.status(201).send(users);
});

export default app;
