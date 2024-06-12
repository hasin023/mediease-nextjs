"use server"

import { getPatientByUserId } from "@/data/patient"

export const getPatientAction = async (userId: string) => {
  try {
    const patient = await getPatientByUserId(userId)
    return { success: true, patient }
  } catch (error) {
    console.error("Error fetching patient:", error)
    return { success: false, error: "Failed to fetch patient" }
  }
}
