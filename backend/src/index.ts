import app from "./app";
import { db } from "./database/db";
import {
    categoriesTable,
    exerciseCategoriesTable,
    exercisesTable,
} from "./database/schema";

export async function seed() {
    console.log("🌱 Starting seed...");

    // --- Insert categories ---
    const categories = [
        { name: "Strength" },
        { name: "Cardio" },
        { name: "Flexibility" },
        { name: "Balance" },
    ];

    await db.insert(categoriesTable).values(categories);
    console.log("✅ Inserted categories");

    // --- Insert exercises ---
    const exercises = [
        {
            name: "Push-up",
            description:
                "A bodyweight exercise that strengthens the chest, shoulders, and triceps.",
        },
        {
            name: "Squat",
            description: "A compound exercise that targets legs and glutes.",
        },
        {
            name: "Jump Rope",
            description:
                "A cardio exercise that improves endurance and coordination.",
        },
        {
            name: "Plank",
            description:
                "An isometric core exercise that improves stability and posture.",
        },
    ];

    await db.insert(exercisesTable).values(exercises);
    console.log("✅ Inserted exercises");

    // --- Link exercises to categories ---
    const dbCategories = await db.select().from(categoriesTable);
    const dbExercises = await db.select().from(exercisesTable);

    const getCategoryId = (name: string) =>
        dbCategories.find((c) => c.name === name)?.id;
    const getExerciseId = (name: string) =>
        dbExercises.find((e) => e.name === name)?.id;

    const exerciseCategories = [
        {
            exerciseId: getExerciseId("Push-up")!,
            categoryId: getCategoryId("Strength")!,
        },
        {
            exerciseId: getExerciseId("Squat")!,
            categoryId: getCategoryId("Strength")!,
        },
        {
            exerciseId: getExerciseId("Jump Rope")!,
            categoryId: getCategoryId("Cardio")!,
        },
        {
            exerciseId: getExerciseId("Plank")!,
            categoryId: getCategoryId("Balance")!,
        },
        {
            exerciseId: getExerciseId("Plank")!,
            categoryId: getCategoryId("Flexibility")!,
        },
    ];

    await db.insert(exerciseCategoriesTable).values(exerciseCategories);
    console.log("✅ Linked exercises to categories");

    console.log("🎉 Seed completed successfully!");
}

app.listen(3000, async () => {
    console.log("App listeing at port: ", 3000);
});
