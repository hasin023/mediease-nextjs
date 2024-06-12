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

const DoctorCard = ({ doctor }: any) => {
  return (
    <Card className='mt-6 shadow-xl border-2'>
      <CardHeader>
        <CardTitle>{doctor.user.name}</CardTitle>
        <CardDescription>
          {doctor.user.email} <br /> {doctor.specialization}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-3'>
          {doctor.DoctorAvailability.map((availability: any) => (
            <div key={availability.id} className='flex items-center'>
              <div>
                <div className='flex gap-2 items-center'>
                  <FaCalendarWeek />
                  <p className='font-semibold'>{availability.weekday}</p>
                </div>
                <div className='flex gap-2 items-center'>
                  <FaClock />
                  <p className='text-sm text-blue-600'>
                    {new Date(availability.startTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {new Date(availability.endTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className='gap-3'>
        <Link href='/patient/appointment'>
          <Button
            size='sm'
            variant='outline'
            className='hover:bg-gray-800 hover:text-white'
          >
            Book Appointment &rarr;
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default DoctorCard
