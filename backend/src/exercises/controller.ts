import { Response } from "express";
import { TypedRequestBody, TypedRequestParams } from "../utils/request";
import {
    addCategory,
    addExercise,
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

    res.status(200).send(exercise);
}
export async function createCategory(
    req: TypedRequestBody<{ category: string }>,
    res: Response
) {
    const category = req.body.category;
    await addCategory(category);
    res.status(201).send();
}
export async function getExercisesByCategory(
    req: TypedRequestParams<{ category: string }>,
    res: Response
) {
    const categoryName = req.params.category;
    const result = await searchExercisesByCategory(categoryName);
    console.log(result);
    res.status(200).json(result);
}
