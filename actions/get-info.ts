"use server"

import { getFacultyInfo, getStaffInfo, getStudentInfo } from "@/data/patient"

export const getInfoAction = async (patientId: any, type: any) => {
  try {
    let info = null

    if (type === "STUDENT") {
      const student = await getStudentInfo(patientId)

      if (!student) {
        return { success: false, error: "Student not found" }
      }

      info = student
    } else if (type === "FACULTY") {
      const faculty = await getFacultyInfo(patientId)

      if (!faculty) {
        return { success: false, error: "Faculty not found" }
      }

      info = faculty
    } else if (type === "STAFF") {
      const staff = await getStaffInfo(patientId)

      if (!staff) {
        return { success: false, error: "Staff not found" }
      }

      info = staff
    }

    return { success: true, info }
  } catch (error) {
    console.error("Error fetching information:", error)
    return { success: false, error: "Failed to fetch information" }
  }
}
