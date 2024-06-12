"use server"

import { getAppointmentById } from "@/data/appointment"

export const getAppointmentAction = async (appointmentId: string) => {
  try {
    const appointment = await getAppointmentById(appointmentId)
    return { success: true, appointment }
  } catch (error) {
    console.error("Error fetching Appointment:", error)
    return { success: false, error: "Failed to fetch Appointment" }
  }
}
