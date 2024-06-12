"use server"

import { db } from "@/lib/db"

export const deleteUserAction = async (userId: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        patient: {
          include: {
            studentInfo: true,
            facultyInfo: true,
            staffInfo: true,
          },
        },
        doctor: true,
      },
    })

    if (!user) {
      return { success: false, error: "User not found" }
    }

    // Delete patientInfo based on patientType
    if (user.patient) {
      switch (user.patientType) {
        case "STUDENT":
          await db.studentInfo.delete({
            where: { id: user.patient.studentInfo.id },
          })
          break
        case "FACULTY":
          await db.facultyInfo.delete({
            where: { id: user.patient.facultyInfo.id },
          })
          break
        case "STAFF":
          await db.staffInfo.delete({
            where: { id: user.patient.staffInfo.id },
          })
          break
        default:
          break
      }

      // Delete the patient record
      await db.patient.delete({
        where: { id: user.patient.id },
      })
    }

    if (user.doctor) {
      if (user.role === "DOCTOR") {
        await db.doctor.delete({
          where: { id: user.doctor.id },
        })
      }
    }

    // Delete the user record
    await db.user.delete({
      where: { id: userId },
    })

    return { success: true }
  } catch (error) {
    console.error("Error deleting user:", error)
    return { success: false, error: "Failed to delete user" }
  }
}
