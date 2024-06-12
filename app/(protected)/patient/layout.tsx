import { auth, signOut } from "@/auth"
import Navbar from "@/components/common/common-navbar"
import { PatientNavbar } from "@/components/patient/patient-navbar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { redirect } from "next/navigation"
import { IoMdChatbubbles } from "react-icons/io"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const PatientLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()

  if (!session) {
    redirect("/auth/login")
  }

  if (session?.user.role !== "PATIENT") {
    return (
      <div className='min-h-screen flex flex-grow items-center justify-center bg-gray-100'>
        <div className='rounded-lg bg-white p-8 text-center shadow-2xl'>
          <h1 className='mb-4 text-4xl font-bold'>401</h1>
          <p className='text-gray-600'>Not Authorized as Patient</p>
          <div className='flex flex-col gap-1'>
            <form
              className='mt-4'
              action={async () => {
                "use server"

                await signOut()
              }}
            >
              <Button type='submit' variant='default'>
                Sign Out
              </Button>
            </form>
            <Button type='submit' variant='link'>
              <Link href='/profile'>Go back</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <PatientNavbar />
      <div className=''>
        {children}
        <section className='fixed bottom-0 right-0 p-4'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='default'
                  size='icon'
                  className='hover:text-white'
                >
                  <Link href='/patient/chat'>
                    <IoMdChatbubbles size={20} />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ask your queries to our AI chatbot.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </section>
      </div>
    </>
  )
}

export default PatientLayout
