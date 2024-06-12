import { db } from "@/lib/db"

export const getPrescriptionByAppointmentId = async (appointmentId: string) => {
  try {
    const prescription = await db.prescription.findFirst({
      where: {
        appointmentId,
      },
    })

    return prescription
  } catch {
    return null
  }
}

export const getPrescriptionById = async (prescriptionId: string) => {
  try {
    const prescription = await db.prescription.findUnique({
      where: {
        id: prescriptionId,
      },
      include: {
        appointment: true,
        prescribedMedicines: true,
        prescribedTests: true,
      },
    })

    return prescription
  } catch {
    return null
  }
}

export const getPatientSpecificPrescriptions = async (patientId: any) => {
  try {
    const prescriptions = await db.prescription.findMany({
      where: {
        appointment: {
          patientId,
        },
      },
      include: {
        appointment: true,
        prescribedMedicines: true,
        prescribedTests: true,
      },
    })

    return prescriptions
  } catch {
    return null
  }
}
