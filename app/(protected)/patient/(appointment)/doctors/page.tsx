import DoctorCard from "@/components/patient/doctor-card"
import { getAllDoctors } from "@/data/doctor"

const DoctorsPage = async () => {
  const doctors = await getAllDoctors()

  return (
    <div className='px-12 py-10'>
      <div>
        <h4 className='text-2xl font-semibold text-navy-700 dark:text-white'>
          Available Doctors
        </h4>
        <p className='text-base text-gray-600'>
          See all available doctors and their availability below &rarr;
        </p>
      </div>
      {doctors?.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  )
}

export default DoctorsPage
