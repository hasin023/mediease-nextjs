import { auth } from "@/auth"
import ScheduleAppointmentForm from "@/components/patient/schedule-appointment-form"
import { getAllDoctors } from "@/data/doctor"
import { getPatientByUserId } from "@/data/patient"

const ScheduleAppointment = async () => {
  const doctors = await getAllDoctors()

  const session = await auth()
  const patient = await getPatientByUserId(session?.user.id)

  return (
    <div className='px-12 py-10'>
      <div>
        <h4 className='text-2xl font-semibold text-navy-700 dark:text-white'>
          Schedule an Appointment
        </h4>
        <p className='text-base text-gray-600'>
          Fill the form below to schedule an appointment with a doctor of your
          choice &rarr;
        </p>
      </div>
      <div className='mt-6'>
        <ScheduleAppointmentForm doctors={doctors} patient={patient} />
      </div>
    </div>
  )
}

export default ScheduleAppointment
