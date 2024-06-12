"use server"

import { getMedicineById } from "@/data/medicine"

export const getMedicineAction = async (medId: string) => {
  try {
    const medicine = await getMedicineById(medId)
    return { success: true, medicine }
  } catch (error) {
    console.error("Error fetching medicine:", error)
    return { success: false, error: "Failed to fetch medicine" }
  }
}
