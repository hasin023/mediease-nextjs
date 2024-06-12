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

const PrescriptionCardDetail = ({ prescription }: any) => {
  return (
    <Card className='shadow-md mb-2'>
      <CardHeader>
        <CardTitle>Prescription Id : {prescription.id}</CardTitle>
      </CardHeader>
      <CardContent className='text-sm text-gray-700'>
        <p> Diagnosis : {prescription.diagnosis}</p>
        <p>
          {" "}
          Appointment Date :{" "}
          {new Date(prescription.appointment.time).toLocaleDateString("en-US", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          size='sm'
          variant='outline'
          className='hover:bg-lime-800 hover:text-white'
        >
          <Link href={`/patient/prescription/${prescription.id}`}>
            View Prescription &rarr;
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default PrescriptionCardDetail
