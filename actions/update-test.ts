"use server"

import { TestSchema } from "@/schemas"
import * as z from "zod"
import { db } from "@/lib/db"
import { getTestById } from "@/data/test"

export const updateTest = async (
  id: string,
  values: z.infer<typeof TestSchema>
) => {
  const validatedFields = TestSchema.safeParse(values)

  if (!validatedFields.success) {
    return { Error: "Invalid fields" }
  }

  const { testName, details } = validatedFields.data

  try {
    const existingTest = await getTestById(id)

    if (!existingTest) {
      return { Error: "Test not found" }
    }

    await db.test.update({
      where: { id },
      data: {
        testName,
        details,
      },
    })

    return { Success: "Test updated successfully" }
  } catch (error) {
    console.error("Error updating Test:", error)
    return { Error: "Failed to update Test" }
  }
}
