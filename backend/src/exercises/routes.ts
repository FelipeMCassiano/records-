import { Router } from "express";
import {
    createCategory,
    createExercise,
    getExercise,
    getExercisesByCategory,
} from "./controller";

const exercisesRouter: Router = Router();
exercisesRouter.get("/:name", getExercise);
exercisesRouter.post("/", createExercise);
exercisesRouter.post("/category", createCategory);
exercisesRouter.get("/category/:category", getExercisesByCategory);
export default exercisesRouter;
