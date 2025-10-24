import { Router } from "express";
import {
    createCategory,
    createExercise,
    getAllcategories,
    getExercise,
    getExercisesByCategory,
} from "./controller";

const exercisesRouter: Router = Router();

exercisesRouter.get("/categories", getAllcategories);
exercisesRouter.get("/categories/:category", getExercisesByCategory);
exercisesRouter.get("/:name", getExercise);
exercisesRouter.post("/", createExercise);
exercisesRouter.post("/categories", createCategory);
export default exercisesRouter;
