"use server"

import { db } from "@/lib/db"

export const deleteTestAction = async (testId: string) => {
  try {
    await db.test.delete({
      where: {
        id: testId,
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Error deleting test:", error)
    return { success: false, error: "Failed to delete test" }
  }
}
