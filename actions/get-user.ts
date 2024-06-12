"use server"

import { getUserById } from "@/data/user"

export const getUserAction = async (userId: string) => {
  try {
    const user = await getUserById(userId)
    return { success: true, user }
  } catch (error) {
    console.error("Error fetching user:", error)
    return { success: false, error: "Failed to fetch user" }
  }
}
