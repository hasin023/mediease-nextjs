"use server"

import { getTestAction } from "@/actions/get-test"
import { EditTestPage } from "@/components/admin/edit-test"

interface EditTestProps {
  params: {
    testId: string
  }
}

const EditUserPage = async ({ params }: EditTestProps) => {
  const { testId } = params
  const { success, test, error } = await getTestAction(testId)

  if (!success) {
    console.error(error)
    return <div>Error fetching user data</div>
  }

  return (
    <div>
      <EditTestPage testData={test} />
    </div>
  )
}

export default EditUserPage
