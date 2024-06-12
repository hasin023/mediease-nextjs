"use server"

import { MedicineSchema } from "@/schemas"
import * as z from "zod"
import { db } from "@/lib/db"
import { getMedicineById } from "@/data/medicine"

export const updateMedicine = async (
  id: string,
  values: z.infer<typeof MedicineSchema>
) => {
  const validatedFields = MedicineSchema.safeParse(values)

  if (!validatedFields.success) {
    return { Error: "Invalid fields" }
  }

  const { medicineName, manufacturer, description } = validatedFields.data

  try {
    const existingMedicine = await getMedicineById(id)

    if (!existingMedicine) {
      return { Error: "Medicine not found" }
    }

    await db.medicine.update({
      where: { id },
      data: {
        medicineName,
        manufacturer,
        description,
      },
    })

    return { Success: "Medicine updated successfully" }
  } catch (error) {
    console.error("Error updating Medicine:", error)
    return { Error: "Failed to update Medicine" }
  }
}
