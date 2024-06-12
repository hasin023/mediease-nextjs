import RequestForm from "@/components/patient/request-form";
import { getAppointmentById } from "@/data/appointment";
import { getReimburstmentByAppointmentId } from "@/data/reimburstment";

const GetReimbursementPage = async ({ params }: any) => {
	const { appointmentId } = params;

	const appointment = await getAppointmentById(appointmentId);
	const reimburstment = await getReimburstmentByAppointmentId(appointmentId);

	return (
		<RequestForm appointment={appointment} reimburstment={reimburstment} />
	);
};

export default GetReimbursementPage;
