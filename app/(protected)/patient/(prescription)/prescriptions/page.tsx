import { auth } from "@/auth";
import PrescriptionCardDetail from "@/components/patient/prescription-card-detail";
import { getPatientByUserId } from "@/data/patient";
import { getPatientSpecificPrescriptions } from "@/data/prescription";

const PrescriptionsPage = async () => {
	const session = await auth();

	const patient = await getPatientByUserId(session?.user.id);
	const prescriptions = await getPatientSpecificPrescriptions(patient?.id);

	const sortedPrescriptions = prescriptions?.sort(
		(a, b) =>
			new Date(b.appointment.time).getTime() -
			new Date(a.appointment.time).getTime(),
	);

	return (
		<div className="flex flex-col py-8 px-24 gap-2">
			<div className="mb-4">
				<h4 className="text-2xl font-semibold text-navy-700 dark:text-white">
					Patient Prescriptions
				</h4>
				<p className="text-base text-gray-600">
					Here are the prescriptions given to you by your doctor &rarr;
				</p>
			</div>

			{sortedPrescriptions?.length === 0 && (
				<div className="flex items-center justify-center h-40">
					<p className="text-lg text-gray-500">No prescriptions found</p>
				</div>
			)}

			{sortedPrescriptions?.map((prescription) => (
				<PrescriptionCardDetail
					key={prescription.id}
					prescription={prescription}
				/>
			))}
		</div>
	);
};

export default PrescriptionsPage;
