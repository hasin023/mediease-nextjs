import DoctorAvailabilityForm from "@/components/admin/doctor-availability";

const AddDoctorAvailability = ({ params }: any) => {
	const { doctorId } = params;

	return <DoctorAvailabilityForm doctorId={doctorId} />;
};

export default AddDoctorAvailability;
