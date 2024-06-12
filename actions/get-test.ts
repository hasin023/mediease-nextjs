"use server"

import { getTestById } from "@/data/test"

export const getTestAction = async (testId: string) => {
  try {
    const test = await getTestById(testId)
    return { success: true, test }
  } catch (error) {
    console.error("Error fetching test:", error)
    return { success: false, error: "Failed to fetch test" }
  }
}
