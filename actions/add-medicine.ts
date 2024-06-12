"use server"

import { getMedicineByName } from "@/data/medicine"
import { db } from "@/lib/db"
import { MedicineSchema } from "@/schemas"
import * as z from "zod"

export const addMedicine = async (values: z.infer<typeof MedicineSchema>) => {
  const validatedFields = MedicineSchema.safeParse(values)

  if (!validatedFields.success) {
    return { Error: "Invalid fields" }
  }

  const { medicineName, manufacturer, description } = validatedFields.data

  const existingMedicine = await getMedicineByName(medicineName)

  if (existingMedicine) {
    return { Error: "Medicine with this name already exists" }
  }

  await db.medicine.create({
    data: {
      medicineName,
      manufacturer,
      description,
    },
  })

  return { Success: "Medicine successfully added" }
}
