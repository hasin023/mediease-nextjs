"use client"

import { useState } from "react"
import { toast } from "sonner"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { deleteTestAction } from "@/actions/delete-test"

interface DeleteTestProps {
  testId: string
  children: React.ReactNode
}

const DeleteTest = ({ testId, children }: DeleteTestProps) => {
  const router = useRouter()

  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDeleteTest = async () => {
    setIsDeleting(true)
    setError(null)

    const { success, error: deleteError } = await deleteTestAction(testId)

    if (success) {
      toast("Test successfully deleted ✅", {
        description: "Test have been removed from the database",
        action: {
          label: "Reload",
          onClick: () => {
            router.refresh()
          },
        },
      })
    } else {
      toast("Failed to delete test ❌", {
        description: "Test could not be found in database",
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
      onClick={handleDeleteTest}
      disabled={isDeleting}
    >
      {isDeleting ? <AiOutlineLoading3Quarters /> : children}
    </Button>
  )
}

export default DeleteTest
