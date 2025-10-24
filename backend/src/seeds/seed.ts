import "dotenv/config";
import { db } from "../database/db";
import {
    categoriesTable,
    exerciseCategoriesTable,
    exercisesTable,
} from "../database/schema";

// 🌱 Seed function
export async function seed() {
    console.log("🌱 Starting seed...");

    // --- 1️⃣ Insert Categories ---
    const categories = [
        { name: "Chest" },
        { name: "Back" },
        { name: "Legs" },
        { name: "Shoulders" },
        { name: "Arms" },
        { name: "Core" },
        { name: "Full Body" },
        { name: "Flexibility" },
    ];
    for (let i = 0; i < categories.length; i++) {
        categories[i] = { name: categories[i].name.toLowerCase() };
    }

    await db.insert(categoriesTable).values(categories);
    console.log("✅ Inserted categories");

    // --- 2️⃣ Insert Exercises ---
    const exercises = [
        {
            name: "Bench Press",
            description:
                "Compound chest exercise targeting pectorals, shoulders, and triceps.",
        },
        {
            name: "Pull-Up",
            description:
                "Bodyweight exercise primarily working the lats and biceps.",
        },
        {
            name: "Squat",
            description:
                "Lower body exercise focusing on quads, hamstrings, and glutes.",
        },
        {
            name: "Shoulder Press",
            description: "Overhead movement developing deltoids and triceps.",
        },
        {
            name: "Bicep Curl",
            description: "Isolation exercise for the biceps.",
        },
        {
            name: "Plank",
            description:
                "Core stability exercise improving abdominal and lower back strength.",
        },

        {
            name: "Hamstring Stretch".toLowerCase(),
            description: "Flexibility exercise for the posterior leg muscles.",
        },
    ];

    await db.insert(exercisesTable).values(exercises);
    console.log("✅ Inserted exercises");

    // --- 3️⃣ Link Exercises ↔ Categories ---
    const dbCategories = await db.select().from(categoriesTable);
    const dbExercises = await db.select().from(exercisesTable);

    const getCategoryId = (name: string) =>
        dbCategories.find((c) => c.name.toLowerCase() === name.toLowerCase())
            ?.id;
    const getExerciseId = (name: string) =>
        dbExercises.find((e) => e.name.toLowerCase() === name.toLowerCase())
            ?.id;

    const exerciseCategoryLinks = [
        { exercise: "Bench Press", category: "Chest" },
        { exercise: "Pull-Up", category: "Back" },
        { exercise: "Squat", category: "Legs" },
        { exercise: "Shoulder Press", category: "Shoulders" },
        { exercise: "Bicep Curl", category: "Arms" },
        { exercise: "Plank", category: "Core" },
        { exercise: "Hamstring Stretch", category: "Flexibility" },
    ];

    for (const link of exerciseCategoryLinks) {
        const exerciseId = getExerciseId(link.exercise);
        const categoryId = getCategoryId(link.category);

        if (exerciseId && categoryId) {
            await db.insert(exerciseCategoriesTable).values({
                exerciseId,
                categoryId,
            });
        }
    }

    console.log("✅ Linked exercises to categories");

    console.log("🎉 Seed completed successfully!");
}

// Run directly with `pnpm ts-node seeds/seed.ts`
seed()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error("❌ Seed failed:", err);
        process.exit(1);
    });
