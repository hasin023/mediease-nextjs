import { ServiceCard } from "./service-card"

const services = [
  {
    title: "Doctor Availability",
    description: "Find out which doctors are available.",
    buttonText: "Check Availability",
    href: "/patient/doctors",
    from: "from-gray-200 from-20%",
    to: "to-cyan-300",
  },
  {
    title: "Book an Appointment",
    description: "Book an appointment with a doctor",
    buttonText: "Book Now",
    href: "/patient/appointment",
    from: "from-gray-200 from-20%",
    to: "to-lime-300",
  },
  {
    title: "View Medical Records",
    description: "View your medical records from your doctor",
    buttonText: "Medical Records",
    href: "/patient/records",
    from: "from-gray-200 from-20%",
    to: "to-rose-300",
  },
  {
    title: "Get Reimbursement",
    description: "Get reimbursed for your medical expenses",
    buttonText: "Reimbursement",
    href: "/patient/reimbursement",
    from: "from-gray-200 from-20%",
    to: "to-violet-300",
  },
]

const ServiceSection = () => {
  return (
    <section className='pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[80px]'>
      <div className='container mx-auto'>
        <div className='-mx-4 flex flex-wrap'>
          <div className='w-full px-4'>
            <div className='mx-auto mb-12 max-w-[510px] text-center lg:mb-20'>
              <span className='mb-2 block text-lg font-semibold text-primary'>
                Our Services
              </span>
              <h2 className='mb-3 text-3xl font-bold leading-[1.2] text-lime-700 dark:text-white sm:text-4xl md:text-[40px]'>
                What We Offer
              </h2>
              <p className='text-base text-body-color dark:text-dark-6'>
                We offer a wide range of services to help you with your health
                needs. Our services are designed to help you get the care you
                need when you need it.
              </p>
            </div>
          </div>
        </div>

        <div className='flex gap-5 flex-wrap justify-center'>
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              buttonText={service.buttonText}
              href={service.href}
              from={service.from}
              to={service.to}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServiceSection
