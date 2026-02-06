'use server';

import { prisma } from "@/lib/prisma";

export async function trackVisit() {
    try {
        await prisma.visit.create({
            data: {},
        });
    } catch (error) {
        console.error("Failed to track visit:", error);
    }
}
