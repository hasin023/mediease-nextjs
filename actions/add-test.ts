"use server"

import { getTestByName } from "@/data/test"
import { db } from "@/lib/db"
import { TestSchema } from "@/schemas"

import * as z from "zod"

export const addTest = async (values: z.infer<typeof TestSchema>) => {
  const validatedFields = TestSchema.safeParse(values)

  if (!validatedFields.success) {
    return { Error: "Invalid fields" }
  }

  const { testName, details } = validatedFields.data

  const existingTest = await getTestByName(testName)

  if (existingTest) {
    return { Error: "Test with this name already exists" }
  }

  await db.test.create({
    data: {
      testName,
      details,
    },
  })

  return { Success: "Test successfully added" }
}
