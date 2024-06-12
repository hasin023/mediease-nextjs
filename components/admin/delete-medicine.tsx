"use client"

import { useState } from "react"
import { toast } from "sonner"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { deleteMedicineAction } from "@/actions/delete-medicine"

interface DeleteMedicineProps {
  medId: string
  children: React.ReactNode
}

const DeleteMedicine = ({ medId, children }: DeleteMedicineProps) => {
  const router = useRouter()

  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDeleteMedicine = async () => {
    setIsDeleting(true)
    setError(null)

    const { success, error: deleteError } = await deleteMedicineAction(medId)

    if (success) {
      toast("Medicine successfully deleted ✅", {
        description: "Medicine have been removed from the database",
        action: {
          label: "Reload",
          onClick: () => {
            router.refresh()
          },
        },
      })
    } else {
      toast("Failed to delete medicine ❌", {
        description: "Medicine could not be found in database",
        action: {
          label: "Reload",
          onClick: () => {
            router.refresh()
          },
        },
      })
    }

    setIsDeleting(false)
  }

  return (
    <Button
      size='sm'
      variant='outline'
      className='cursor-pointer hover:text-gray-50 hover:bg-gray-800 shadow-md'
      onClick={handleDeleteMedicine}
      disabled={isDeleting}
    >
      {isDeleting ? <AiOutlineLoading3Quarters /> : children}
    </Button>
  )
}

export default DeleteMedicine
