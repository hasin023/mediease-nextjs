"use server"

import { db } from "@/lib/db"

export const deleteMedicineAction = async (medId: string) => {
  try {
    await db.medicine.delete({
      where: {
        id: medId,
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Error deleting medicine:", error)
    return { success: false, error: "Failed to delete medicine" }
  }
}
