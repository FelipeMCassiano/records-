import { eq } from "drizzle-orm";
import { db } from "../database/db";
import {
    categoriesTable,
    exerciseCategoriesTable,
    exercisesTable,
} from "../database/schema";
import { NewExerciseRequest } from "./controller";

export type NewExercise = typeof exercisesTable.$inferInsert;
export type Exercise = typeof exercisesTable.$inferSelect;
export type Category = typeof categoriesTable.$inferSelect;

export async function addExercise(request: NewExerciseRequest): Promise<void> {
    const existsExercise = await getExerciseByName(request.name);
    if (existsExercise) {
        console.error("exercise already exists");
        return;
    }

    const category = await getCategoryByName(request.category);
    if (!category) {
        console.error("category does not exists");
        return;
    }

    const exerciseId = (
        await db
            .insert(exercisesTable)
            .values({ ...request })
            .returning({ id: exercisesTable.id })
    )[0].id;

    await db
        .insert(exerciseCategoriesTable)
        .values({ exerciseId: exerciseId, categoryId: category.id });
}
export async function getExerciseByName(
    exerciseName: string
): Promise<Exercise | undefined> {
    return await db.query.exercisesTable.findFirst({
        where: eq(exercisesTable.name, exerciseName),
    });
}

async function getCategoryByName(
    categoryName: string
): Promise<Category | undefined> {
    return db.query.categoriesTable.findFirst({
        where: eq(categoriesTable.name, categoryName),
    });
}
export async function addCategory(category: string) {
    const exists = await getCategoryByName(category);
    if (exists) {
        console.error("category already exists");
        return;
    }
    await db.insert(categoriesTable).values({ name: category });
}
export async function searchExercisesByCategory(categoryName: string) {
    const result = await db.query.categoriesTable.findFirst({
        where: eq(categoriesTable.name, categoryName),
        with: {
            exerciseCategories: {
                with: {
                    exercise: true,
                },
            },
        },
    });
    return result;
}
export async function findAllCategories() {
    return await db.select().from(categoriesTable);
}
