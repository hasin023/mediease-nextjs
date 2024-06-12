"use server"

import { getMedicineAction } from "@/actions/get-medicine"
import { EditMedicine } from "@/components/admin/edit-medicine"

interface EditMedicineProps {
  params: {
    medId: string
  }
}

const EditUserPage = async ({ params }: EditMedicineProps) => {
  const { medId } = params
  const { success, medicine, error } = await getMedicineAction(medId)

  if (!success) {
    console.error(error)
    return <div>Error fetching user data</div>
  }

  return (
    <div>
      <EditMedicine medicineData={medicine} />
    </div>
  )
}

export default EditUserPage
