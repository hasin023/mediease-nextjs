"use client"

import { useRouter } from "next/navigation"

interface LoginButtonProps {
  children: React.ReactNode
  mode?: "modal" | "redirect"
  asChild?: boolean
}

const LoginButton = ({ children, mode, asChild }: LoginButtonProps) => {
  const router = useRouter()

  const onClick = () => {
    if (mode === "modal") {
      console.log("Opening modal")
    } else {
      console.log("Redirecting to login page")
      router.push("/auth/login")
    }
  }

  return (
    <span onClick={onClick} className='cursor-pointer'>
      {children}
    </span>
  )
}

export default LoginButton
