import { auth } from "@/auth";
import ExpenseCard from "@/components/patient/expense-card";
import {
	getPatientByUserId,
	getPatientReimbursementRequests,
} from "@/data/patient";

const Expenses = async () => {
	const session = await auth();
	const user = session?.user;

	const patient = await getPatientByUserId(user?.id);
	const reimbursementRequests = await getPatientReimbursementRequests(
		patient?.id,
	);

	return (
		<div className="flex flex-col py-8 px-24 gap-2">
			<div className="mb-4">
				<h4 className="text-2xl font-semibold text-navy-700 dark:text-white">
					Reimbursement Records
				</h4>
				<p className="text-base text-gray-600">
					View all your expense records below &rarr;
				</p>
			</div>

			{reimbursementRequests?.length === 0 && (
				<div className="flex items-center justify-center h-40">
					<p className="text-lg text-gray-500">No reimbursements found</p>
				</div>
			)}

			{reimbursementRequests?.map((reimbursementRequest) => {
				return (
					<ExpenseCard
						key={reimbursementRequest.id}
						reimbursementRequest={reimbursementRequest}
					/>
				);
			})}
		</div>
	);
};

export default Expenses;
