"use server"

import { EditUser } from "@/components/admin/edit-user"
import { getUserAction } from "@/actions/get-user"

interface EditUserPageProps {
  params: {
    userId: string
  }
}

const EditUserPage = async ({ params }: EditUserPageProps) => {
  const { userId } = params
  const { success, user, error } = await getUserAction(userId)

  if (!success) {
    console.error(error)
    return <div>Error fetching user data</div>
  }

  return (
    <div>
      <EditUser userData={user} />
    </div>
  )
}

export default EditUserPage
