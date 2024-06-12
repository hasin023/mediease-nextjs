import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { FaCalendarWeek } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";

import { getAppointmentById } from "@/data/appointment";
import { getDoctorById } from "@/data/doctor";
import { Button } from "../ui/button";
import Link from "next/link";

interface ReimbursementRequest {
	id: string;
	patientId: string;
	appointmentId: string;
	amount: number;
	billImgUrl: string | null;
	referralImgUrl: string | null;
	prescriptionImgUrl: string | null;
	status: string;
	submittedAt: string;
}

const ExpenseCard: React.FC<{ reimbursementRequest: ReimbursementRequest }> =
	async ({ reimbursementRequest }) => {
		const submittedAt = new Date(reimbursementRequest.submittedAt);
		const submittedDateString = submittedAt.toLocaleDateString(undefined, {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
		const submittedTimeString = submittedAt.toLocaleTimeString(undefined, {
			hour: "2-digit",
			minute: "2-digit",
		});

		const appointment = await getAppointmentById(
			reimbursementRequest.appointmentId,
		);

		const doctor = await getDoctorById(appointment?.doctorId);

		return (
			<Card className="shadow-xl">
				<CardHeader className="-mb-4">
					<CardTitle>
						<div className="flex gap-2">
							<FaUserDoctor className="text-gray-700" />
							<span>{doctor?.user.name}</span>
						</div>
					</CardTitle>
					<CardDescription>Requested At &rarr; </CardDescription>
				</CardHeader>
				<CardContent className="space-y-3">
					<div className="text-sm">
						<div className="flex gap-2 items-center">
							<FaCalendarWeek className="text-gray-500" />
							<p>{submittedDateString}</p>
						</div>
						<div className="flex gap-2 items-center">
							<FaClock className="text-gray-500" />
							<p>{submittedTimeString}</p>
						</div>
					</div>
					<div className="flex gap-2 items-center">
						<Button
							size="sm"
							variant="outline"
							className="hover:bg-lime-700 hover:text-white border-gray-400"
						>
							<Link
								href={`/patient/records/${reimbursementRequest.appointmentId}`}
							>
								View Appointment &rarr;
							</Link>
						</Button>
					</div>
				</CardContent>
				<CardFooter className="flex flex-col">
					<div className="flex gap-2 font-bold items-center">
						<FaMoneyBillAlt className="text-gray-700" size={20} />
						BDT
						<span className="text-indigo-500">
							{reimbursementRequest.amount}
						</span>
					</div>
					<p className="text-sm text-gray-600">
						<strong>Status: &nbsp;</strong>
						<span
							className={`font-semibold ${
								reimbursementRequest.status === "PENDING"
									? "text-yellow-600"
									: reimbursementRequest.status === "REJECTED"
										? "text-rose-600"
										: reimbursementRequest.status === "ACCEPTED"
											? "text-lime-700"
											: ""
							}`}
						>
							{reimbursementRequest.status}
						</span>
					</p>
				</CardFooter>
			</Card>
		);
	};

export default ExpenseCard;
