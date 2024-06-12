"use server"

import { getPrescriptionAction } from "@/actions/get-prescription"
import PrescriptionDetails from "@/components/doctor/prescription-details"
import { getPrescribedMedicinesWithNames } from "@/data/medicine"
import { getPatientById } from "@/data/patient"
import { getPrescribedTestsWithNames } from "@/data/test"

const PrescriptionPage = async ({ params }: any) => {
  const { prescriptionId } = params
  const { success, prescription, error } = await getPrescriptionAction(
    prescriptionId
  )

  const prescribedMedicines = await getPrescribedMedicinesWithNames(
    prescriptionId
  )

  const prescribedTest = await getPrescribedTestsWithNames(prescriptionId)

  const patient = await getPatientById(prescription?.appointment.patientId)

  if (!success) {
    console.error(error)
    return <div>Error fetching user data</div>
  }

  if (!prescribedMedicines || !prescribedTest) {
    console.error("Error fetching prescribed medicines or tests")
    return <div>Error fetching prescribed medicines or tests</div>
  }

  if (prescription && patient) {
    prescription.prescribedMedicines = prescribedMedicines
    prescription.prescribedTests = prescribedTest
    prescription.patient = patient
  }

  return (
    <div>
      <PrescriptionDetails prescription={prescription} />
    </div>
  )
}

export default PrescriptionPage
