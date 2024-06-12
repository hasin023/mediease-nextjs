import { Card, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "../ui/button"

const PrescriptionCard = ({ prescription }: any) => {

  return (
    <Card className='shadow-md mb-2'>
      <div className='px-3 py-2 space-y-2'>
        <CardTitle className='font-semibold'>
          Prescription Id : {prescription.id}
        </CardTitle>
        <div className='text-sm text-gray-700'>
          <p> Diagnosis : {prescription.diagnosis}</p>
          <p>
            {" "}
            Appointment Date :{" "}
            {new Date(prescription.appointment.time).toLocaleDateString(
              "en-US",
              {
                weekday: "short",
                day: "2-digit",
                month: "short",
                year: "numeric",
              }
            )}
          </p>
        </div>
      </div>
      <Button size='sm' variant='link'>
        <Link href={`/patient/prescription/${prescription.id}`}>
          View Prescription &rarr;
        </Link>
      </Button>
    </Card>
  )
}

export default PrescriptionCard
