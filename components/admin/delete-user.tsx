"use client"

import { useState } from "react"
import { deleteUserAction } from "@/actions/delete-user"
import { toast } from "sonner"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

interface DeleteUserProps {
  userId: string
  children: React.ReactNode
}

const DeleteUser = ({ userId, children }: DeleteUserProps) => {
  const router = useRouter()

  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDeleteUser = async () => {
    setIsDeleting(true)
    setError(null)

    const { success, error: deleteError } = await deleteUserAction(userId)

    if (success) {
      toast("User successfully deleted ✅", {
        description: "User have been removed from the database",
        action: {
          label: "Reload",
          onClick: () => {
            router.refresh()
          },
        },
      })
    } else {
      toast("Failed to delete user ❌", {
        description: "User could not be found in database",
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
      onClick={handleDeleteUser}
      disabled={isDeleting}
    >
      {isDeleting ? <AiOutlineLoading3Quarters /> : children}
    </Button>
  )
}

export default DeleteUser
