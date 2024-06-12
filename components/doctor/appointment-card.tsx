import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { Button } from "../ui/button"

import { FaCalendarWeek } from "react-icons/fa"
import { FaClock } from "react-icons/fa6"
import { getUserById } from "@/data/user"

const AppointmentCard: React.FC<{ appointment: any }> = async ({
  appointment,
}) => {
  const user = await getUserById(appointment.patient.userId)

  const prescriptionId = appointment.Prescription[0]?.id

  const appointmentDate = new Date(appointment.time)
  const options = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }
  const appointmentDateString = appointmentDate.toLocaleDateString(
    "en-US",
    options
  )
  const appointmentTimeString = appointmentDate.toLocaleTimeString()

  return (
    <Card className='mb-4 shadow-xl w-[83.5rem]'>
      <CardHeader>
        <CardTitle>{user?.name}</CardTitle>
        <CardDescription>
          {appointment.reason} <br /> {appointment.patient.bloodGroup} <br />{" "}
          {appointment.patient.gender}
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-3'>
        <div className='text-sm mb-3'>
          <div className='flex gap-2 items-center'>
            <FaCalendarWeek className='text-gray-500' />
            <p>{appointmentDateString}</p>
          </div>
          <div className='flex gap-2 items-center'>
            <FaClock className='text-gray-500' />
            <p>{appointmentTimeString}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex gap-5 items-center'>
        <p className='text-sm text-gray-600'>
          Status : {` `}
          <span
            className={`${
              appointment.status === "PENDING"
                ? "text-red-500"
                : "text-green-500"
            } font-semibold`}
          >
            {appointment.status}
          </span>
        </p>
        {appointment.status === "PENDING" ? (
          <Link href={`/doctor/prescribe/${appointment.id}`}>
            <Button
              size='sm'
              variant='outline'
              className='hover:text-white text-lime-800 hover:bg-lime-700'
            >
              Add Prescription &rarr;
            </Button>
          </Link>
        ) : (
          <Link href={`/doctor/prescription/${prescriptionId}`}>
            <Button
              size='sm'
              variant='secondary'
              className='hover:text-white hover:bg-gray-800'
            >
              View Prescription &rarr;
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}

export default AppointmentCard
