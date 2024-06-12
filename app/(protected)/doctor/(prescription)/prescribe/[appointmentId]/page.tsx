"use server"

import { getAppointmentAction } from "@/actions/getAppointmentAction"
import PrescribeForm from "@/components/doctor/prescribe-form"
import { getAllMedicines } from "@/data/medicine"
import { getAllTests } from "@/data/test"

const PrescribePage = async ({ params }: any) => {
  const { appointmentId } = params
  const { success, appointment, error } = await getAppointmentAction(
    appointmentId
  )

  const medicinesList = await getAllMedicines()
  const testsList = await getAllTests()

  if (!success) {
    console.error(error)
    return <div>Error fetching user data</div>
  }

  return (
    <div>
      <PrescribeForm
        appointment={appointment}
        medicinesList={medicinesList}
        testsList={testsList}
      />
    </div>
  )
}

export default PrescribePage
