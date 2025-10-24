import { Response } from "express";
import { TypedRequestBody, TypedRequestParams } from "../utils/request";
import {
    addCategory,
    addExercise,
    findAllCategories,
    getExerciseByName,
    NewExercise,
    searchExercisesByCategory,
} from "./services";

export type NewExerciseRequest = Omit<NewExercise, "id"> & { category: string };

export async function createExercise(
    req: TypedRequestBody<NewExerciseRequest>,
    res: Response
) {
    const newExercise = req.body;
    await addExercise(newExercise);
    res.status(201).send();
}
export async function getExercise(
    req: TypedRequestParams<{ name: string }>,
    res: Response<NewExercise>
) {
    const exerciseName = req.params.name;

    const exercise = await getExerciseByName(exerciseName);

    res.status(200).json(exercise);
}
export async function createCategory(
    req: TypedRequestBody<{ category: string }>,
    res: Response
) {
    const category = req.body.category.toLowerCase();
    await addCategory(category);
    res.status(201).send();
}
export async function getExercisesByCategory(
    req: TypedRequestParams<{ category: string }>,
    res: Response
) {
    const categoryName = req.params.category.toLowerCase();
    const result = await searchExercisesByCategory(categoryName);
    res.status(200).json(result);
}
export async function getAllcategories(req: TypedRequestBody, res: Response) {
    const result = await findAllCategories();
    res.status(200).json(result);
}
